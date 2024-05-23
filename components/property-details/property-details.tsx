import { Neighborhood, Property } from '@/types'
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
import {
  carouselButtonLabelFormatter,
  joinWithComma,
  lotDimensionFormatter,
} from '@/utils/text-format'
import { ReactNode } from 'react'
import { Carousel } from '@/components/ui/carousel'
import { getOrdinalSuffix } from '@/utils/get-ordinal-suffix'
import { Icons } from '@/components/ui/icons'
import Image from 'next/image'
import { getBlurDataUrl } from '@/utils/dynamicBlurUrl'
import { pathOr } from 'ramda'
import {
  FloorPlanService,
  NeighborhoodService,
  PropertyService,
} from '@/services/property'

interface PropertyDetailsProps {
  property: Property
}

const N_A = 'N/A'

export const PropertyDetails = ({ property }: PropertyDetailsProps) => {
  const Property = new PropertyService()
  Property.setProperty(property)

  const Neighborhood = new NeighborhoodService()
  Neighborhood.setNeighborhood(Property.neighborhood)

  const FloorPlan = new FloorPlanService()
  FloorPlan.setFloorPlan(Property.floorPlan)

  const neighborhood = pathOr({} as Neighborhood, ['neighborhood'], property)

  const dataGridItems = [
    {
      label: 'school district',
      value: Neighborhood.schoolDistrictLocationName || N_A,
    },
    {
      label: 'elementary',
      value: Neighborhood.elementarySchool || N_A,
    },
    {
      label: 'lot dimensions',
      value: Property.getLotDimensionsFormatted(lotDimensionFormatter),
    },
    {
      label: 'lot square footage',
      value: Property.sqFootLot,
    },
    {
      label: 'cross streets',
      value: pathOr(N_A, ['intersection'], neighborhood),
    },
    {
      label: 'amenities',
      value: Neighborhood.getAmenityNamesFormatted(joinWithComma),
    },
    {
      label: 'additional info',
      value: Property.isPoolCompatible
        ? 'pool compatible'
        : 'not pool compatible',
    },
  ]

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
        <div key={attachment.url} className={styles.carouselImage}>
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

  const renderDataGridRowList = () => {
    return dataGridItems.reduce(
      (accumulator, currentValue, index) => {
        const hasNextItem = dataGridItems[index + 1]
        const isOdd = index % 2 !== 0

        if (isOdd) {
          accumulator.currentCellsArray.push(currentValue)
          if (!hasNextItem) {
            const row = renderDataGridRow(accumulator.currentCellsArray, index)
            accumulator.rowsToRender.push(row)
            accumulator.currentCellsArray = []
          }
        } else {
          accumulator.currentCellsArray.push(currentValue)
          const row = renderDataGridRow(accumulator.currentCellsArray, index)
          accumulator.rowsToRender.push(row)
          accumulator.currentCellsArray = []
        }

        return accumulator
      },
      {
        currentCellsArray: [] as typeof dataGridItems,
        rowsToRender: [] as ReactNode[],
      }
    ).rowsToRender
  }

  const renderCarouselTitle = (title: string | undefined) => {
    if (!title) return null

    return <div className={styles.neighborhoodName}>{title}</div>
  }

  const renderCarouselButtonGroup = (buttons: ReactNode) => {
    return (
      <ButtonGroup size={'small'} variant='outlined'>
        {buttons}
      </ButtonGroup>
    )
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

    const slides = FloorPlan.images.map((attachment) =>
      renderSliderImage({ attachment, width: 756, height: 1092 })
    )

    return (
      <>
        {renderCarouselTitle(FloorPlan.name)}
        <div className={styles.floorPlanIconLabelContainer}>
          <div className={styles.floorPlanIconLabelWrapper}>
            <IconLabel icon={<Icons.Square />} value={FloorPlan.name} />
          </div>

          <Divider direction={'vertical'} />
          <div className={styles.floorPlanIconLabelWrapper}>
            <IconLabel icon={<Icons.Bed />} value={Property.houseStyleName} />
          </div>

          <Divider direction={'vertical'} />
          <div className={styles.floorPlanIconLabelWrapper}>
            <IconLabel icon={<Icons.Bath />} value={Property.houseStyleName} />
          </div>
        </div>

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
    if (!Neighborhood.titleImage) return null
    return (
      <>
        {renderCarouselTitle(Neighborhood.name)}
        <div className={styles.carouselWrapper}>
          {renderSliderImage({
            attachment: Neighborhood.titleImage,
            width: 688,
            height: 448,
          })}
        </div>
      </>
    )
  }

  const renderDroneImageCarousel = () => {
    if (!Neighborhood.droneImage) return null

    return (
      <>
        {renderCarouselTitle('neighborhood layout')}

        <div className={styles.carouselWrapper}>
          {renderSliderImage({
            attachment: Neighborhood.droneImage,
            width: 688,
            height: 448,
          })}
        </div>
      </>
    )
  }

  const renderNeighborhoodImagesCarousel = () => {
    if (!Neighborhood.hasRestNeighborhoodImages) return null

    const slides = Neighborhood.restNeighborhoodImages.map((attachment) =>
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
          src={Property.propertyImageUrl}
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
          <PropertyDetailsCardPrice content={Property.price} />
          <PropertyDetailsCardAddress content={Property.streetAddress} />
        </div>
        <div>
          <PropertyDetailsCardHeaderClosing
            label={'est. closing'}
            value={Property.estimatedClosingDate}
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
          value={FloorPlan.name}
          background={'white'}
        />
        <Divider direction={'vertical'} />
        <IconLabel
          icon={<Icons.PaintBrushColored />}
          value={Property.houseStyleName}
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
              window.open(FloorPlan.tourLink, '_blank')
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
  console.log(property)

  return (
    <div className={styles.root}>
      {renderImageTitle()}

      <PropertyDetailsCard>
        {renderPropertyCardHeader()}
        <PropertyDetailsCardDescription content={Neighborhood.name} />
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
