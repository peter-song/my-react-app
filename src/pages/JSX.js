import React from 'react';
import { Button, Space } from 'antd';

const toLearn = [
  'react', 'vue', 'webpack', 'nodejs',
];

function TextComponent(){
  return (
    <div> hello , i am function component </div>
  );
}

class Index extends React.Component {
  status = false; /* 状态 */

  renderFoot = () => <div> i am foot</div>;

  /* 控制渲染 */
  controlRender = () => {
    const reactElement = (
      <Space direction="vertical" style={{ marginTop: 20 }} className="container" >
        { /* element 元素类型 */}
        <div>hello,world</div>
        { /* fragment 类型 */}
        <React.Fragment>
          <div>👽👽💀💀</div>
        </React.Fragment>
        { /* text 文本类型 */}
        my name is alien
        { /* 数组节点类型 */}
        {toLearn.map(item => <div key={item} >let us learn {item} </div>)}
        { /* 组件类型 */}
        <TextComponent />
        { /* 三元运算 */}
        {this.status ? <TextComponent /> : <div>三元运算</div>}
        { /* 函数执行 */}
        {this.renderFoot()}
        <Button onClick={() => console.log(this.render())} >打印render后的内容</Button>
      </Space>
    );

    console.log('reactElement :>> ', reactElement);

    const { children } = reactElement.props;

    /* 第1步 ： 扁平化 children  */
    const flatChildren = React.Children.toArray(children);
    console.log('flatChildren :>> ', flatChildren);

    /* 第2步 ： 除去文本节点 */
    const newChildren = [];
    React.Children.forEach(flatChildren, item => {
      if (React.isValidElement(item)) newChildren.push(item);
    });
    console.log('newChildren :>> ', newChildren);

    /* 第3步，插入新的节点 */
    const lastChildren = React.createElement('div', { className: 'last' }, 'say goodbye');
    newChildren.push(lastChildren);
    console.log('newChildren :>> ', newChildren);

    newChildren.push(<div className="last" >say goodbye2</div>);

    /* 第4步：修改容器节点 */
    const newReactElement = React.cloneElement(reactElement, {}, ...newChildren);
    return newReactElement;
  };

  render() {
    return this.controlRender();

    /* 以下都是常用的jsx元素节 */
    // return (
    //   <div style={{ marginTop: '100px' }} >
    //     { /* element 元素类型 */}
    //     <div>hello,world</div>
    //     { /* fragment 类型 */}
    //     <React.Fragment>
    //       <div> 👽👽 </div>
    //     </React.Fragment>
    //     { /* text 文本类型 */}
    //     my name is alien
    //     { /* 数组节点类型 */}
    //     {toLearn.map(item => <div key={item} >let us learn {item} </div>)}
    //     { /* 组件类型 */}
    //     <TextComponent />
    //     { /* 三元运算 */}
    //     {this.status ? <TextComponent /> : <div>三元运算</div>}
    //     { /* 函数执行 */}
    //     {this.renderFoot()}
    //     <button onClick={() => console.log(this.render())} >打印render后的内容</button>
    //   </div>
    // );
  }
}

export default Index;
