/* eslint-disable react/prop-types */
import React from 'react';
import {
  Button, Divider, Space,
} from 'antd';

import Form from './components/Form';

function Children(props) {
  return (
    <div>
      <div>hello, my name is {props.name} </div>
      <div> {props.msg} </div>
      {props.children}
    </div>
  );
}

class ChildComponent extends React.PureComponent {
  state = { count: 1 };

  render() {
    const { count } = this.state;
    console.log('render :>> ', 'render', this.props.msg);
    return (
      // eslint-disable-next-line react/no-unescaped-entities
      <div>In this chapter, let's learn about react props ! <Button onClick={() => this.setState({ count: count + 1 })}>{count}</Button></div>
    );
  }
}

function Container(props) {
  const containerProps = {
    name: 'alien',
    msg: 'let us learn react',
  };

  return props.children.map(item => {
    if (React.isValidElement(item)) { // 判断是 react elment  混入 props
      return React.cloneElement(item, { ...containerProps }, item.props.children);
    } else if (typeof item === 'function') {
      return item(containerProps);
    } return null;
  });
}

class PropsComponent extends React.Component {
  componentDidMount() {
    console.log('this :>> ', this);
  }

  render() {
    const {
      children,
      msg,
      renderName,
      say,
      Component,
    } = this.props;
    const [renderFunction, renderComponent] = children;

    return (
      <Space direction="vertical">
        {renderFunction()}
        {msg}
        {renderName()}
        {renderComponent}
        <Component />
        <Container>
          <Children>xiaoxin</Children>
          {props => <Children {...props} name="haha" msg="let us learn vue" />}
        </Container>
        <Button onClick={say}>change content</Button>
      </Space>
    );
  }
}

class Index extends React.Component {
  state = { msg: 'hello, react' };

  node = null;

  say = () => {
    this.setState({ msg: 'let us learn react!' });
  };

  render() {
    return (
      <div>
        <PropsComponent
          msg={this.state.msg}
          say={this.say}
          Component={ChildComponent}
          renderName={() => <div>my name is alien</div>}
        >
          {() => <div>hello, world</div>}
          <ChildComponent msg={this.state.msg} />
        </PropsComponent>

        <Divider />

        <Form />
      </div>
    );
  }
}

export default Index;
