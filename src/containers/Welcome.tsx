import React from 'react';
import { Box, Text, Button } from 'rebass';
import { Input } from '@rebass/forms';

interface WelcomeProps {
  handleUserName: (userName:string) => void
}

const sxContainer = {
  alignItems: 'center',
  display: 'flex',
  height: '100%'
}

const sxWelcome = {
  display: 'flex',
  flexDirection: 'column',
  m: '0 auto',
  width: '400px',
}

const sxHeaderText = {
  fontWeight: 'bold',
  mb: [4],
  textAlign: 'center',
}

const sxInput = {
  border: 'none',
  borderBottom: '1px solid gainsboro',
  fontStyle: 'italic',
  textAlign: 'center',
  transition: 'border-bottom 1s',

  '&:focus': {
    borderBottom: '1px solid purple',
    outline: 'none',
  }
}

const sxButtonContainer = {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  mt: [4],

  button: {
    boxShadow: 'small',
  }
}

/**
 * Login container.
 */
const Welcome = ({ handleUserName }: WelcomeProps): React.ReactElement => {
  const [currentUserName, setCurrentUserName] = React.useState('');

  return (
    <Box sx={sxContainer}>
      <Box sx={sxWelcome}>
        <Text sx={sxHeaderText}>
          Hello friend, tell me your name...
        </Text>
        <Box>
          <Input sx={sxInput}
            id="currentUserName"
            name="currentUserName"
            value={currentUserName}
            placeholder="Your name here"
            onChange={(e) => setCurrentUserName(e.target.value)}
          />
        </Box>
        <Box sx={sxButtonContainer}>
          <Button onClick={() => handleUserName(currentUserName)}>
            Let's go!
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Welcome;
