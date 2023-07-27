/* eslint-disable react/prop-types */
import React from 'react';
import {
  Button,
  Divider,
  Space,
  Typography,
} from 'antd';

import ScrollView from './components/ScrollView';

function FunctionLifeCycle(props) {
  const [num, setNum] = React.useState(0);

  /* 请求数据、事件监听、操纵dom、增加定时器、延时器 */
  React.useEffect(() => {
    console.log('组件挂载完成：componentDidMount');
    return function componentWillUnmount() { /* 解除事件监听器、清除 */
      console.log('组件销毁：componentWillUnmount');
    };
  }, []); /* 切记 dep = [] */

  React.useEffect(() => {
    console.log('props变化：componentWillReceiveProps');
  }, [props]);

  React.useEffect(() => { /*  */
    console.log('组件更新完成：componentDidUpdate');
  });

  return (
    <Space>
      <div>props: {props.number} </div>
      <div>states: {num} </div>
      <Button onClick={() => setNum(state => state + 1)}>
        改变state
      </Button>
    </Space>
  );
}

class LifeCycleDemo extends React.Component {
  constructor(props) {
    super(props);

    /**
     * 构造器，初始化阶段 render 阶段
     * 1、初始化 state ，比如可以用来截取路由中的参数，赋值给 state 。
     * 2、对类组件的事件做一些处理，比如绑定 this ， 节流，防抖等。
     * 3、对类组件进行一些必要生命周期的劫持，渲染劫持
     */

    console.log('1.constructor');

    this.state = {
      count: 0,
      isRender: true,
    };
  }

  /**
   * 初始化阶段和更新阶段的 render 阶段
   * 静态方法，从 props 中获得派生的 state，返回值合并将 state
   * 取代 componentWillMount 和 componentWillReceiveProps
   * 1、代替 componentWillMount 和 componentWillReceiveProps
   * 2、组件初始化或者更新时，将 props 映射到 state。
   * 3、返回值与 state 合并完，可以作为 shouldComponentUpdate 第二个参数 newState ，可以判断是否渲染组件。
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('2.getDerivedStateFromProps', prevState, this);

    return {
      name: 'xiaoxin',
      age: 27,
    };
  }

  // UNSAFE_componentWillMount() {
  //   console.log('3.UNSAFE_componentWillMount');
  // }

  /**
   * 初始化阶段commit阶段
   * 1、可以做一些关于 DOM 操作，比如基于 DOM 的事件监听器。
   * 2、对于初始化向服务器请求数据，渲染视图。
   */
  componentDidMount() {
    console.log('4.componentDidMount');
  }

  // UNSAFE_componentWillReceiveProps() {
  //   console.log('UNSAFE_componentWillReceiveProps');
  // }

  /**
   * 更新阶段render阶段
   * 1、用于性能优化，shouldComponentUpdate 返回值决定是否重新渲染的类组件。
   * 2、需要重点关注的是第二个参数newState，如果有getDerivedStateFromProps生命周期，它的返回值将合并到 newState ，供 shouldComponentUpdate 使用。
   */
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log('5.shouldComponentUpdate', nextState);
    return true;
  }

  /**
   * 获取组件更新之前的状态
   */
  // UNSAFE_componentWillUpdate(nextProps, nextState) {
  //   console.log('6.componentWillUpdate', nextState);
  // }

  /**
   * 更新阶段commit阶段
   * 获得更新前的快照，返回值作为componentDidUpdate的第三个参数
   * 1、配合componentDidUpdate一起使用，计算形成一个snapShot传递给componentDidUpdate。
   * 2、保存一次更新前的信息。
   */
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('7.getSnapshotBeforeUpdate', prevState, this.state);
    return { height: 170 };
  }

  /**
   * 更新阶段commit阶段
   * 1、直接获取 DOM 最新状态。
   * 2、这个函数里面如果想要使用 setState ，一定要加以限制，否则会引起无限循环。
   * 3、接受 getSnapshotBeforeUpdate 保存的快照信息。
   */
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('8.componentDidUpdate :>> ', prevState, snapshot);
  }

  /**
   * 销毁阶段commit阶段
   * 1、清除延时器，定时器。
   * 2、一些基于 DOM 的操作，比如事件监听器。
   */
  componentWillUnmount() {
    console.log('9.componentWillUnmount');
  }

  handleAdd = () => {
    let { count } = this.state;
    count += 1;

    this.setState({ count });
  };

  render() {
    console.log('3.render');
    console.log('this.state :>> ', this.state);

    const { isRender, count } = this.state;

    return (
      <div>
        <Typography.Title>LifeCycle</Typography.Title>

        <Space>
          <span>count: {count}</span>
          <button onClick={this.handleAdd}>Add</button>
        </Space>

        <nav style={{ marginTop: 20 }}>
          初始化阶段
          <ol>
            <li>constructor</li>
            <li>getDerivedStateFromProps/componentWillMount</li>
            <li>render</li>
            <li>componentDidMount</li>
          </ol>
          更新阶段
          <ol>
            <li>getDerivedStateFromProps/componentWillReceiveProps</li>
            <li>shouldComponentUpdate</li>
            <li>render</li>
            <li>getSnapshotBeforeUpdate</li>
            <li>componentDidUpdate</li>
          </ol>
          销毁阶段
          <ol>
            <li>componentWillUnmount</li>
          </ol>
        </nav>

        {
          isRender && (
            <>
              <Divider />
              <FunctionLifeCycle number={count} />
            </>
          )
        }

        <Divider />

        <Space>
          <Button onClick={() => this.setState(state => ({ count: state.count + 1 }))}>
            改变props
          </Button>
          <Button onClick={() => this.setState({ isRender: false })}>
            卸载组件
          </Button>
        </Space>

        <ScrollView />
      </div>
    );
  }
}

export default LifeCycleDemo;
