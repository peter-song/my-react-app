/* eslint-disable react/prop-types */
import React, { Fragment, useState } from 'react';
import {
  Button, Divider, Typography,
} from 'antd';

/**
 * 获取随机颜色
 */
function getColor(){
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);

  return `rgba(${r},${g},${b},0.8)`;
}

/**
 * 获取随机位置
 */
function getPosition(position) {
  const { width, height } = position;

  return {
    left: `${Math.ceil(Math.random() * width)}px`,
    top: `${Math.ceil(Math.random() * height)}px`,
  };
}

function Circle({ position }) {
  const style = React.useMemo(() => ({
    background: getColor(),
    ...getPosition(position),
    width: 15,
    height: 15,
    position: 'relative',
    borderRadius: 50,
  }), [position]);

  return (
    <div style={style} />
  );
}

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [], // 数据源列表
      renderList: [], // 渲染列表
      position: { // 位置信息
        width: 0,
        height: 0,
      },
      eachRenderNum: 500, // 每次渲染数量
    };
    this.box = React.createRef(null);
  }

  componentDidMount() {
    const { eachRenderNum } = this.state;
    const { offsetHeight, offsetWidth } = this.box.current;
    const originList = new Array(20000).fill(1);
    const times = Math.ceil(originList.length / eachRenderNum);
    const index = 1;

    this.setState({
      dataList: originList,
      position: {
        height: offsetHeight,
        width: offsetWidth,
      },
    }, () => {
      this.toRenderList(index, times);
    });
  }

  toRenderList = (index, times) => {
    if (index > times) {
      return;
    }

    const { renderList } = this.state;
    renderList.push(this.renderNewList(index));
    this.setState({ renderList });

    requestIdleCallback(() => {
      index += 1;
      this.toRenderList(index, times);
    });
  };

  renderNewList = index => {
    const {
      dataList,
      position,
      eachRenderNum,
    } = this.state;
    const list = dataList.slice((index - 1) * eachRenderNum, index * eachRenderNum);

    return (
      <Fragment key={index}>
        { list.map((item, index) => <Circle key={index} position={position} />) }
      </Fragment>
    );
  };

  render() {
    const { renderList } = this.state;

    return (
      <div ref={this.box} style={{
        height: 600,
        border: '1px solid',
        overflowY: 'auto',
      }}>
        { renderList }
      </div>
    );
  }
}

function TimeSlicing() {
  const [show, setShow] = useState(false);
  const [btnShow, setBtnShow] = useState(true);

  function handleClick() {
    setBtnShow(false);
    setTimeout(() => {
      setShow(true);
    }, []);
  }

  return (
    <div>
      <Typography.Title>大数据处理 —— 时间分片</Typography.Title>

      <Divider />

      <div>
        {btnShow && <Button onClick={handleClick}>Show</Button>}
        {show && <Index />}
      </div>
    </div>
  );
}

export default TimeSlicing;
