import { Amenity, Attachment, Neighborhood } from '@/types'
import { pathOr } from 'ramda'

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
