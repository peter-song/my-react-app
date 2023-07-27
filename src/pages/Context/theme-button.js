/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from 'antd';

import { ThemeContext } from './theme-context';

class ThemeButton extends React.Component {
  render() {
    const theme = this.context;
    const style = {
      color: theme.foreground,
      backgroundColor: theme.background,
    };
    return (
      <>
        <Button {...this.props} style={style}>
          {this.props.children}
        </Button>
      </>
    );
  }
}

ThemeButton.contextType = ThemeContext;

export default ThemeButton;
