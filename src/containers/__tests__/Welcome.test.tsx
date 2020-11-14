import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Welcome from '../Welcome';

describe('<Welcome />', () => {
  beforeEach(cleanup);

  it('should render an input', () => {
    render(<Welcome handleUserName={() => {}} />);

    const element = screen.getByTestId('userName');
    expect(element).toBeInTheDocument();
  });

  it('should store the user name on the input', () => {
    render(<Welcome handleUserName={() => {}} />);

    const element = screen.getByTestId('userName');

    userEvent.type(element, 'John Doe');
    expect(element).toHaveValue('John Doe');
  });

  it('should execute "handleUserName" once button is clicked ', () => {
    const handleUserName = jest.fn();
    render(<Welcome handleUserName={handleUserName} />);

    const element = screen.getByTestId('userName');

    userEvent.type(element, 'John Doe');
    userEvent.click(screen.getByRole('button'));

    expect(handleUserName).toHaveBeenCalledTimes(1);
  });
});
