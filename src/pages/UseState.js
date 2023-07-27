/* eslint-disable no-empty-function */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import {
  Button,
  Divider,
  Space,
  Typography,
} from 'antd';

const DemoState = props => {
  React.useEffect(() => {
    console.log('第一个effect');
  }, [props.a]);

  React.useLayoutEffect(() => {
    console.log('第二个effect');
  }, []);

  React.useEffect(() => {
    console.log('第三个effect');
    return () => { };
  }, []);

  React.useInsertionEffect(() => {
    console.log('第四个effect');
  }, []);

  const [number, setNumber] = useState(0);

  const handleClick = () => {
    setNumber(num => num + 1); // num = 1
    setNumber(num => num + 2); // num = 3
    setNumber(num => num + 3); // num = 6

    console.log('number :>> ', number);
  };

  return (
    <div>
      <Button onClick={() => handleClick()}>点击 {number} </Button>
    </div>
  );
};

function Index() {
  const [number, setNumber] = React.useState(0);
  const handleClick = () => setInterval(() => {
    // 此时 number 一直都是 0
    setNumber(number + 1);
  }, 500);

  return <Button onClick={handleClick}> 点击 {number}</Button>;
}

function Index2({ a, b }) {
  const [state, dispatchState] = useState({ name: 'alien' });
  const add = (a, b) => a + b;

  const [count, setCount] = useState(() => add(a, b));

  const handleClick = () => { // 点击按钮，视图没有更新。
    state.name = 'Alien';
    dispatchState({ ...state }); // 直接改变 `state`，在内存中指向的地址相同。
  };

  return (
    <Space>
      <span>name: {state.name}</span>
      <Button onClick={handleClick}>changeName++</Button>
      <span>count: {count}</span>
      <Button onClick={() => setCount(prevCount => prevCount + 1)}>+</Button>
    </Space>
  );
}

class Index3 extends React.Component {
  state = { number: 0 };

  handleClick = () => {
    setTimeout(() => {
      this.setState({ number: this.state.number + 1 }, () => {
        console.log('callback1', this.state.number);
      });
      console.log(this.state.number);
      this.setState({ number: this.state.number + 1 }, () => {
        console.log('callback2', this.state.number);
      });
      console.log(this.state.number);
    }, 0);
    this.setState({ number: this.state.number + 1 }, () => {
      console.log('callback3', this.state.number);
    });
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleClick}>
          number++ {this.state.number}
        </Button>
      </div>
    );
  }
}

function Index4() {
  const [number, setNumber] = React.useState(0);

  /* 监听 number 变化 */
  React.useEffect(() => {
    console.log(`监听number变化，此时的number是:  ${number}`);
  }, [number]);

  const handleClick = () => {
    // 滞后更新 ，批量更新规则被打破
    setTimeout(() => {
      console.log('3333');
      setNumber(3);
    });

    console.log('1111');

    /* 批量更新 */
    setNumber(1);

    // eslint-disable-next-line lines-around-comment
    /** 高优先级更新 **/
    ReactDOM.flushSync(() => {
      console.log('2222');
      setNumber(2);
    });
  };

  return (
    <div>
      <Button onClick={handleClick}>number++ {number}</Button>
    </div>
  );
}

const Demo = () => {
  React.useInsertionEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .css-in-js {
        color: red;
        font-size: 20px;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div>
      <div className="css-in-js">hello, useInsertionEffect</div>

      <Typography.Title>状态数据</Typography.Title>
      <DemoState />
      <Divider />
      <Index />
      <Divider />
      <Index2 a={3} b={4} />
      <Divider />
      <Index3 name="xiaoxin" age = {27}/>
      <Divider />
      <Index4 />
    </div>
  );
};

export default Demo;
