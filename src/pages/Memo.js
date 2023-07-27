/* eslint-disable react/prop-types */
import React from 'react';
import {
  Button, Divider, Space, Typography,
} from 'antd';

function TextMemo(props) {
  console.log('子组件渲染', props);
  return <div>hello, world. {props.num} : {props.number}</div>;
}

const controlIsRender = (prev, next) => {
  console.log('prev :>> ', prev);
  console.log('next :>> ', next);
  const isRender = prev.number === next.number || (prev.number !== next.number && next.number > 5);
  console.log('isRender :>> ', isRender);
  return isRender;
};

const NewTextMemo = React.memo(TextMemo, controlIsRender);

class Index extends React.Component {
  state = {
    num: 1,
    number: 1,
  };

  render() {
    const { num, number } = this.state;

    return (
      <>
        <Typography.Title>Memo</Typography.Title>
        <Typography.Text>一种容器化的控制渲染方案，可以对比 props 变化，来决定是否渲染组件</Typography.Text>

        <Divider />

        <nav>
          memo特点
          <ul>
            <li>第二个参数返回 true，组件不渲染，返回 false 组件重新渲染。(和 shouldComponentUpdate 相反)</li>
            <li>当第二个参数不存在时，会用浅比较原则处理 props，相当于比较 props 版本的pureComponent。</li>
            <li>同样适合类组件和函数组件</li>
          </ul>
        </nav>

        <Divider />

        <Typography.Title level={3}>Memo 示例</Typography.Title>

        <Space direction="vertical">
          <Space>
          改变num：当前值{num}
            <Button onClick={() => this.setState({ num: num + 1 })} >num++</Button>
            <Button onClick={() => this.setState({ num: num - 1 })} >num--</Button>
          </Space>
          <Space>
          改变number：当前值{number}
            <Button onClick={() => this.setState({ number: number + 1 })} > number ++</Button>
            <Button onClick={() => this.setState({ number: number - 1 })} > number -- </Button>
          </Space>
          <NewTextMemo num={num} number={number} />
        </Space>
      </>
    );
  }
}

export default Index;

