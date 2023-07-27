/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeContext, themes } from './Context/theme-context';
import ThemeButton from './Context/theme-button';

function Toolbar(props) {
  return (
    <ThemeButton onClick={props.changeTheme}>
      Change Theme
    </ThemeButton>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { theme: themes.light };
  }

  toggleTheme = () => {
    const { theme } = this.state;
    this.setState({ theme: theme === themes.dark ? themes.light : themes.dark });
  };

  render() {
    const { theme } = this.state;
    return (
      <div>
        <ThemeContext.Provider value={theme}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
      </div>
    );
  }
}

export default App;
