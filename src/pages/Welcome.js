import React from 'react';
import {
  Button,
  InputNumber,
  Typography,
} from 'antd';

function Welcome() {
  function handleFatherClick() {
    console.log('father click');
  }

  function handleClick(e) {
    e.stopPropagation();
    e.preventDefault();
    console.log('click');
  }

  return (
    <>
      <Typography.Title className="name">Welcome Learn!!!</Typography.Title>

      <div onClick={handleFatherClick}>
        <Button onClick={handleClick}>冒泡测试</Button>
        <Button type="link" href="www.baidu.com" onClick={handleClick}>冒泡测试</Button>
        <InputNumber min={1} addonAfter="天" />
      </div>
    </>
  );
}

export default Welcome;
