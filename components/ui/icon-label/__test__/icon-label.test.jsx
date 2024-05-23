import { render } from '@testing-library/react'
import { IconLabel } from '@/components/ui/icon-label/icon-label'

it('should render with transparent background by default', () => {
  const { container } = render(<IconLabel />)
  expect(container.firstChild).toHaveClass('bgTransparent')
})

it('should render correctly without any props', () => {
  const { container } = render(<IconLabel />)
  expect(container.firstChild).toBeInTheDocument()
})
