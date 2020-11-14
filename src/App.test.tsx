import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

it('should render an warm welcome', () => {
  render(<App />);
  const greetingElement = screen.getByText(/Hello friend, tell me your name/i);
  expect(greetingElement).toBeInTheDocument();
});
