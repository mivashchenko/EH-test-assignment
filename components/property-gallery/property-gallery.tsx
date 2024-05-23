'use client'
import { SearchInput } from '@/components/ui/search-input'
import { PropertyList } from '@/components/property-list'
import {
  filterPropertiesByAvailableLot,
  filterPropertiesByText,
} from '@/utils/filterPropertiesByAvailableLot'
import { Property } from '@/types'
import { PropertyDetails } from '@/components/property-details'
import { useCallback, useEffect, useState } from 'react'
import { PropertyGalleryLayout } from '@/components/property-gallery/components/property-gallery-layout'
import { useScreenSize } from '@/hooks/useScreenSize'
import { useTransition } from 'react'

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

  const [searchText, setSearchText] = useState<string>('')

  useEffect(() => {
    if (screenSize.width > 768) {
      setSelectedProperty(propertyList[0])
    }
  }, [])

  const handleSelectProperty = useCallback((property: Property) => {
    setSelectedProperty(property)
  }, [])

  const isMobile = screenSize.width <= 768

  useEffect(() => {
    if (isMobile) {
      setSelectedProperty(null)
    } else {
      if (selectedProperty === null) setSelectedProperty(propertyList[0])
    }
  }, [isMobile])

  const handleBackButtonClick = useCallback(() => {
    setSelectedProperty(null)
  }, [])

  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])

  const [isPending, startTransition] = useTransition()

  const handleSearchTextChange = useCallback((text: string) => {
    setSearchText(text)
  }, [])

  useEffect(() => {
    startTransition(() => {
      const filteredProperties = filterPropertiesByText(
        filterPropertiesByAvailableLot(propertyList),
        searchText
      )
      setFilteredProperties(filteredProperties)

      if (!isMobile) {
        setSelectedProperty(filteredProperties?.[0])
      }
    })
  }, [searchText, propertyList, isMobile])

  return (
    <PropertyGalleryLayout
      mode={screenSize.width <= 768 ? 'mobile' : 'desktop'}
      onBackButtonClick={handleBackButtonClick}
      searchComponent={
        <SearchInput
          value={searchText}
          onChange={handleSearchTextChange}
          placeholder={'Search by Neighborhood Name or Street Name'}
        />
      }
      listComponent={
        <PropertyList
          propertyList={filteredProperties}
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
