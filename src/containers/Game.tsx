import React from 'react';
import { Box, Text } from 'rebass';

import StartingPieces from '../components/StartingPieces';
import LogoSockets from '../components/LogoSockets';

interface GameContainerProps {
  userName: string;
}

const sxGameContainer = {
  width: [null, '90%', null, '940px'],
  margin: '0 auto',
}

const sxHeader= {
  pt: 2,
  display: 'flex',
  justifyContent: 'space-between',
  fontWeight: 'bold',


  '.headerTitle': {
    fontSize: 4,
    mb: 2
  },

  '.headerSubTitle': {
    fontStyle: 'italic',
    fontSize: 2,
    color: 'gray',
  },

  '.score': {
    color: 'purple'
  }
}

const sxScore = {
  textAlign: 'right'
}

const sxBody = {
  color: 'gray',
  fontWeight: 'bold',
  fontSize: 2,
}

/**
 * Game Container.
 */
const Game = ({ userName }: GameContainerProps): React.ReactElement => {

  return (
    <Box sx={sxGameContainer}>
      <Box sx={sxHeader}>
        <Box >
          <Text className="headerTitle">
            Good Luck, {userName}!
          </Text>
          <Text className="headerSubTitle">
            Pick up the right cards
          </Text>
        </Box>
        <Box sx={sxScore}>
          <Text className="headerTitle score">
            Your score: 25 seconds
          </Text>
          <Text className="headerSubTitle">
            The Faster the better!
          </Text>
        </Box>
      </Box>
      <Box sx={sxBody}>
        <StartingPieces />
        <Text>... and drop them here to make the logo great again!</Text>
        <LogoSockets />
      </Box>
    </Box>
  )
}

export default Game;
