import { render, screen } from '@testing-library/react'
import { PropertyDetailsCard } from '@/components/property-details-card/property-details-card'
import { PropertyDetailsCardHeader } from '@/components/property-details-card/property-details-card'
import { PropertyDetailsCardHeaderClosing } from '@/components/property-details-card/property-details-card'
import { PropertyDetailsCardPrice } from '@/components/property-details-card/property-details-card'
import { PropertyDetailsCardAddress } from '@/components/property-details-card/property-details-card'
import { PropertyDetailsCardDescription } from '@/components/property-details-card/property-details-card'
import { PropertyDetailsCardIconLabelContainer } from '@/components/property-details-card/property-details-card'
import { PropertyDetailsCardButtonContainer } from '@/components/property-details-card/property-details-card'
import { PropertyDetailsCardButtonContainerBlock } from '@/components/property-details-card/property-details-card'
import { PropertyDetailsCardDataGridContainer } from '@/components/property-details-card/property-details-card'
import { PropertyDetailsCardDataGridRowCell } from '@/components/property-details-card/property-details-card'
import { PropertyDetailsCardDataGridRowCellLabel } from '@/components/property-details-card/property-details-card'
import { PropertyDetailsCardDataGridRowCellValue } from '@/components/property-details-card/property-details-card'

it('should render a div with the provided children', () => {
  const { container } = render(
    <PropertyDetailsCard>
      <span>Test Child</span>
    </PropertyDetailsCard>
  )
  expect(container.firstChild).toHaveClass('root')
  expect(container.firstChild).toContainHTML('<span>Test Child</span>')
})

it('should render correctly even without any children', () => {
  const { container } = render(<PropertyDetailsCard />)
  expect(container.firstChild).toHaveClass('root')
  expect(container.firstChild).toBeEmptyDOMElement()
})

it('should render without crashing with valid ReactNode children', () => {
  const { container } = render(
    <PropertyDetailsCardHeader>
      <div>Test Child</div>
    </PropertyDetailsCardHeader>
  )
  expect(container).toBeTruthy()
})

it('should render correctly with no children', () => {
  const { container } = render(<PropertyDetailsCardHeader />)
  expect(container.firstChild).toBeEmptyDOMElement()
})

it('should render label and value correctly when both are provided', () => {
  const { getByText } = render(
    <PropertyDetailsCardHeaderClosing
      label='Closing Date'
      value='05 October 2011 14:48 UTC'
    />
  )
  expect(getByText('Closing Date')).toBeInTheDocument()
  expect(getByText('October 5, 2011')).toBeInTheDocument()
})

it('should render nothing when both label and value are empty', () => {
  const { container } = render(
    <PropertyDetailsCardHeaderClosing label='' value='' />
  )
  expect(container.firstChild).toBeNull()
})

it('should format positive numbers as USD currency', () => {
  const { container } = render(<PropertyDetailsCardPrice content={1500} />)
  expect(container.textContent).toBe('$1,500')
})

it('should handle extremely large numbers correctly', () => {
  const { container } = render(
    <PropertyDetailsCardPrice content={123456789012345} />
  )
  expect(container.textContent).toBe('$123,000,000,000,000')
})

it('should display the address content correctly when provided with a typical address string', () => {
  const { getByText } = render(
    <PropertyDetailsCardAddress content='123 Main St, Anytown, USA' />
  )
  expect(getByText('123 Main St, Anytown, USA')).toBeInTheDocument()
})

it('should display nothing when provided with an empty string', () => {
  const { container } = render(<PropertyDetailsCardAddress content='' />)
  expect(container.firstChild).toBeEmptyDOMElement()
})

it('should render a paragraph element with the provided content', () => {
  const { container } = render(
    <PropertyDetailsCardDescription content='Test content' />
  )
  const paragraph = container.querySelector('p')
  expect(paragraph).toBeInTheDocument()
  expect(paragraph).toHaveTextContent('Test content')
})

