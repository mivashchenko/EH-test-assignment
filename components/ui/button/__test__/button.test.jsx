import { render } from '@testing-library/react'
import { Button } from '@/components/ui/button/button'

it('should render with the default "contained" variant when no variant is provided', () => {
  const { getByRole } = render(<Button>Click me</Button>)
  const button = getByRole('button')
  expect(button).toHaveClass('contained')
})

it('should render without crashing when no children are provided', () => {
  const { getByRole } = render(<Button />)
  const button = getByRole('button')
  expect(button).toBeInTheDocument()
})
