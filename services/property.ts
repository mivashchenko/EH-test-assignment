import { FloorPlan, Neighborhood, Property } from '@/types'
import { pathOr } from 'ramda'

export class PropertyService {
  private property: Property | null = null

  constructor(property?: Property) {
    if (property) {
      this.setProperty(property)
    }
  }

  public setProperty(property: Property | null) {
    this.property = property
  }

  private getByPath(pathArray: (string | number)[], defaultValue?: any) {
    return pathOr(defaultValue, pathArray, this.property)
  }

  public get floorPlan() {
    return this.getByPath(['floorPlan']) as FloorPlan
  }

  public get neighborhood() {
    return this.getByPath(['neighborhood']) as Neighborhood
  }

  public get constructionStatus() {
    return this.getByPath(['constructionStatus'])
  }

  public get streetAddress() {
    return this.getByPath(['streetAddress'])
  }

  public get price() {
    return this.getByPath(['price'], 0)
  }

  public isTheSameAs(property: PropertyService) {
    return this.streetAddress === property.streetAddress
  }

  public get titleImageUrl() {
    return this.getByPath(['titleImage', 'url'])
  }

  public get propertyImageUrl() {
    return (
      this.titleImageUrl ||
      this.getByPath(['floorPlan', 'titleImage', 'url'], '')
    )
  }

  public get lotDimensions() {
    return this.getByPath(['lotDimensions'])
  }

  public getLotDimensionsFormatted(
    formatFn: (width: number, depth: number) => string
  ) {
    return formatFn(this.lotDimensions.width, this.lotDimensions.depth)
  }

  public get sqFootLot() {
    return this.getByPath(['sqFootLot'], 0)
  }

  public get isPoolCompatible() {
    return this.getByPath(['isPoolCompatible'])
  }

  public get estimatedClosingDate() {
    return this.getByPath(['estimatedClosingDate'])
  }

  public get houseStyleName() {
    return this.getByPath(['houseStyle', 'name'])
  }
}
