import { render, screen } from '@testing-library/react'

import {
  PropertyCardChipContainer,
  PropertyCard,
  PropertyCardHead,
  PropertyCardHeadLabels,
  PropertyCardImage,
  PropertyCardContent,
  PropertyCardStatusLabel,
  PropertyCardPrice,
  PropertyCardAddress,
  PropertyCardDescription,
  PropertyCardChipValue,
  PropertyCardChipUnit,
  PropertyCardChip,
} from '@/components/property-list/components/property-card/property-card'

it('should render without crashing when given default props', () => {
  render(<PropertyCard>Sample Content</PropertyCard>)
  expect(screen.getByText('Sample Content')).toBeInTheDocument()
})

it('should handle null children without errors', () => {
  const { container } = render(<PropertyCard>{null}</PropertyCard>)
  expect(container).not.toBeNull()
})

it('should render empty when no children are provided', () => {
  const { container } = render(<PropertyCardHead />)
  expect(container.firstChild).toBeEmptyDOMElement()
})

it('should not throw an error when children is null', () => {
  const { container } = render(<PropertyCardHead>{null}</PropertyCardHead>)
  expect(container.firstChild).toBeEmptyDOMElement()
})

it('should render IconLabel with floorPlanName and grey background', () => {
  const { getByText } = render(
    <PropertyCardHeadLabels floorPlanName='Modern' houseStyleName={undefined} />
  )
  const floorPlanLabel = getByText('Modern')
  expect(floorPlanLabel).toBeInTheDocument()
  expect(floorPlanLabel.closest('div')).toHaveClass('bgGrey')
})

it('should not render IconLabels when floorPlanName and houseStyleName are undefined', () => {
  const { queryByText } = render(
    <PropertyCardHeadLabels
      floorPlanName={undefined}
      houseStyleName={undefined}
    />
  )
  expect(queryByText(/.+/)).not.toBeInTheDocument()
})

it('should render without crashing', () => {
  const { container } = render(<PropertyCardImage />)
  expect(container).toBeInTheDocument()
})

it('should render empty when no children are provided', () => {
  const { container } = render(<PropertyCardContent />)
  expect(container.firstChild).toBeEmptyDOMElement()
})

it('should not crash when children are undefined', () => {
  const { container } = render(
    <PropertyCardContent>{undefined}</PropertyCardContent>
  )
  expect(container.firstChild).toBeEmptyDOMElement()
})

it('should render a span with the correct content', () => {
  const { getByText } = render(<PropertyCardStatusLabel content='Available' />)
  const spanElement = getByText('Available')
  expect(spanElement).toBeInTheDocument()
  expect(spanElement.tagName).toBe('SPAN')
})

it('should render correctly with empty content', () => {
  const { container } = render(<PropertyCardStatusLabel content='' />)
  expect(container.firstChild).toBeEmptyDOMElement()
})

it('should format positive numbers as USD currency', () => {
  const { container } = render(<PropertyCardPrice content={1500} />)
  expect(container.textContent).toBe('$1,500')
})

it('should render a paragraph with the provided content', () => {
  const { getByText } = render(<PropertyCardAddress content='Test Address' />)
  const paragraphElement = getByText('Test Address')
  expect(paragraphElement).toBeInTheDocument()
  expect(paragraphElement.tagName).toBe('P')
})

it('should render correctly with empty string content', () => {
  const { container } = render(<PropertyCardAddress content='' />)
  expect(container.firstChild).toBeEmptyDOMElement()
})

it('should render a paragraph with the provided content', () => {
  const { getByText } = render(
    <PropertyCardDescription content='Test content' />
  )
  const paragraph = getByText('Test content')
  expect(paragraph).toBeInTheDocument()
  expect(paragraph.tagName).toBe('P')
})

it('should render correctly with an empty content string', () => {
  const { container } = render(<PropertyCardDescription content='' />)
  expect(container.firstChild).toBeEmptyDOMElement()
})

it('should render a span with the correct class', () => {
  const { container } = render(<PropertyCardChipValue content={123} />)
  const spanElement = container.querySelector('span')
  expect(spanElement).toBeInTheDocument()
  expect(spanElement).toHaveClass('chipValue')
})

it('should handle and display extremely large numbers correctly', () => {
  const largeNumber = 999999999999999
  const { getByText } = render(<PropertyCardChipValue content={largeNumber} />)
  const displayedValue = getByText(largeNumber.toString())
  expect(displayedValue).toBeInTheDocument()
})

it('should render a span with the provided content', () => {
  const { container } = render(<PropertyCardChipUnit content='100' />)
  const span = container.querySelector('span')
  expect(span).toBeInTheDocument()
  expect(span).toHaveTextContent('100')
})

it('should render correctly with empty string content', () => {
  const { container } = render(<PropertyCardChipUnit content='' />)
  const span = container.querySelector('span')
  expect(span).toBeInTheDocument()
  expect(span).toHaveTextContent('')
})

it('should render correctly with simple text child', () => {
  const { getByText } = render(<PropertyCardChip>Test Child</PropertyCardChip>)
  expect(getByText('Test Child')).toBeInTheDocument()
})

it('should render correctly without any children', () => {
  const { container } = render(<PropertyCardChip />)
  expect(container.firstChild).toBeEmptyDOMElement()
})

it('should render a PropertyCardChip for each valid detail', () => {
  const details = [
    { value: 3, unit: 'beds' },
    { value: 2, unit: 'baths' },
  ]
  render(<PropertyCardChipContainer details={details} />)
  const chips = screen.getAllByText(/beds|baths/)
  expect(chips.length).toBe(2)
})

it('should render no PropertyCardChips when details array is empty', () => {
  render(<PropertyCardChipContainer details={[]} />)
  const chips = screen.queryByText(/beds|baths/)
  expect(chips).toBeNull()
})
