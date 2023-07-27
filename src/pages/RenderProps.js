/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useState } from 'react';

import { Divider, Typography } from 'antd';

import { debounce } from './utils/utils';

function Mouse(props) {
  const [x, setX] = useState(700);
  const [y, setY] = useState(300);

  const handleMouseMove = e => {
    setX(e.clientX);
    setY(e.clientY);
  };

  return (
    <div
      style={{ height: '100vh' }}
      onMouseMove={debounce(handleMouseMove, 100)}
    >
      <p>The current mouse position is ({x}, {y})</p>

      {
        props.render({
          x,
          y,
        })
      }
    </div>
  );
}

function Cat(props) {
  const { mouse, ...rest } = props;
  console.log('rest :>> ', rest);
  return (
    <img
      src="/logo192.png"
      style={{
        position: 'absolute',
        left: mouse.x,
        top: mouse.y,
        width: 200,
        height: 200,
      }}
    />
  );
}

function withMouse(Component) {
  return class extends React.Component {
    render() {
      return (
        <Mouse render={mouse => (
          <Component {...this.props} mouse={mouse} />
        )} />
      );
    }
  };
}

const WithCat = withMouse(Cat);

function MouseTracker() {
  return (
    <>
      <Typography.Title>Render Props</Typography.Title>
      <Typography.Text >术语 “render prop” 是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术</Typography.Text>
      <Divider />
      <h1>移动鼠标!</h1>
      {/* <Mouse render={mouse => <Cat mouse={mouse} />} /> */}
      <WithCat name="cat" age={5} />
    </>
  );
}

export default MouseTracker;
