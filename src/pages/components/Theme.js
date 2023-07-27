/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import { Button, Space } from 'antd';

import './index.css';

const theme = {
  dark: {
    color: '#1890ff',
    background: '#1890ff',
    border: '1px solid blue',
    type: 'dark',
  },
  light: {
    color: '#fc4838',
    background: '#fc4838',
    border: '1px solid pink',
    type: 'light',
  },
};

const ThemeContext = React.createContext(null);

function Checkbox(props) {
  const {
    label,
    name,
    onChange,
  } = props;
  const { color, type } = useContext(ThemeContext);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
      onClick={onChange}
    >
      <label htmlFor="name">{label}</label>
      <input
        type="checkbox"
        id={name}
        name={name}
        style={{ color }}
        checked={name === type}
      />
    </div>
  );
}

function Box(props) {
  return (
    <ThemeContext.Consumer>
      {
        themeValue => {
          const { border, color } = themeValue;
          return (
            <div style={{
              ...props.style,
              border,
              color,
            }}>
              {props.children}
            </div>
          );
        }
      }
    </ThemeContext.Consumer>
  );
}

function Input(props) {
  const { color, border } = useContext(ThemeContext);
  const { label, placeholder } = props;

  return (
    <div>
      <label style={{ color }}>{label}</label>
      <input placeholder={placeholder} style={{ border }} />
    </div>
  );
}

class App extends React.Component {
  render() {
    const {
      color, background, border, setTheme,
    } = this.context;

    return (
      <div style={{
        color,
        border,
      }}>
        <div style={{
          display: 'flex',
          padding: 8,
        }}>
          <span className="box">选择主题：</span>
          <Space>
            <Checkbox label="light" name="light" onChange={() => setTheme(theme.light)} />
            <Checkbox label="dark" name="dark" onChange={() => setTheme(theme.dark)} />
          </Space>
        </div>
        <div style={{ padding: 8 }}>
          <Box style={{ padding: 8 }}>
            <div>
              <Input label="姓名：" placeholder="请输入姓名" />
              <Input label="年龄：" placeholder="请输入年龄" />
            </div>
            <Space style={{ marginTop: 8 }}>
              <Button style={{
                background,
                color: '#fff',
              }}>
                确定
              </Button>
              <Button style={{ color }}>取消</Button>
            </Space>
          </Box>
          <Box>
            <div style={{
              color: '#fff',
              background,
              padding: 8,
            }}>
              I am alien <br />
              let us learn React context!
            </div>
          </Box>
        </div>
      </div>
    );
  }
}
App.contextType = ThemeContext;

function Index() {
  const [themeValue, setThemeValue] = useState(theme.light);
  return (
    <ThemeContext.Provider value={{
      ...themeValue,
      setTheme: setThemeValue,
    }}>
      <App />
    </ThemeContext.Provider>
  );
}

export default Index;
