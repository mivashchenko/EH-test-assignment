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

import styles from './PropertyList.module.scss'
import {
  PropertyCard,
  PropertyCardHeadLabels,
} from '@/components/property-card/property-card'
import { clsx } from 'clsx'
import { PropertyService } from '@/services/property'
import { FloorPlanService } from '@/services/floor-plan'
import { NeighborhoodService } from '@/services/neighborhood'
import { useEffect, useMemo } from 'react'

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
  const createCardClickListener = (property: Property) => () => {
    if (onSelectProperty) {
      onSelectProperty(property)
    }
  }

  const selectedPropertyService = useMemo(() => new PropertyService(), [])
  const propertyService = useMemo(() => new PropertyService(), [])
  const floorPlanService = useMemo(() => new FloorPlanService(), [])
  const neighborhoodService = useMemo(() => new NeighborhoodService(), [])

  selectedPropertyService.setProperty(selectedProperty)

  useEffect(() => {
    selectedPropertyService.setProperty(selectedProperty)
  }, [selectedProperty])

  return (
    <div className={styles.root}>
      {propertyList.map((property: Property, idx: number) => {
        propertyService.setProperty(property)
        floorPlanService.setFloorPlan(propertyService.floorPlan)
        neighborhoodService.setNeighborhood(propertyService.neighborhood)

        const details = [
          {
            value: floorPlanService.sqFootMasonry,
            unit: floorPlanService.sqFootMasonryUnit,
          },
          {
            value: floorPlanService.bedrooms,
            unit: floorPlanService.bedroomsUnit,
          },
          {
            value: floorPlanService.baths,
            unit: floorPlanService.bathsUnit,
          },
        ]

        const listItemClassName = clsx(
          styles.item,
          selectedPropertyService.isTheSameAs(propertyService) &&
            styles.selected
        )

        return (
          <article
            key={property.streetAddress + idx}
            className={listItemClassName}
            onClick={createCardClickListener(property)}
          >
            <PropertyCard>
              <PropertyCardHead>
                <PropertyCardHeadLabels
                  floorPlanName={floorPlanService.name}
                  houseStyleName={floorPlanService.name}
                />
              </PropertyCardHead>
              <PropertyCardImage src={propertyService.propertyImageUrl} />
              <PropertyCardContent>
                <PropertyCardStatusLabel
                  content={propertyService.constructionStatus}
                />
                <PropertyCardPrice content={propertyService.price} />
                <PropertyCardAddress content={propertyService.streetAddress} />
                <PropertyCardDescription content={neighborhoodService.name} />
                <PropertyCardChipContainer details={details} />
              </PropertyCardContent>
            </PropertyCard>
          </article>
        )
      })}
    </div>
  )
}
