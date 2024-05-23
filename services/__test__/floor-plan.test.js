import { FloorPlanService } from '@/services/floor-plan'

describe('FloorPlanService', () => {
  // Verify that constructor initializes with a null floorPlan if no argument is provided
  it('should initialize with null floorPlan when no argument is provided', () => {
    const service = new FloorPlanService()
    expect(service['floorPlan']).toBeNull()
  })

  // Verify that constructor initializes with the provided floorPlan argument
  it('should initialize with the provided floorPlan when an argument is given', () => {
    const mockFloorPlan = { name: 'Sample Plan', sqFootMasonry: 1200 }
    const service = new FloorPlanService(mockFloorPlan)
    expect(service['floorPlan']).toEqual(mockFloorPlan)
  })

  // Verify that setFloorPlan correctly sets the floorPlan property
  it('should correctly set the floorPlan property when setFloorPlan is called', () => {
    const service = new FloorPlanService()
    const mockFloorPlan = { name: 'Updated Plan', sqFootMasonry: 1500 }
    service.setFloorPlan(mockFloorPlan)
    expect(service['floorPlan']).toEqual(mockFloorPlan)
  })

  // Verify sqFootMasonry returns 0 if sqFootMasonry is not set
  it('should return 0 for sqFootMasonry if it is not set', () => {
    const service = new FloorPlanService({})
    expect(service.sqFootMasonry).toBe(0)
  })

  // Verify bedrooms returns 0 if bedrooms is not set
  it('should return 0 for bedrooms if it is not set', () => {
    const service = new FloorPlanService({})
    expect(service.bedrooms).toBe(0)
  })

  // Verify baths returns 0 if neither bathsFull nor bathsHalf are set
  it('should return 0 for baths if neither bathsFull nor bathsHalf are set', () => {
    const service = new FloorPlanService({})
    expect(service.baths).toBe(0)
  })

  // Verify name returns undefined if name is not set
  it('should return undefined for name if it is not set', () => {
    const service = new FloorPlanService({})
    expect(service.name).toBeUndefined()
  })
})
