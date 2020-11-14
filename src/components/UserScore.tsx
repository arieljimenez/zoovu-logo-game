import * as React from 'react';
import { Box, Text } from 'rebass';


const sxScore = {
  textAlign: 'right'
}

/**
 * UserScore component.
 */
const UserScore = ({ timeState }: UserScoreProps): React.ReactElement => {
  const { totalTime, timeStatus, countDown } = timeState;

  return(
    <Box sx={sxScore}>
      <Text className="headerTitle score">
        Your score: {totalTime} seconds
      </Text>
      <Text className="headerSubTitle">
        The Faster the better!
      </Text>

      {timeStatus === 'restarting'
        ? <Text className="headerSubTitle countDown">Restarting on: {countDown} seconds</Text>
        : null
      }
    </Box>
  )
}

export default UserScore;
