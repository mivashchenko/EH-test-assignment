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
import {
  FloorPlanService,
  NeighborhoodService,
  PropertyService,
} from '@/services/property'

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
  const createCardClickHandler = (property: Property) => {
    return () => {
      if (onSelectProperty) {
        onSelectProperty(property)
      }
    }
  }

  const SelectedProperty = new PropertyService()
  SelectedProperty.setProperty(selectedProperty)

  const IteratedProperty = new PropertyService()
  const IteratedFloorPlan = new FloorPlanService()
  const IteratedNeighborhood = new NeighborhoodService()

  return (
    <div className={styles.root}>
      {propertyList.map((property: Property, idx: number) => {
        IteratedProperty.setProperty(property)
        IteratedFloorPlan.setFloorPlan(IteratedProperty.floorPlan)
        IteratedNeighborhood.setNeighborhood(IteratedProperty.neighborhood)

        const details = [
          {
            value: IteratedFloorPlan.sqFootMasonry,
            unit: IteratedFloorPlan.sqFootMasonryUnit,
          },
          {
            value: IteratedFloorPlan.bedrooms,
            unit: IteratedFloorPlan.bedroomsUnit,
          },
          {
            value: IteratedFloorPlan.baths,
            unit: IteratedFloorPlan.bathsUnit,
          },
        ]

        return (
          <article
            key={property.streetAddress + idx}
            className={clsx(
              styles.item,
              SelectedProperty.isTheSameAs(IteratedProperty) && styles.selected
            )}
            onClick={createCardClickHandler(property)}
          >
            <PropertyCard>
              <PropertyCardHead>
                <PropertyCardHeadLabels
                  floorPlanName={IteratedFloorPlan.name}
                  houseStyleName={IteratedFloorPlan.name}
                />
              </PropertyCardHead>
              <PropertyCardImage src={IteratedProperty.propertyImageUrl} />
              <PropertyCardContent>
                <PropertyCardStatusLabel
                  content={IteratedProperty.constructionStatus}
                />
                <PropertyCardPrice content={IteratedProperty.price} />
                <PropertyCardAddress content={IteratedProperty.streetAddress} />
                <PropertyCardDescription content={IteratedNeighborhood.name} />
                <PropertyCardChipContainer details={details} />
              </PropertyCardContent>
            </PropertyCard>
          </article>
        )
      })}
    </div>
  )
}
