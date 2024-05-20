import { Property } from '@/types'

export const getPropertyImageUrl = (property: Property) => {
  return property?.titleImage?.url || property?.floorPlan?.titleImage?.url || ''
}
