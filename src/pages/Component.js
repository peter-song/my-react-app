import React from 'react';
import {
  Button,
  Divider,
  Space,
  Typography,
} from 'antd';

class Index extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(...arg) {
    super(...arg); // 执行 react 底层 Component 函数
  }

  state = {}; // state

  static number1 = 1; // 内置静态属性

  handleClick = () => console.log(111); // 方法： 箭头函数方法直接绑定在this实例上

  componentDidMount() {
    console.log('Index.number1 :>> ', Index.number1);
    console.log('Index.number2 :>> ', Index.number2);
  }

  render() { /* 渲染函数 */
    return (
      <div style={{ cursor: 'pointer' }} onClick={this.handleClick} >Hello, React!</div>
    );
  }
}
Index.number2 = 2; /* 外置静态属性 */
Index.prototype.handleClick = () => console.log(222); /* 方法: 绑定在 Index 原型链的 方法*/

function Index2() {
  console.log('Index2.number :>> ', Index2.number); // 打印 1
  const [message, setMessage] = React.useState('Hello, World!'); /* hooks  */
  return (
    <div style={{ cursor: 'pointer' }} onClick={() => setMessage('Let us learn React!')} >
      {message}
    </div>
  );
}
Index2.number = 1; /* 绑定静态属性 */

class Person extends React.Component {
  constructor(props) {
    super(props);
    console.log('hello, i am person');
  }

  componentDidMount() {
    console.log(111);
  }

  eat() {
    console.log('eat');
  }

  sleep() {
    console.log('sleep');
  }

  ddd() {
    console.log('ddd');
  }

  render() {
    return (
      <div>大家好，我是一个 Person</div>
    );
  }
}

class Programmer extends Person {
  constructor(props) {
    super(props);
    console.log('hello, i am programmer too');
  }

  componentDidCatch() {
    console.log('this :>> ', this);
  }

  code() {
    console.log('code');
  }

  render() {
    return (
      <div>
        <Typography.Title level={3}>类组件继承</Typography.Title>
        {super.render()}
        我还是一个 Programmer
        <Space style={{ marginLeft: 8 }}>
          <Button onClick={this.eat}>eat</Button>
          <Button onClick={this.sleep}>sleep</Button>
          <Button onClick={this.ddd}>ddd</Button>
          <Button onClick={this.code}>code</Button>
        </Space>
      </div>
    );
  }
}

export default function Demo() {
  return (
    <>
      <Typography.Title>Component</Typography.Title>
      <div style={{ marginTop: 20 }}></div>
      <div>Class 组件</div>
      <Index />

      <div style={{ marginTop: 20 }}></div>
      <div>Function 组件</div>
      <Index2 />

      <Space direction="vertical">
        <Typography.Title level={3}>函数组件和类组件的区别？</Typography.Title>
        <Typography.Text>
          对于类组件来说，底层只需要实例化一次，实例中保存了组件的 state 等状态。对于每一次更新只需要调用 render 方法以及对应的生命周期就可以了。
        </Typography.Text>
        <Typography.Text>
          但是在函数组件中，每一次更新都是一次新的函数执行，一次函数组件的更新，里面的变量会重新声明。
        </Typography.Text>
      </Space>

      <Divider />

      <nav>
        React 一共有 5 种主流的通信方式：
        <ol>
          <li>props 和 callback 方式</li>
          <li>ref 方式</li>
          <li>React-redux 或 React-mobx 状态管理方式</li>
          <li>context 上下文方式</li>
          <li>event bus 事件总线</li>
        </ol>
      </nav>

      <nav>
        组件的强化方式
        <ol>
          <li>类组件继承</li>
          <li>函数组件自定义 Hooks</li>
          <li>HOC 高阶组件</li>
        </ol>
      </nav>

      <Divider />

      <Programmer />
    </>
  );
}
