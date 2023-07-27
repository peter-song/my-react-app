/* eslint-disable react/prop-types */
import React, { useMemo, useState } from 'react';
import {
  Button, Divider, Space, Typography,
} from 'antd';

function App() {
  const [person, setPerson] = useState({
    name: 'xiaoxin',
    gender: 'male',
  });

  function formatGender(gender) {
    console.log('render formatGender');
    return gender === 'male' ? { text: '男' } : { text: '女' };
  }

  function changeName() {
    setPerson({
      ...person,
      name: 'xiaowanzi',
    });
  }

  function changeGender() {
    setPerson({
      ...person,
      gender: 'female',
    });
  }

  const gender = useMemo(() => formatGender(person.gender), [person.gender]);

  return (
    <>
      <Typography.Title>缓存数据</Typography.Title>
      <Typography.Text>通过校验 Props 中数据的内存地址是否改变来决定组件是否重新渲染组件的一种技术。</Typography.Text>
      <Divider />
      <p>姓名：{person.name} -- 性别：{gender.text}</p>
      <Space>
        <Button onClick={changeName}>改变名字</Button>
        <Button onClick={changeGender}>改变性别</Button>
      </Space>
    </>
  );
}

export default App;