it('should handle empty string content without errors', () => {
  const { container } = render(<PropertyDetailsCardDescription content='' />)
  const paragraph = container.querySelector('p')
  expect(paragraph).toBeInTheDocument()
  expect(paragraph).toHaveTextContent('')
})

it('should display only dividers when rendered with no children', () => {
  const { container } = render(<PropertyDetailsCardIconLabelContainer />)
  expect(container.firstChild).toMatchSnapshot()
})

it('should handle null children without crashing', () => {
  const { container } = render(
    <PropertyDetailsCardIconLabelContainer>
      {null}
    </PropertyDetailsCardIconLabelContainer>
  )
  expect(container.firstChild).toMatchSnapshot()
})

it('should render without crashing', () => {
  const { container } = render(
    <PropertyDetailsCardButtonContainer>
      <div>Test</div>
    </PropertyDetailsCardButtonContainer>
  )
  expect(container).toBeInTheDocument()
})

it('should handle null children without errors', () => {
  const { container } = render(
    <PropertyDetailsCardButtonContainer>
      {null}
    </PropertyDetailsCardButtonContainer>
  )
  expect(container).toBeInTheDocument()
})

it('should render a div with the specified children', () => {
  const { container } = render(
    <PropertyDetailsCardButtonContainerBlock>
      <span>Test Child</span>
    </PropertyDetailsCardButtonContainerBlock>
  )
  expect(container.firstChild).toHaveClass('buttonsContainer_block')
  expect(container.firstChild).toContainHTML('<span>Test Child</span>')
})

it('should render correctly without any children', () => {
  const { container } = render(<PropertyDetailsCardButtonContainerBlock />)
  expect(container.firstChild).toHaveClass('buttonsContainer_block')
  expect(container.firstChild).toBeEmptyDOMElement()
})

it('should render a div with the specified children', () => {
  const { container } = render(
    <PropertyDetailsCardDataGridContainer>
      <span>Test Child</span>
    </PropertyDetailsCardDataGridContainer>
  )
  expect(container.firstChild).toHaveClass('dataGridContainer')
  expect(container.firstChild).toContainHTML('<span>Test Child</span>')
})

it('should render correctly with no children', () => {
  const { container } = render(<PropertyDetailsCardDataGridContainer />)
  expect(container.firstChild).toHaveClass('dataGridContainer')
  expect(container.firstChild).toBeEmptyDOMElement()
})

it('should render a div with the specified children', () => {
  const { container } = render(
    <PropertyDetailsCardDataGridRowCell>
      <span>Test Child</span>
    </PropertyDetailsCardDataGridRowCell>
  )
  expect(container.firstChild).toHaveClass('dataGridRowCell')
  expect(container.firstChild).toContainHTML('<span>Test Child</span>')
})

it('should render correctly without any children', () => {
  const { container } = render(<PropertyDetailsCardDataGridRowCell />)
  expect(container.firstChild).toHaveClass('dataGridRowCell')
  expect(container.firstChild).toBeEmptyDOMElement()
})

it('should render without crashing', () => {
  const { unmount } = render(<PropertyDetailsCardDataGridRowCellLabel />)
  unmount()
})

it('should render correctly with no children', () => {
  const { container } = render(<PropertyDetailsCardDataGridRowCellLabel />)
  expect(container.firstChild).toBeEmptyDOMElement()
})

it('should render a div with the specified children', () => {
  const { container } = render(
    <PropertyDetailsCardDataGridRowCellValue>
      <span>Test Child</span>
    </PropertyDetailsCardDataGridRowCellValue>
  )
  expect(container.querySelector('div')).toContainHTML(
    '<span>Test Child</span>'
  )
})

it('should render correctly with no children passed', () => {
  const { container } = render(<PropertyDetailsCardDataGridRowCellValue />)
  expect(container.querySelector('div')).toBeEmptyDOMElement()
})
