'use client'

import { SearchInput } from '@/components/ui/search-input'
import { PropertyList } from '@/components/property-list'
import { filterPropertiesByAvailableLot } from '@/utils/filterPropertiesByAvailableLot'

import styles from './style.module.scss'
import { Property } from '@/types'
import { PropertyDetails } from '@/components/property-details'
import { useCallback, useState } from 'react'

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
    <div className={styles.root}>
      <div className={styles.contentLeft}>
        <div className={styles.inputWrapper}>
          <SearchInput
            placeholder={'Search by Neighborhood Name or Street Name'}
          />
        </div>
        <PropertyList
          propertyList={filterPropertiesByAvailableLot(propertyList)}
          onSelectProperty={handleSelectProperty}
          selectedProperty={selectedProperty}
        />
      </div>
      <div className={styles.contentRight}>
        {selectedProperty && <PropertyDetails property={selectedProperty} />}
      </div>
    </div>
  )
}
