import { Property } from '@/types'

export const filterPropertiesByAvailableLot = (properties: Property[]) => {
  if (!properties) return []
  return properties.filter(
    (property) => property.constructionStatus !== 'Available Lot'
  )
}
