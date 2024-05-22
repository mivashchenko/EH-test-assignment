import { Amenity, Neighborhood, Property } from '@/types'
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
import Image from 'next/image'
import { getBlurDataUrl } from '@/utils/dynamicBlurUrl'
import { pathOr, path } from 'ramda'

interface PropertyDetailsProps {
  property: Property
}

const N_A = 'N / A'

export const PropertyDetails = ({ property }: PropertyDetailsProps) => {
  const neighborhood = pathOr({} as Neighborhood, ['neighborhood'], property)

  const dataGridItems = [
    {
      label: 'school district',
      value: pathOr(N_A, ['schoolDistrictLocation', 'name'], neighborhood),
    },
    {
      label: 'elementary',
      value: pathOr(N_A, ['elementarySchool'], neighborhood),
    },
    {
      label: 'lot dimensions',
      value: getLotDimensionFormatted(
        path(['lotDimensions', 'width'], property),
        path(['lotDimensions', 'depth'], property)
      ),
    },
    {
      label: 'lot square footage',
      value: pathOr(N_A, ['sqFootLot'], property),
    },
    {
      label: 'cross streets',
      value: pathOr(N_A, ['intersection'], neighborhood),
    },
    {
      label: 'amenities',
      value: pathOr([], ['amenities'], neighborhood)
        .map((amenity: Amenity) => amenity.name)
        .join(', '),
    },
    {
      label: 'additional info',
      value: property?.isPoolCompatible
        ? 'pool compatible'
        : 'not pool compatible',
    },
  ]

  const getSalesImages = (property: Property) => {
    const image = path(['neighborhood', 'salesImages', 0], property)
    return [image].filter(Boolean)
  }

  const getDroneImages = (property: Property) => {
    return [path(['neighborhood', 'droneImage'], property)].filter(Boolean)
  }

  const getRestNeighborhoodImages = (property: Property) => {
    const hasImages = path(['neighborhood', 'salesImages', 1], property)

    if (!hasImages) return []
    const imagesToRender = path(
      ['neighborhood', 'salesImages'],
      property
    ).slice(1)

    return imagesToRender.filter(Boolean)
  }

  const renderSliderImage = ({
    attachment,
    width,
    height,
  }: {
    attachment?: { url: string }
    width: number
    height: number
  }) => {
    return (
      attachment?.url && (
        <div className={styles.carouselImage}>
          <Image
            style={{ aspectRatio: `${width / height}` }}
            src={attachment.url}
            alt='Floor Plan Image'
            width={width}
            height={height}
            placeholder={'blur'}
            blurDataURL={getBlurDataUrl()}
          />
        </div>
      )
    )
  }

  const renderDataGridRow = (cells: typeof dataGridItems, rowIndex: number) => {
    const cellRenderer = (
      item: (typeof dataGridItems)[number],
      index: number
    ) => {
      const label = item.label
      const value = item.value || 'N/A'
      const showDivider = cells.length === 2 && index === 0
      return (
        <>
          <PropertyDetailsCardDataGridRowCell key={index}>
            <PropertyDetailsCardDataGridRowCellLabel>
              {label}
            </PropertyDetailsCardDataGridRowCellLabel>
            <PropertyDetailsCardDataGridRowCellValue>
              {value}
            </PropertyDetailsCardDataGridRowCellValue>
          </PropertyDetailsCardDataGridRowCell>
          {showDivider && (
            <Divider className={styles.divider} direction={'vertical'} />
          )}
        </>
      )
    }
    return (
      <PropertyDetailsCardDataGridRow key={rowIndex}>
        {cells.map(cellRenderer)}
      </PropertyDetailsCardDataGridRow>
    )
  }

  const renderDataGridRowList = () =>
    dataGridItems.reduce(
      (accumulator, currentValue, index) => {
        if (index % 2 === 0) {
          accumulator.currentCellsArray.push(currentValue)
          if (!dataGridItems[index + 1]) {
            accumulator.rowsToRender.push(
              renderDataGridRow(accumulator.currentCellsArray, index)
            )
            accumulator.currentCellsArray = []
          }
        } else {
          accumulator.currentCellsArray.push(currentValue)
          accumulator.rowsToRender.push(
            renderDataGridRow(accumulator.currentCellsArray, index)
          )
          accumulator.currentCellsArray = []
        }

        return accumulator
      },
      {
        currentCellsArray: [] as typeof dataGridItems,
        rowsToRender: [] as ReactNode[],
      }
    ).rowsToRender

  console.log(property)

  const renderCarouselTitle = (title: string | undefined) => {
    if (!title) return null

    return (
      <div className={styles.PropertyDetails_NeighborhoodName}>{title}</div>
    )
  }

  const renderCarouselButtonGroup = (buttons: ReactNode) => {
    return (
      <ButtonGroup size={'small'} variant='outlined'>
        {buttons}
      </ButtonGroup>
    )
  }

  const carouselButtonLabelFormatter = (index: number) => {
    return getOrdinalSuffix(index + 1)
  }

  const renderCarouselButton =
    (buttonLabelFormatter: (index: number) => string) =>
    (index: number, selectedIndex: number, onDotButtonClick: () => void) => (
      <Button
        key={index}
        onClick={onDotButtonClick}
        active={index === selectedIndex}
      >
        {buttonLabelFormatter(index)}
      </Button>
    )

  const renderFloorPlanCarousel = () => {
    const buttonLabelFormatter = (index: number) => {
      return `${getOrdinalSuffix(index + 1)} Floor`
    }

    const slides =
      property?.floorPlan?.images.map((attachment) =>
        renderSliderImage({ attachment, width: 756, height: 1092 })
      ) || []

    return (
      <>
        {renderCarouselTitle(property?.floorPlan?.name)}
        <div className={styles.carouselWrapper}>
          <Carousel
            slides={slides}
            buttonWrapperRenderer={renderCarouselButtonGroup}
            buttonRenderer={renderCarouselButton(buttonLabelFormatter)}
          />
        </div>
      </>
    )
  }

  const renderSalesImageCarousel = () => {
    if (!getSalesImages(property).length) return null

    const slides = getSalesImages(property).map((attachment) =>
      renderSliderImage({ attachment, width: 688, height: 448 })
    )
    return (
      <>
        {renderCarouselTitle(property?.neighborhood?.name)}
        <div className={styles.carouselWrapper}>
          <Carousel
            slides={slides}
            buttonWrapperRenderer={renderCarouselButtonGroup}
            buttonRenderer={renderCarouselButton(carouselButtonLabelFormatter)}
          />
        </div>
      </>
    )
  }

  const renderDroneImageCarousel = () => {
    if (!getDroneImages(property).length) return null

    return (
      <>
        {renderCarouselTitle('neighborhood layout')}

        <div className={styles.carouselWrapper}>
          <Carousel
            slides={getDroneImages(property).map((attachment) =>
              renderSliderImage({ attachment, width: 688, height: 448 })
            )}
            buttonWrapperRenderer={renderCarouselButtonGroup}
            buttonRenderer={renderCarouselButton(carouselButtonLabelFormatter)}
          />
        </div>
      </>
    )
  }

  const renderNeighborhoodImagesCarousel = () => {
    if (!getRestNeighborhoodImages(property).length) return null

    const slides = getRestNeighborhoodImages(property).map((attachment) =>
      renderSliderImage({ attachment, width: 688, height: 448 })
    )
    return (
      <>
        {renderCarouselTitle('other neighborhood images')}
        <div className={styles.carouselWrapper}>
          <Carousel
            slides={slides}
            buttonWrapperRenderer={renderCarouselButtonGroup}
            buttonRenderer={renderCarouselButton(carouselButtonLabelFormatter)}
          />
        </div>
      </>
    )
  }

  const renderImageTitle = () => {
    return (
      <figure className={styles.imageTitleWrapper}>
        <Image
          src={(property && getPropertyImageUrl(property)) || ''}
          alt={'Property Image'}
          width={590}
          height={370}
          placeholder={'blur'}
          blurDataURL={getBlurDataUrl()}
        />
      </figure>
    )
  }

  const renderPropertyCardHeader = () => {
    return (
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
    )
  }

  const renderPropertyCardLabels = () => {
    return (
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
    )
  }

  const renderPropertyCardButtonContainer = () => {
    return (
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
    )
  }

  return (
    <div className={styles.root}>
      {renderImageTitle()}

      <PropertyDetailsCard>
        {renderPropertyCardHeader()}
        <PropertyDetailsCardDescription content={property.neighborhood.name} />
        {renderPropertyCardLabels()}
        {renderPropertyCardButtonContainer()}

        <PropertyDetailsCardDataGridContainer>
          {renderDataGridRowList()}
        </PropertyDetailsCardDataGridContainer>
      </PropertyDetailsCard>

      {renderFloorPlanCarousel()}

      <Divider direction={'horizontal'} />

      {renderSalesImageCarousel()}

      {renderDroneImageCarousel()}

      {renderNeighborhoodImagesCarousel()}
    </div>
  )
}
