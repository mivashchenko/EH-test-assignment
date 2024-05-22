export const getLotDimensionFormatted = (width: number, depth: number) => {
  if (!width || !depth) return `N/A`
  return `${width} x ${depth}`
}
