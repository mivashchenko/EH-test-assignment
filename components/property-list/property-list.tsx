'use client'

import {
  PropertyCardAddress,
  PropertyCardStatusLabel,
  PropertyCardContent,
  PropertyCardDescription,
  PropertyCardChipContainer,
  PropertyCardHead,
  PropertyCardImage,
  PropertyCardPrice,
} from '@/components/property-card'
import { Property } from '@/types'
import pluralize from 'pluralize'

import styles from './PropertyList.module.scss'
import {
  PropertyCard,
  PropertyCardHeadLabels,
} from '@/components/property-card/property-card'
import { getPropertyImageUrl } from '@/utils/getPropertyImageUrl'
import { clsx } from 'clsx'
import { IconLabel } from '@/components/ui/icon-label/icon-label'
import { Icons } from '@/components/ui/icons'

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
  // console.log(propertyList)

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
                <PropertyCardHeadLabels
                  floorPlanName={property?.floorPlan?.name}
                  houseStyleName={property?.houseStyle?.name}
                />
              </PropertyCardHead>
              <PropertyCardImage src={getPropertyImageUrl(property)} />
              <PropertyCardContent>
                <PropertyCardStatusLabel
                  content={property.constructionStatus}
                />
                <PropertyCardPrice content={property.price} />
                <PropertyCardAddress content={property.streetAddress} />
                <PropertyCardDescription content={property.neighborhood.name} />
                <PropertyCardChipContainer details={details} />
              </PropertyCardContent>
            </PropertyCard>
          </article>
        )
      })}
    </div>
  )
}
