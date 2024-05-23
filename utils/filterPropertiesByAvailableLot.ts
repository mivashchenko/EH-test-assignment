import { Property } from '@/types'
import { filter, includes, path } from 'ramda'

export const filterPropertiesByAvailableLot = (properties: Property[]) => {
  if (!properties) return []
  return properties.filter(
    (property) => property.constructionStatus !== 'Available Lot'
  )
}

export const filterPropertiesByText = (
  data: Property[],
  searchTerm: string
): Property[] => {
  return filter((item: any) => {
    return (
      includes(searchTerm, path(['streetAddress'], item)) ||
      includes(searchTerm, path(['neighborhood', 'name'], item)) ||
      includes(searchTerm, path(['floorPlan', 'name'], item))
    )
  }, data || [])
}
