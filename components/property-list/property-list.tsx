'use client'

import {
  PropertyCardAddress,
  PropertyCardBadge,
  PropertyCardContent,
  PropertyCardDescription,
  PropertyCardFloorPlanDetails,
  PropertyCardHead,
  PropertyCardImage,
  PropertyCardPrice,
} from '@/components/property-card'
import { Property } from '@/types'
import pluralize from 'pluralize'

import styles from './style.module.scss'
import { FloorPlanIcon, PaintBrushIcon } from '@/components/ui/icons/icons'
import {
  PropertyCard,
  PropertyCardHeadLabelsContainer,
} from '@/components/property-card/property-card'
import { getPropertyImageUrl } from '@/utils/getPropertyImageUrl'
import { clsx } from 'clsx'
import { IconLabel } from '@/components/ui/icon-label/icon-label'

interface PropertyListProps {
  propertyList: Property[]
  onSelectProperty?: (property: Property) => void
  selectedProperty: Property | null
}

export const PropertyList = ({
  propertyList,
  onSelectProperty,
  selectedProperty,
}: PropertyListProps) => {
  console.log(propertyList)

  const createCardClickHandler = (property: Property) => {
    return () => {
      if (onSelectProperty) {
        onSelectProperty(property)
      }
    }
  }

  return (
    <div className={styles.root}>
      {propertyList.map((property: Property, idx: number) => {
        const details = [
          {
            value: property?.floorPlan?.sqFootMasonry,
            unit: `SQFT`,
          },
          {
            value: property?.floorPlan?.bedrooms,
            unit: pluralize('bed', property?.floorPlan?.bedrooms),
          },
          {
            value:
              Number(property?.floorPlan?.bathsFull) +
              Number(property?.floorPlan?.bathsHalf) / 2,
            unit: pluralize(
              'bath',
              Number(property?.floorPlan?.bathsFull) +
                Number(property?.floorPlan?.bathsHalf) / 2
            ),
          },
        ]

        return (
          <article
            key={idx}
            className={clsx(
              styles.item,
              selectedProperty?.streetAddress === property?.streetAddress &&
                styles.selected
            )}
            onClick={createCardClickHandler(property)}
          >
            <PropertyCard
              selected={
                selectedProperty?.streetAddress === property?.streetAddress
              }
            >
              <PropertyCardHead>
                <PropertyCardHeadLabelsContainer>
                  <IconLabel
                    icon={<FloorPlanIcon />}
                    value={property?.floorPlan?.name}
                    background={'grey'}
                  />
                  <IconLabel
                    icon={<PaintBrushIcon />}
                    value={property?.houseStyle?.name}
                    background={'grey'}
                  />
                </PropertyCardHeadLabelsContainer>
              </PropertyCardHead>
              <PropertyCardImage image={getPropertyImageUrl(property)} />
              <PropertyCardContent>
                <PropertyCardBadge content={property.constructionStatus} />
                <PropertyCardPrice content={property.price} />
                <PropertyCardAddress content={property.streetAddress} />
                <PropertyCardDescription content={property.neighborhood.name} />
                <PropertyCardFloorPlanDetails details={details} />
              </PropertyCardContent>
            </PropertyCard>
          </article>
        )
      })}
    </div>
  )
}
