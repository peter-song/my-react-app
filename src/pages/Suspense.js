/* eslint-disable new-cap */
/* eslint-disable react/prop-types */
import React, { Suspense } from 'react';
import { Divider, Typography } from 'antd';

/**
 * 测试组件
 */
function Test({ data, age }) {
  const { name, say } = data;
  console.log('组件渲染');

  return (
    <div>
      <div>hello , my name is {name}</div>
      <div>age : {age} </div>
      <div>i want to say: {say}</div>
    </div>
  );
}

/**
 * 模拟数据
 */
const getData = () => new Promise(resolve => {
  setTimeout(() => {
    resolve({
      name: 'alien',
      say: 'let us learn React!',
    });
  }, 2000);
});

/**
 * Component  需要异步数据的component
 * api  请求数据接口
 */
function AsyncComponent(Component, api) {
  const AsyncComponentPromise = () => Promise.resolve(api().then(res => {
    console.log('data :>> ', res);
    return { default: props => <Component data={res} {...props} /> };
  }));
  return React.lazy(AsyncComponentPromise);
}

const LazyTest = AsyncComponent(Test, getData);

function Index() {
  console.log('Index :>> ', 'render');
  return (
    <div>
      <Typography.Title>Suspense</Typography.Title>
      <Typography.Text>一种同步代码来实现异步操作的方案</Typography.Text>

      <Divider />

      <Suspense fallback={<div>...loading</div>}>
        <LazyTest age={18} />
      </Suspense>
    </div>
  );
}

export default Index;
