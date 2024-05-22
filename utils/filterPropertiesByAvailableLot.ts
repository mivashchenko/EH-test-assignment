import { Property } from '@/types'
import { either, filter, includes, path, pathEq, pipe, propEq } from 'ramda'

export const filterPropertiesByAvailableLot = (properties: Property[]) => {
  if (!properties) return []
  return properties.filter(
    (property) => property.constructionStatus !== 'Available Lot'
  )
}

export const filterPropertiesByText = (
  data: Property[],
  searchTerm: string
) => {
  return filter((item: any) => {
    return (
      includes(searchTerm, path(['streetAddress'], item)) ||
      includes(searchTerm, path(['neighborhood', 'name'], item))
    )
  }, data)
}
