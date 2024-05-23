import { render } from '@testing-library/react'

import { Icons } from '../index'

it('should render the SVG element with correct attributes', () => {
  const { container } = render(<Icons.Search />)
  const svg = container.querySelector('svg')
  expect(svg).toBeInTheDocument()
  expect(svg).toHaveAttribute('width', '16')
  expect(svg).toHaveAttribute('height', '15')
  expect(svg).toHaveAttribute('viewBox', '0 0 16 15')
})

it('should render successfully with minimal or zero props', () => {
  const { container } = render(<Icons.Search />)
  expect(container.firstChild).toMatchSnapshot()
})
