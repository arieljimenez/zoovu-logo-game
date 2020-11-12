import * as React from 'react';
import { Box } from 'rebass';

import LogoLetter from './LogoLetter';

const logoLettersMap: { [key: number]: LogoLetter}  = {
  1: 'z',
  2: 'o',
  3: 'v',
  4: 'u'
}

const sxPiecesContainer = {
  mt: 5,
  mb: 6,
  display: 'flex',
  height: 150,
  justifyContent: 'space-between',
}

/**
 * StartingPieces component.
 */
const StartingPieces = (): React.ReactElement => {
  const [order, setOrder] = React.useState([] as LogoLetter[]);
  let tries = 0;

  const start = () => {
    const letters: LogoLetter[] = [];
    let oCount = 0;

    for (tries = 0; letters.length < 5; tries++) {
      const num = Math.floor(1 + Math.random() * 4);

      const letter: LogoLetter = logoLettersMap[num];

      if (!letters.includes(letter)) {
        letters.push(letter);
      } else if (letter === 'o' && oCount === 1) {
        letters.push(letter);
        oCount++;
      }

      if (letter === 'o') {
        oCount++;
      }

      if (tries > 500) { // just in case
        console.log('== had to br', tries);
        console.log({ letters })
        break;
      }
    }
    setOrder(letters);
  }

  React.useEffect( () => {
    start();
  }, []);

  return(
    <Box sx={sxPiecesContainer}>
      {order.map((letter, index) => <LogoLetter key={letter+index} logoLetter={letter} />)}
    </Box>
  )
}

export default StartingPieces;
