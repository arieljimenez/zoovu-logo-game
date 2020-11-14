import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';

import LogoLetter from '../LogoLetter';

describe('<LogoLetter />', () => {
  const logoLetters: LogoLetter[] = ['z', 'o', 'o2', 'v', 'u'];

  beforeEach(cleanup);

  it('should render all the logo letters', () => {
    logoLetters.map((letter:LogoLetter) => {
      render(<LogoLetter logoLetter={letter} />);

      const svgString = `zoovu-${letter === 'o2' ? 'o' : letter }.svg`;

      const svgElement = screen.getByText(svgString);
      expect(svgElement).toBeInTheDocument();
      cleanup()
    });
  });

  it('should render an empty div if the letter is "e"', () => {
    render(<LogoLetter logoLetter={'e'} />);

    const emptyElement = screen.getByTestId('empty');
    expect(emptyElement).toBeInTheDocument();
  })
});