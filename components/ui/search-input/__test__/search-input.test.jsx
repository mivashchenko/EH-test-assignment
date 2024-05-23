import { fireEvent, render } from '@testing-library/react'
import { SearchInput } from '@/components/ui/search-input/search-input'

it('should render an input field and a search icon correctly', () => {
  const { getByRole, getByTestId } = render(<SearchInput />)
  const input = getByRole('textbox')
  const icon = getByTestId('search-icon')
  expect(input).toBeInTheDocument()
  expect(icon).toBeInTheDocument()
})

it('should handle extremely long strings without crashing', () => {
  const longString = 'a'.repeat(10000)
  const { getByRole } = render(<SearchInput />)
  const input = getByRole('textbox')
  fireEvent.change(input, { target: { value: longString } })
  expect(input.value).toBe(longString)
})
