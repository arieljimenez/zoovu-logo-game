import React from 'react';
import { Box, Text } from 'rebass';

import GameBoard from '../components/GameBoard';
import UserScore from '../components/UserScore';

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
  },

  '.countDown': {
    color: 'crimson'
  }
}


const sxBody = {
  color: 'gray',
  fontWeight: 'bold',
  fontSize: 2,
}

const INITIAL_TIME_STATE: TimeState = {
  totalTime: 0,
  timeStatus: 'halted',
  countDown: 10
}

/**
 * Game Container.
 */
const Game = ({ userName }: GameContainerProps): React.ReactElement => {
  const [timeState, setTimeState] = React.useState<TimeState>({
    ...INITIAL_TIME_STATE,
  })

  const increaseTotalTime = (amount: number): void => {
    setTimeState({
      ...timeState,
      totalTime: timeState.totalTime + amount,
    });
  }

  const reset = () => {
    setTimeState({
      ...INITIAL_TIME_STATE,
    })
  }

  const startTime = () => {
    setTimeState( {
      ...timeState,
      timeStatus: 'running'
    });
  }

  const stopTime = () => {
    setTimeState({
      ...timeState,
      timeStatus: 'restarting'
    });
  }

  React.useEffect(() => {
    const intervalID = setInterval(
        () => {
          if (timeState.timeStatus === 'running') {
              increaseTotalTime(1);
            };

          if (timeState.timeStatus === 'restarting') {
            const count = timeState.countDown - 1;

            if (count > 0) {
              decreaseCount()
            } else {
              reset();
            }
          };
        },
      1000
    );

    return () => clearInterval(intervalID);
  });

  const decreaseCount = () => {
    setTimeState({
      ...timeState,
      countDown: timeState.countDown - 1,
    })
  }

  return (
    <Box sx={sxGameContainer}>
      <Box sx={sxHeader}>
        <Box>
          <Text className="headerTitle">
            Good Luck, {userName}!
          </Text>
          <Text className="headerSubTitle">
            Pick up the right cards
          </Text>
        </Box>
        <UserScore timeState={timeState} />
      </Box>
      <Box sx={sxBody}>
        <GameBoard {...
          { startTime,
            stopTime,
            increaseTotalTime,
            totalTime: timeState.totalTime,
            timeStatus: timeState.timeStatus
          }
        } />
      </Box>
    </Box>
  )
}

export default Game;
