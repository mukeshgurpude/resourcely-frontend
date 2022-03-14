import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import Logo from ".";

test('Default logo without link', () => {
  render(<Logo/>);
  expect(screen.queryByRole('a')).toBeNull()
});

test('Adds a link to homepage', () => {
  render(<Logo link/>, {wrapper: BrowserRouter});
  const link = screen.getByRole('link')
  expect(link).toBeInTheDocument()
  expect(link).toHaveAttribute('href', '/')
})
