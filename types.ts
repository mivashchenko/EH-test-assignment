export type Property = {
  // The address of the house
  streetAddress: string
  // The lot number within the block
  lot: string
  // The block number within the neighborhood
  block: string
  // Additional information regarding the state of this specific property
  flagType: string
  // The status of the construction stage on the property
  constructionStatus: string
  // The direction of the front of the property
  directionFacing: string
  // The dimensions of the lot
  lotDimensions: {
    width: number
    depth: number
  }
  tourLink?: string
  // The price of the property
  price: number
  // The square footage of the lot
  sqFootLot: number
  // Whether the property is pool compatible or not
  isPoolCompatible: boolean
  // The estimated closing date iso string if the property sold today
  estimatedClosingDate: string
  // The main image of a property
  titleImage: Attachment
  // The list of images for the property
  images: Attachment[]
  // The image of the lot plat
  plat: Attachment
  // The floor plan built on the property
  floorPlan?: FloorPlan
  // The house style applied to the floor plan
  houseStyle?: {
    name: string
  }
  // The location of the property
  location: Location
  // The neighborhood that the property belongs to
  neighborhood: Neighborhood
}

export type Attachment = {
  // Where the attachment exists
  url: string
  // The title of the image
  title?: string
  // Additional info about the image
  description?: string
}

export type FloorPlan = {
  // The name of the floor plan
  name: string
  // The description of the floor plan
  description?: string
  // The square footage of the floor plan
  sqFootMasonry: number
  // The count of bedrooms
  bedrooms: number
  // The count of full baths
  bathsFull: number
  // The count of half baths
  bathsHalf: number
  // The amount of stories
  levels: number
  // The amount of garage spaces for cars
  garageSpaces: number
  // A tour link to give the visual representation of the floor plan
  tourLink: string
  // The cover image of the floor plan
  titleImage: Attachment
  // The additional images for the floor plan
  images: Attachment[]
}

export type Location = {
  // The name of the location if it has one
  name?: string
  // The type of location if it has one
  locationSubType?: string
  // Used on objects that have a single point
  center?: number[]
  // Used on objects that are polygons
  perimeter?: number[][]
}

export type Neighborhood = {
  // The name of the neighborhood
  name: string
  // The city that the neighborhood is in
  city: string
  // The nearest main cross roads
  intersection: string
  // The main elementary school for this neighborhood
  elementarySchool: string
  // The size of lots in the neighborhood
  lotType: string
  // The top down image for the neighborhood
  droneImage: Attachment
  // The images to show off the neighborhoood
  salesImages: Attachment[]
  // The amenities that the neighborhood has
  amenities?: Amenity[]
  // The main conveniences for the neighborhood
  conveniences?: Location[]
  // The location of the neighborhood
  location: Location
  // The location of the school district location
  schoolDistrictLocation: Location
}

export type Amenity = {
  // The name of the amenity
  name: string
}
