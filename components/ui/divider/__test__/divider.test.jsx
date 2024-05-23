import { render } from '@testing-library/react'
import { Divider } from '@/components/ui/divider/divider'

it('should render without crashing when provided valid props', () => {
  const { container } = render(<Divider direction='horizontal' />)
  expect(container.firstChild).toBeInTheDocument()
})

it('should handle null className without errors', () => {
  const { container } = render(
    <Divider direction='vertical' className={null} />
  )
  expect(container.firstChild).toHaveClass('vertical')
})
