import { render } from '@testing-library/react'
import { BackButton } from '@/components/ui/back-button/back-button'

it('should render a button element', () => {
  const { getByRole } = render(<BackButton />)
  const button = getByRole('button')
  expect(button).toBeInTheDocument()
})

it('should handle null className without crashing', () => {
  const { getByRole } = render(<BackButton className={null} />)
  const button = getByRole('button')
  expect(button).toBeInTheDocument()
  expect(button.className).toBe('root')
})
