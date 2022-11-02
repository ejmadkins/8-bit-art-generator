import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../components/App';

test('renders 8-bit-art-generator text', () => {
  render(<App />);
  const linkElement = screen.getByText(/8-bit-art-generator/i);
  expect(linkElement).toBeInTheDocument();
});
