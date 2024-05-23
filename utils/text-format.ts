import { getOrdinalSuffix } from '@/utils/get-ordinal-suffix'

export const lotDimensionFormatter = (width: number, depth: number) => {
  if (!width || !depth) return `N/A`
  return `${width} x ${depth}`
}

export const joinWithComma = (arr: string[]) => {
  return arr.join(', ')
}

export const carouselButtonLabelFormatter = (index: number) => {
  return getOrdinalSuffix(index + 1)
}
