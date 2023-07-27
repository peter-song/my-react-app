/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Button,
  Divider,
  Typography,
} from 'antd';

const Child = React.memo(({ fun }) => {
  console.log('test render');

  return (
    <Typography.Link onClick={fun}>Test</Typography.Link>
  );
});

// const Child = ({ fun }) => {
//   console.log('test render');

//   return (
//     <Typography.Link onClick={fun}>Test</Typography.Link>
//   );
// };

function Parent() {
  const [name, setName] = useState('xiaoxin');
  const [count, setCount] = useState(1);

  const textRef = useRef(name);

  useEffect(() => {
    console.log('update name');
    textRef.current = name;
  }, [name]);

  const modifyName = () => {
    setName(`xiaoxin${Math.floor(Math.random() * 10)}`);
  };

  // const toChildFun = () => {
  //   console.log('传入子组件的函数');
  //   console.log('textRef.current :>> ', textRef.current);
  // };

  const toChildFun = useCallback(() => {
    console.log('传入子组件的函数');
    console.log('textRef.current :>> ', textRef.current);
    console.log('name :>> ', name);
  }, [name]);

  return (
    <div>
      <Typography.Title>缓存函数</Typography.Title>
      <Typography.Text>useCallBack 的本质工作不是在依赖不变的情况下阻止函数创建，而是在依赖不变的情况下不返回新的函数地址而返回旧的函数地址。不论是否使用 useCallBack 都无法阻止组件 render 时函数的重新创建！！!</Typography.Text>
      <Typography.Title level={4}>useCallback 在什么情况下使用？</Typography.Title>
      <Typography.Text>
        在往子组件传入了一个函数并且子组件被 React.memo 缓存了的时候使用
      </Typography.Text>

      <Divider />

      <Child fun={toChildFun} />

      <p>
        现在的名字：{name} -- <Button onClick={modifyName}>点击修改名字</Button>
      </p>

      <p>
        Count: {count} -- <Button onClick={() => setCount(count + 1)}>Add</Button>
      </p>

      <nav>
        总结
        <ol>
          <li>useCallBack 不要每个函数都包一下，否则就会变成反向优化，useCallBack本身就是需要一定性能的</li>
          <li>useCallBack 并不能阻止函数重新创建,它只能通过依赖决定返回新的函数还是旧的函数,从而在依赖不变的情况下保证函数地址不变</li>
          <li>useCallBack 需要配合 React.memo 使用</li>
        </ol>
      </nav>
    </div>
  );
}

export default Parent;
