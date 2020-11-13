import * as React from 'react';
import { Box } from 'rebass';

import LogoLetter from './LogoLetter';

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



  return (
    <Box sx={sxPiecesContainer}>
      {order.map((letter, index) => <LogoLetter key={letter+index} logoLetter={letter} />)}
    </Box>
  )
}

export default StartingPieces;
