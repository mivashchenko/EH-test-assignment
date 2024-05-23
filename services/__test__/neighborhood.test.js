import { NeighborhoodService } from '@/services/neighborhood'

describe('NeighborhoodService', () => {
  // Constructor initializes with a given neighborhood
  it('should initialize with a given neighborhood when provided', () => {
    const neighborhood = { name: 'Greenwood', city: 'Seattle' }
    const service = new NeighborhoodService(neighborhood)
    expect(service.name).toEqual('Greenwood')
  })

  // setNeighborhood sets the neighborhood property correctly
  it('should set the neighborhood property correctly', () => {
    const service = new NeighborhoodService()
    const neighborhood = { name: 'Greenwood', city: 'Seattle' }
    service.setNeighborhood(neighborhood)
    expect(service.name).toEqual('Greenwood')
  })

  // get name returns the neighborhood name
  it('should return the neighborhood name', () => {
    const neighborhood = { name: 'Greenwood', city: 'Seattle' }
    const service = new NeighborhoodService(neighborhood)
    expect(service.name).toEqual('Greenwood')
  })

  // Constructor handles null input gracefully
  it('should handle null input gracefully in constructor', () => {
    const service = new NeighborhoodService(null)
    expect(service.name).toBeUndefined()
  })

  // getByPath returns default value when path does not exist
  it('should return default value when path does not exist', () => {
    const service = new NeighborhoodService()
    expect(service.getByPath(['nonexistent'], 'default')).toEqual('default')
  })

  // get amenities returns an empty list if amenities are undefined
  it('should return an empty list if amenities are undefined', () => {
    const neighborhood = { name: 'Greenwood', city: 'Seattle' }
    const service = new NeighborhoodService(neighborhood)
    expect(service.amenities).toEqual([])
  })

  // get amenityNames handles empty amenities list
  it('should handle empty amenities list correctly', () => {
    const neighborhood = { name: 'Greenwood', city: 'Seattle' }
    const service = new NeighborhoodService(neighborhood)
    expect(service.amenityNames).toEqual([])
  })
})
