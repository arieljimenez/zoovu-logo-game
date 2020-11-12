import * as React from 'react';
import { Box, Card } from 'rebass';

import {ReactComponent as  LogoZ } from '../svgs/zoovu-z.svg';
import {ReactComponent as  LogoO } from '../svgs/zoovu-o.svg';
import {ReactComponent as  LogoV } from '../svgs/zoovu-v.svg';
import {ReactComponent as  LogoU } from '../svgs/zoovu-u.svg';

interface LogoLetterProps {
  logoLetter: LogoLetter
}

const LOGOS = {
  z: LogoZ,
  o: LogoO,
  v: LogoV,
  u: LogoU
}

const sxCard = {
  width: 150,
  bg: 'white',
  display: 'flex',
  alignItems: 'center',
  boxShadow: 'large',
  flexDirection: 'column',

  svg: {
    height: '100%',
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
