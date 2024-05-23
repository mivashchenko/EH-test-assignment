import { Attachment, FloorPlan } from '@/types'
import { pathOr } from 'ramda'
import pluralize from 'pluralize'

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
