import React from 'react';
import { ThemeProvider } from 'emotion-theming';

import { GameContainer, WelcomeContainer } from './containers';
import theme from './theme';

function App () {
  const [userName, setUserName] = React.useState('');

  const handleUserName = (userName: string) => {
    setUserName(userName);
  }

  return (
    <ThemeProvider theme={theme}>
        {userName
          ? <GameContainer userName={userName} />
          : <WelcomeContainer handleUserName={handleUserName} />
        }
    </ThemeProvider>
  );
}

export default App;
