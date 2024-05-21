import { Property } from '@/types'
import { getPropertyImageUrl } from '@/utils/getPropertyImageUrl'
import styles from './PropertyDetails.module.scss'
import {
  PropertyDetailsCard,
  PropertyDetailsCardAddress,
  PropertyDetailsCardButtonContainer,
  PropertyDetailsCardButtonContainerBlock,
  PropertyDetailsCardDataGridRow,
  PropertyDetailsCardDataGridRowCell,
  PropertyDetailsCardDataGridRowCellLabel,
  PropertyDetailsCardDataGridRowCellValue,
  PropertyDetailsCardDescription,
  PropertyDetailsCardHeader,
  PropertyDetailsCardHeaderClosing,
  PropertyDetailsCardIconLabelContainer,
  PropertyDetailsCardPrice,
} from '@/components/property-details-card'
import { IconLabel } from '../ui/icon-label'
import { Divider } from '@/components/ui/divider'
import { Button, ButtonGroup } from '@/components/ui/button'
import { PropertyDetailsCardDataGridContainer } from '@/components/property-details-card/property-details-card'
import { getLotDimensionFormatted } from '@/utils/text-format'
import { ReactNode } from 'react'
import { Carousel } from '@/components/ui/carousel'
import { getOrdinalSuffix } from '@/utils/get-ordinal-suffix'
import { Icons } from '@/components/ui/icons'

interface PropertyDetailsProps {
  property: Property
}

