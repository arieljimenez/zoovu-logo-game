import * as React from 'react';
import { Box } from 'rebass';

const sxLogoSockets = {
  width: 150,
  height: 150,
  border: '3px dashed lightskyblue'
}

const sxSocketsContainer = {
  mt: 4,
  display: 'flex',
  justifyContent: 'space-between',
}

/**
 * LogoSockets component.
 */
const LogoSockets = (): React.ReactElement => {
  const EmtpySockets = [0, 1, 2, 3, 4].map((val) => <Box key={val} sx={sxLogoSockets} />);

  return (
   <Box sx={sxSocketsContainer}>
     {EmtpySockets}
   </Box>
  )
}

export default LogoSockets;
