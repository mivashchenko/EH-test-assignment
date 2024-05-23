import { Property } from '@/types'
import { compose, filter, includes, path, toLower, trim } from 'ramda'

export const filterPropertiesByAvailableLot = (properties: Property[]) => {
  if (!properties) return []
  return properties.filter(
    (property) => property.constructionStatus !== 'Available Lot'
  )
}

const processSearchText = compose(trim, toLower)

export const filterPropertiesByText = (
  data: Property[],
  inputText: string
): Property[] => {
  return filter((item: any) => {
    const _inputText = processSearchText(inputText)

    const streetAddress = path(['streetAddress'], item)
    const neighborhoodName = path(['neighborhood', 'name'], item)
    const floorPlanName = path(['floorPlan', 'name'], item)

    return [streetAddress, neighborhoodName, floorPlanName].some((text) => {
      return includes(_inputText, processSearchText(text))
    })
  }, data || [])
}
