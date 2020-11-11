import React from 'react';
import { Box } from 'rebass';

interface GameContainerProps {
  userName: string;
}

const sxGame = {
  display: 'flex',
  alignItems: 'center',
  height: '100%'
}

/**
 * Game Container.
 */
const Game = ({ userName }: GameContainerProps): React.ReactElement => {

  return (
    <Box sx={sxGame}>
      {userName}
    </Box>
  )
}

export default Game;
