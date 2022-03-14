import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header', () => {
  render(<App/>);
  const headerText = screen.getByText(/header/i);
  expect(headerText).toBeInTheDocument();
  expect(screen)
});
