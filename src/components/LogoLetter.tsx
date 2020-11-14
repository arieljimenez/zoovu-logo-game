import * as React from 'react';
import { Box, Card } from 'rebass';

import {ReactComponent as  LogoZ } from '../svgs/zoovu-z.svg';
import {ReactComponent as  LogoO } from '../svgs/zoovu-o.svg';
import {ReactComponent as  LogoV } from '../svgs/zoovu-v.svg';
import {ReactComponent as  LogoU } from '../svgs/zoovu-u.svg';

interface LogoLetterProps {
  logoLetter: LogoLetter
}

const sxLogoSockets = {
  bg: 'lightgray',
  border: '3px dashed lightskyblue',
  height: 130,
  width: 140,
}

const EmptySocket = () => <Box data-testid="empty" sx={sxLogoSockets} />;

const LOGOS = {
  z: LogoZ,
  o: LogoO,
  v: LogoV,
  u: LogoU,
  o2: LogoO,
  e: EmptySocket,
}

const sxCard = {
  alignItems: 'center',
  borderRadius: '16px',
  boxShadow: 'large',
  display: 'flex',
  flexDirection: 'column',

  svg: {
    flex: 'auto',
    height: '130px',
    py: '10px',
    width: '140px',
  }
}

/**
 * LogoLetter component.
 */
const LogoLetter = ({ logoLetter }: LogoLetterProps): React.ReactElement => {
  const Letter = LOGOS[logoLetter];

  return (
    <Card sx={sxCard}>
      <Letter />
    </Card>
  )
}

export default LogoLetter;
