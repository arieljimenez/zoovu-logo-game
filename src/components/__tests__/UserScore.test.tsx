import React from 'react';
import { render, screen } from '@testing-library/react';

import UserScore from '../UserScore';

describe('<UserScore />', () => {
  const DEFAULT_TIMEDATA: TimeState = {
    totalTime: 3,
    timeStatus: 'halted',
    countDown: 10,
  }

  let timeStateProps: TimeState;

  beforeEach(() => {
    // resets
    timeStateProps = { ...DEFAULT_TIMEDATA};
  })

  test('renders the passed TimeState values', () => {
    render(<UserScore timeState={timeStateProps} />);

    const totalTimeElement = screen.getByText(/Your score: 3 seconds/i);
    expect(totalTimeElement).toBeInTheDocument();
  });

  test('if timeStatus is not "restarting" should not render the countdown component', () => {
    render(<UserScore timeState={timeStateProps} />);

    const countTimeElement = screen.queryByText(/Restarting on: 10 seconds/i);
    expect(countTimeElement).not.toBeInTheDocument();
  });

  test('if timeStatus is "restarting" should render the countdown component', () => {
    timeStateProps.timeStatus = 'restarting';

    render(<UserScore timeState={timeStateProps} />);

    const countTimeElement = screen.getByText(/Restarting on: 10 seconds/i);
    expect(countTimeElement).toBeInTheDocument();
  });

});
