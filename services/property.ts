import { Amenity, Attachment, FloorPlan, Neighborhood, Property } from '@/types'
import { pathOr } from 'ramda'
import pluralize from 'pluralize'

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

export class FloorPlanService {
  private floorPlan: FloorPlan | null = null
  constructor(floorPlan?: FloorPlan) {
    if (floorPlan) {
      this.setFloorPlan(floorPlan)
    }
  }

  private getByPath(pathArray: (string | number)[], defaultValue?: any) {
    return pathOr(defaultValue, pathArray, this.floorPlan)
  }

  public setFloorPlan(floorPlan: FloorPlan) {
    this.floorPlan = floorPlan
  }

  public get sqFootMasonry() {
    return this.getByPath(['sqFootMasonry'], 0)
  }

  public get sqFootMasonryUnit() {
    return 'SQFT'
  }

  public get bedrooms() {
    return this.getByPath(['bedrooms'], 0)
  }

  public get bedroomsUnit() {
    return pluralize('bed', this.bedrooms)
  }

  public get baths() {
    const bathsFull = this.getByPath(['bathsFull'], 0)
    const bathsHalf = this.getByPath(['bathsHalf'], 0)
    return bathsFull + bathsHalf / 2
  }

  public get bathsUnit() {
    return pluralize('bath', this.baths)
  }

  public get name() {
    return this.getByPath(['name']) as string
  }

  public get images(): Attachment[] {
    return this.getByPath(['images'], [])
  }

  public get tourLink() {
    return this.getByPath(['tourLink'])
  }
}

export class NeighborhoodService {
  private neighborhood: Neighborhood | null = null

  constructor(neighborhood?: Neighborhood) {
    if (neighborhood) {
      this.setNeighborhood(neighborhood)
    }
  }

  public setNeighborhood(neighborhood: Neighborhood) {
    this.neighborhood = neighborhood
  }

  private getByPath(pathArray: (string | number)[], defaultValue?: any) {
    return pathOr(defaultValue, pathArray, this.neighborhood)
  }

  public get name() {
    return this.getByPath(['name'])
  }

  public get schoolDistrictLocationName() {
    return this.getByPath(['schoolDistrictLocation', 'name'], '')
  }

  public get elementarySchool() {
    return this.getByPath(['elementarySchool'], '')
  }

  public get amenities() {
    return this.getByPath(['amenities'], [])
  }

  public get amenityNames() {
    return this.amenities.map((amenity: Amenity) => amenity.name)
  }

  public getAmenityNamesFormatted(formatFn: (arr: string[]) => string) {
    return formatFn(this.amenityNames)
  }

  public get titleImage() {
    return this.getByPath(['salesImages', 0])
  }

  public get droneImage() {
    return this.getByPath(['droneImage'])
  }

  public get hasRestNeighborhoodImages() {
    return this.getByPath(['salesImages', 1])
  }

  public get restNeighborhoodImages(): Attachment[] {
    if (!this.hasRestNeighborhoodImages) return []
    return this.getByPath(['salesImages']).slice(1)
  }
}
