import { PropertyService } from '@/services/property'

describe('PropertyService', () => {
  // Verify that setProperty correctly updates the property instance
  it('should update the property instance when setProperty is called', () => {
    const propertyService = new PropertyService()
    const newProperty = { streetAddress: '123 Main St' }
    propertyService.setProperty(newProperty)
    expect(propertyService.streetAddress).toEqual('123 Main St')
  })

  // Ensure that floorPlan getter retrieves the correct floor plan from the property
  it('should retrieve the correct floor plan from the property', () => {
    const floorPlan = { name: 'Plan A' }
    const property = { floorPlan }
    const propertyService = new PropertyService(property)
    expect(propertyService.floorPlan).toEqual(floorPlan)
  })

  // Check that neighborhood getter retrieves the correct neighborhood from the property
  it('should retrieve the correct neighborhood from the property', () => {
    const neighborhood = { name: 'Greenwood' }
    const property = { neighborhood }
    const propertyService = new PropertyService(property)
    expect(propertyService.neighborhood).toEqual(neighborhood)
  })

  // Check behavior when setProperty is called with null
  it('should set the internal property to null when setProperty is called with null', () => {
    const propertyService = new PropertyService({
      streetAddress: '123 Main St',
    })
    propertyService.setProperty(null)
    expect(propertyService.property).toBeNull()
  })

  // Test getters when property is null or properties are missing
  it('should return default values or undefined when property is null or properties are missing', () => {
    const propertyService = new PropertyService()
    expect(propertyService.floorPlan).toBeUndefined()
    expect(propertyService.price).toEqual(0)
  })

  // Validate behavior when non-existent paths are used in getByPath method
  it('should return undefined or default value for non-existent paths in getByPath method', () => {
    const propertyService = new PropertyService()
    expect(
      propertyService.getByPath(['nonExistentPath'], 'defaultValue')
    ).toEqual('defaultValue')
    expect(
      propertyService.getByPath(['anotherNonExistentPath'])
    ).toBeUndefined()
  })

  // Check getLotDimensionsFormatted behavior when width or depth is missing
  it('should handle missing width or depth gracefully in getLotDimensionsFormatted', () => {
    const formatFn = jest
      .fn()
      .mockImplementation((width, depth) => `${width}x${depth}`)
    const property = { lotDimensions: { width: 50 } } // depth is missing
    const propertyService = new PropertyService(property)
    expect(propertyService.getLotDimensionsFormatted(formatFn)).toEqual(
      '50xundefined'
    )
    expect(formatFn).toHaveBeenCalledWith(50, undefined)
  })
})
