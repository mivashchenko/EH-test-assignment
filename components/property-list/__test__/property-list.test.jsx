import { render, screen } from '@testing-library/react'
import { PropertyList } from '@/components/property-list/property-list'
import { propertyMock } from '@/mocks/property.mock'

it('should render all properties correctly when provided with a non-empty list', () => {
  const propertyList = [propertyMock]
  const { getByText } = render(
    <PropertyList propertyList={propertyList} selectedProperty={null} />
  )
  expect(getByText('123 Main St')).toBeInTheDocument()
  expect(getByText('Mid-Construction')).toBeInTheDocument()
  expect(getByText('$500,000')).toBeInTheDocument()
})

it('should not render any property elements when provided with an empty list', () => {
  const { queryByText } = render(
    <PropertyList propertyList={[]} selectedProperty={null} />
  )
  expect(queryByText(/sqft/)).toBeNull()
  expect(queryByText(/beds/)).toBeNull()
  expect(queryByText(/baths/)).toBeNull()
})
