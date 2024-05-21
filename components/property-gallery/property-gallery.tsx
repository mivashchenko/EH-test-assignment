'use client'

import { SearchInput } from '@/components/ui/search-input'
import { PropertyList } from '@/components/property-list'
import { filterPropertiesByAvailableLot } from '@/utils/filterPropertiesByAvailableLot'

import styles from './components/PropertyGallery.module.scss'
import { Property } from '@/types'
import { PropertyDetails } from '@/components/property-details'
import { useCallback, useState } from 'react'
import { PropertyGalleryLayout } from '@/components/property-gallery/components/property-gallery-layout'

interface PropertyGalleryProps {
  propertyList: Property[]
}
export const PropertyGallery = ({
  propertyList = [],
}: PropertyGalleryProps) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    propertyList[0]
  )

  const handleSelectProperty = useCallback((property: Property) => {
    setSelectedProperty(property)
  }, [])

  return (
    <PropertyGalleryLayout
      searchComponent={
        <SearchInput
          placeholder={'Search by Neighborhood Name or Street Name'}
        />
      }
      listComponent={
        <PropertyList
          propertyList={filterPropertiesByAvailableLot(propertyList)}
          onSelectProperty={handleSelectProperty}
          selectedProperty={selectedProperty}
        />
      }
      detailsComponent={
        selectedProperty && <PropertyDetails property={selectedProperty} />
      }
    />
  )
}
