/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, {
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import {
  Button,
  Divider,
  Input,
  Space,
  Typography,
} from 'antd';

const FancyInput = React.forwardRef((props, ref) => {
  const [fresh, setFresh] = useState(false);
  const attRef = useRef(1);
  console.log('attRef :>> ', attRef, fresh);

  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    attRef,
    fresh,
    focus() {
      inputRef.current.focus();
    },
  }), [fresh]);

  const handleClick = useCallback(() => {
    attRef.current += 1;
  }, []);

  return (
    <div style={{ marginTop: 8 }}>
      <Typography.Title>Count: {attRef.current}</Typography.Title>

      <Button onClick={handleClick}>Add Count</Button>
      <Button onClick={() => setFresh(!fresh)} style={{ marginLeft: 8 }}>Fresh Count</Button>

      <Divider />

      <Space style={{ marginTop: 8 }}>
        <Input
          type="text"
          ref={inputRef}
          style={{ width: 200 }}
        />

        <Button onClick={props.clickRef}>
          focus the text input
        </Button>
      </Space>
    </div>
  );
});

function App() {
  const inputRef = useRef();
  console.log('inputRef :>> ', inputRef);

  function clickFancyRef() {
    inputRef.current.focus();
  }

  function handleClick() {
    console.log('inputRef.current :>> ', inputRef.current);
  }

  return (
    <div>
      <FancyInput ref={inputRef} clickRef={clickFancyRef} />
      <Button onClick={handleClick} style={{ marginTop: 8 }}>
        父组件访问子组件的实例属性
      </Button>
    </div>
  );
}

export default App;
