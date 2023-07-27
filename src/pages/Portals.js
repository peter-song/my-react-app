/* eslint-disable react/prop-types */
import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom';

import {
  Button,
  Divider,
  Input,
  Space,
  Typography,
} from 'antd';

import Modal2 from './modal';

const modalRoot = document.getElementById('modal');

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

function ModelTest() {
  const [visible, setVisible] = useState(false);
  const [nameShow, setNameShow] = useState(false);

  const handleClick = () => {
    console.log('点击');
    setVisible(!visible);
    setNameShow(true);
  };

  const handleShow = () => {
    setVisible(!visible);
    setNameShow(false);
  };

  /* 防止 Model 的 PureComponent 失去作用 */
  const [handleClose, handleOk, handleCancel] = useMemo(() => {
    const Ok = () => console.log('点击确定按钮');
    const Close = () => setVisible(false);
    const Cancel = () => console.log('点击取消按钮');

    return [Close, Ok, Cancel];
  }, []);

  return (
    <div>
      <Modal2
        onCancel={handleCancel}
        onClose={handleClose}
        onOk={handleOk}
        title="《React进阶实践指南》"
        visible={visible}
        width={700}
      >
        <div style={{ marginBottom: 10 }}>
          小册阅读感受： <Input placeholder="写下你的感受" style={{ width: 200 }} />
          {nameShow && <p>作者： 我不是外星人</p>}
        </div>
      </Modal2>

      <Space>
        <Button onClick={handleShow}>model show</Button>
        <Button onClick={handleClick}>model show ( 显示作者 )</Button>
      </Space>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      clicks: 0,
    };
  }

  handleShow = () => {
    this.setState({ showModal: true });
  };

  handleHide = () => {
    this.setState({ showModal: false });
  };

  handleClick = () => {
    this.setState(state => ({ clicks: state.clicks + 1 }));
  };

  render() {
    const { clicks, showModal } = this.state;

    const style = {
      position: 'fixed',
      padding: 30,
      left: '50%',
      top: '40%',
      transform: 'translate(-50%, -50%)',
      border: '1px dashed',
    };

    return (
      <div>
        <Typography.Title>Portal</Typography.Title>
        <Typography.Text>提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案！</Typography.Text>

        <Divider />

        <Space onClick={this.handleClick}>
          This div has overflow: hidden. { clicks }
          <Button onClick={this.handleShow}>Show Modal</Button>
          {
            showModal && (
              <Modal>
                <div style={style}>
                  <div>
                    With a portal, we can render content into a different
                    part of the DOM, as if it were any other React child.
                  </div>
                  This is being rendered inside the #modal-container div!
                  <Button onClick={this.handleHide}>Hide modal</Button>
                </div>
              </Modal>
            )
          }
        </Space>

        <Divider />

        <ModelTest />
      </div>
    );
  }
}

export default App;