export const PropertyDetails = ({ property }: PropertyDetailsProps) => {
  const dataGridItems = [
    {
      label: 'school district',
      value: property?.neighborhood?.schoolDistrictLocation?.name,
    },
    {
      label: 'elementary',
      value: property?.neighborhood?.elementarySchool,
    },
    {
      label: 'lot dimensions',
      value: getLotDimensionFormatted(
        property?.lotDimensions?.width,
        property?.lotDimensions?.depth
      ),
    },
    {
      label: 'lot square footage',
      value: property?.sqFootLot,
    },
    {
      label: 'cross streets',
      value: property?.neighborhood?.intersection,
    },
    {
      label: 'amenities',
      value: property?.neighborhood?.amenities
        ?.map((amenity) => amenity.name)
        .join(', '),
    },
    {
      label: 'additional info',
      value: property?.isPoolCompatible
        ? 'pool compatible'
        : 'not pool compatible',
    },
  ]

  const getNeighborhoodImages = (property: Property) => {
    return [
      ...[
        property?.neighborhood?.salesImages?.[0],
        property?.neighborhood?.droneImage,
        ...[
          property?.neighborhood?.salesImages?.[1] &&
            property?.neighborhood?.salesImages?.shift(),
        ],
      ].filter(Boolean),
      ...[
        property?.neighborhood?.salesImages?.[0],
        property?.neighborhood?.droneImage,
        ...[
          property?.neighborhood?.salesImages?.[1] &&
            property?.neighborhood?.salesImages?.shift(),
        ],
      ].filter(Boolean),
    ]
  }

  const renderDataGridRow = (cells: typeof dataGridItems, rowIndex: number) => {
    return (
      <PropertyDetailsCardDataGridRow key={rowIndex}>
        {cells.map((item: (typeof dataGridItems)[number], index: number) => (
          <>
            <PropertyDetailsCardDataGridRowCell key={index}>
              <PropertyDetailsCardDataGridRowCellLabel>
                {item.label}
              </PropertyDetailsCardDataGridRowCellLabel>
              <PropertyDetailsCardDataGridRowCellValue>
                {item.value}
              </PropertyDetailsCardDataGridRowCellValue>
            </PropertyDetailsCardDataGridRowCell>
            {cells.length === 2 && index === 0 && (
              <Divider direction={'vertical'} />
            )}
          </>
        ))}
      </PropertyDetailsCardDataGridRow>
    )
  }

  const renderDataGridRowList = () =>
    dataGridItems.reduce(
      (accumulator, currentValue, index) => {
        if (index % 2 === 0) {
          accumulator.temp.push(currentValue)
          if (!dataGridItems[index + 1]) {
            accumulator.result.push(renderDataGridRow(accumulator.temp, index))
            accumulator.temp = []
          }
        } else {
          accumulator.temp.push(currentValue)
          accumulator.result.push(renderDataGridRow(accumulator.temp, index))
          accumulator.temp = []
        }

        return accumulator
      },
      {
        temp: [] as typeof dataGridItems,
        result: [] as ReactNode[],
      }
    ).result

  return (
    <div className={styles.root}>
      <figure className={styles.imageTitleWrapper}>
        <img
          src={(property && getPropertyImageUrl(property)) || ''}
          alt={'#'}
        />
      </figure>

      <PropertyDetailsCard>
        <PropertyDetailsCardHeader>
          <div>
            <PropertyDetailsCardPrice content={property.price} />
            <PropertyDetailsCardAddress content={property.streetAddress} />
          </div>
          <div>
            <PropertyDetailsCardHeaderClosing
              label={'est. closing'}
              value={property?.estimatedClosingDate}
            />
          </div>
        </PropertyDetailsCardHeader>

        <PropertyDetailsCardDescription content={property.neighborhood.name} />
        <PropertyDetailsCardIconLabelContainer>
          <IconLabel
            icon={<Icons.FloorPlanColored />}
            value={property?.floorPlan?.name}
            background={'white'}
          />
          <Divider direction={'vertical'} />
          <IconLabel
            icon={<Icons.PaintBrushColored />}
            value={property?.houseStyle?.name}
            background={'white'}
          />
        </PropertyDetailsCardIconLabelContainer>
        <PropertyDetailsCardButtonContainer>
          <PropertyDetailsCardButtonContainerBlock>
            <Button
              variant={'outlined'}
              onClick={() => {
                window.open(property?.floorPlan?.tourLink, '_blank')
              }}
            >
              book a tour
            </Button>
            <Button variant={'outlined'}>email summary</Button>
          </PropertyDetailsCardButtonContainerBlock>
          <PropertyDetailsCardButtonContainerBlock>
            <Button variant={'contained'}>reserve now</Button>
          </PropertyDetailsCardButtonContainerBlock>
        </PropertyDetailsCardButtonContainer>

        <PropertyDetailsCardDataGridContainer>
          {renderDataGridRowList()}
        </PropertyDetailsCardDataGridContainer>
      </PropertyDetailsCard>

      <div className={styles.PropertyDetails_CarouselWrapper}>
        <Carousel
          slides={
            property?.floorPlan?.images.map((attachment) => {
              return (
                <div className={styles.carouselImageWrapper}>
                  <img src={attachment.url} alt='' />
                </div>
              )
            }) || []
          }
          buttonWrapperRenderer={(buttons: ReactNode) => {
            return (
              <ButtonGroup size={'small'} variant='outlined'>
                {buttons}
              </ButtonGroup>
            )
          }}
          buttonRenderer={(index: number, selectedIndex, onDotButtonClick) => (
            <Button onClick={onDotButtonClick} active={index === selectedIndex}>
              {getOrdinalSuffix(index + 1)}&nbsp;Floor
            </Button>
          )}
        />
      </div>
      <Divider direction={'horizontal'} />

      <div className={styles.PropertyDetails_NeighborhoodName}>
        {property?.neighborhood?.name}
      </div>

      <div className={styles.PropertyDetails_CarouselWrapper}>
        <Carousel
          slides={
            getNeighborhoodImages(property).map((attachment) => {
              return (
                attachment?.url && (
                  <div className={styles.carouselImage}>
                    <img src={attachment.url} alt='' />
                  </div>
                )
              )
            }) || []
          }
          buttonWrapperRenderer={(buttons: ReactNode) => {
            return (
              <ButtonGroup size={'small'} variant='outlined'>
                {buttons}
              </ButtonGroup>
            )
          }}
          buttonRenderer={(index: number, selectedIndex, onDotButtonClick) => (
            <Button onClick={onDotButtonClick} active={index === selectedIndex}>
              {getOrdinalSuffix(index + 1)}&nbsp;Floor
            </Button>
          )}
        />
      </div>
    </div>
  )
}
