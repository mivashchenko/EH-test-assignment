'use client'

import { SearchInput } from '@/components/ui/search-input'
import { PropertyList } from '@/components/property-list'
import { filterPropertiesByAvailableLot } from '@/utils/filterPropertiesByAvailableLot'
import { Property } from '@/types'
import { PropertyDetails } from '@/components/property-details'
import { useCallback, useEffect, useState } from 'react'
import { PropertyGalleryLayout } from '@/components/property-gallery/components/property-gallery-layout'
import { useScreenSize } from '@/hooks/useScreenSize'
import { useTransition, animated } from 'react-spring'

interface PropertyGalleryProps {
  propertyList: Property[]
}

export const PropertyGallery = ({
  propertyList = [],
}: PropertyGalleryProps) => {
  const screenSize = useScreenSize()
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  )

  useEffect(() => {
    if (screenSize.width > 768) {
      setSelectedProperty(propertyList[0])
    }
  }, [])

  const [showDetails, setShowDetails] = useState(true)

  const handleSelectProperty = useCallback((property: Property) => {
    setSelectedProperty(property)
  }, [])

  useEffect(() => {
    if (screenSize.width <= 768) {
      setSelectedProperty(null)
    } else {
      if (selectedProperty === null) setSelectedProperty(propertyList[0])
    }
  }, [screenSize.width])

  const handleBackButtonClick = useCallback(() => {
    setSelectedProperty(null)
  }, [])

  return (
    <PropertyGalleryLayout
      mode={screenSize.width <= 768 ? 'mobile' : 'desktop'}
      onBackButtonClick={handleBackButtonClick}
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
