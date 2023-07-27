/* eslint-disable react/prop-types */
/* eslint-disable new-cap */
import React, { useEffect } from 'react';
import {
  Button, Divider, Space, Typography,
} from 'antd';

import Permission from './components/Permission';

function PropsProxy(props) {
  const {
    height,
    weight,
    ...rest
  } = props;
  console.log('rest :>> ', rest);

  return (
    <div>props proxy, height: {height}, weight: {weight}</div>
  );
}

function HOCPropsProxy(WarpComponent) {
  return class Advance extends React.Component {
    state = {
      height: '170',
      weight: 70,
    };

    render() {
      return (
        <WarpComponent {...this.props} {...this.state} />
      );
    }
  };
}

const ProxyTest = HOCPropsProxy(PropsProxy);

class ReverseExtends extends React.Component {
  state = {
    height: 170,
    weight: 70,
  };

  render() {
    return <div {...this.state}>reverse extends</div>;
  }
}

function HOCReverseExtends(Component) {
  return class WarpComponent extends Component {
    constructor(props) {
      super(props);
      console.log('props :>> ', props);
    }

    render() {
      return (
        // <div>name: {name}, age: {age}</div>
        this.props.name === 'xiaoqiang' ? super.render() : <>no msg</>
      );
    }
  };
}

const ReverseExtendsTest = HOCReverseExtends(ReverseExtends);

class RenderHijack extends React.Component {
  render() {
    return (
      <div>render hijack</div>
    );
  }
}

function HOCRenderHijack(Component) {
  return class Index extends Component {
    render() {
      if (this.props.visible) {
        return super.render();
      }
      return <div>暂无数据</div>;
    }
  };
}

const RenderHijackTest = HOCRenderHijack(RenderHijack);

class RenderTree extends React.Component {
  render() {
    return (
      <ul>
        <li>react</li>
        <li>vue</li>
        <li>angular</li>
      </ul>
    );
  }
}

function HOCRenderTree(Component) {
  return class Advance extends Component {
    render() {
      const element = super.render();
      console.log('element :>> ', element);
      const otherProps = { name: 'alien' };

      const appendElement = React.createElement('li', {}, `hello world, my name is ${otherProps.name}`);
      const newChild = React.Children.map(element.props.children, (child, index) => {
        if (index === 2) {
          return appendElement;
        }
        return child;
      });

      return React.cloneElement(element, element.props, newChild);
    }
  };
}

const RenderTreeTest = HOCRenderTree(RenderTree);

function ClickComponent() {
  return (
    <div>
      <p>hello, world</p>
      <Button>组件内部点击</Button>
    </div>
  );
}

function HOCClick(Component) {
  return function Wrap(props) {
    const dom = React.useRef(null);
    useEffect(() => {
      const handleClick = () => console.log('发生点击事件');
      dom.current.addEventListener('click', handleClick);
    }, []);

    return (
      <div ref={dom}>
        <Component {...props} />
      </div>
    );
  };
}

const ClickTest = HOCClick(ClickComponent);

function Index() {
  return (
    <>
      <Typography.Title>HOC</Typography.Title>
      <Typography.Text>将函数作为参数并且返回值也是函数的函数</Typography.Text>

      <Divider />

      <div>
        <nav>
          HOC 能解决什么问题
          <ul>
            <li>代码复用</li>
            <li>逻辑复用</li>
          </ul>
        </nav>
      </div>

      <Divider />

      <Typography.Title level={2}>两种不同的高阶组件</Typography.Title>

      <Typography.Title level={3}>属性代理</Typography.Title>
      <ProxyTest name="xiaoxin" age={27} />

      <Typography.Title level={3}>反向继承</Typography.Title>
      <ReverseExtendsTest name="xiaoqiang" age={30} />

      <Typography.Title level={3}>控制渲染</Typography.Title>

      <Typography.Title level={4}>渲染劫持</Typography.Title>
      <RenderHijackTest visible={false} />

      <Typography.Title level={4}>修改渲染树</Typography.Title>
      <RenderTreeTest />

      <Typography.Title level={2}>组件赋能</Typography.Title>

      <Typography.Title level={3}>事件监控</Typography.Title>
      <Space direction="vertical">
        <ClickTest />
        <Button>组件外部监控</Button>
      </Space>

      <Typography.Title level={3}>权限控制</Typography.Title>
      <Permission />
    </>
  );
}

export default Index;
