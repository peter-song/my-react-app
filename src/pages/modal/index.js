/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Space } from 'antd';

import Dialog from './dialog';

const styles = {
  model_top_close: {
    position: 'absolute',
    top: 0,
    right: 8,
    fontSize: 30,
  },
};

class Modal extends React.Component {
  renderTop = () => {
    const { title, onClose } = this.props;
    return (
      <div className="model_top" >
        <p>{title}</p>
        <span style={styles.model_top_close} onClick={() => onClose && onClose()} >x</span>
      </div>
    );
  };

  renderContent = () => {
    const { content, children } = this.props;

    return React.isValidElement(content)
      ? content
      : children
        ? children
        : null;
  };

  renderFooter = () => {
    const {
      cancelText,
      okText,
      footer,
      onOk,
      onCancel,
    } = this.props;

    if (footer && React.isValidElement(footer)) return footer;

    return (
      <div className="model_bottom" >
        <Space className="model_btn_box" >
          <Button className="searchbtn" onClick={e => {
            onOk && onOk(e);
          }}>
            {okText || '确定'}
          </Button>
          <Button className="concellbtn" onClick={e => {
            onCancel && onCancel(e);
          }}>
            {cancelText || '取消'}
          </Button>
        </Space>
      </div>
    );
  };

  render() {
    const {
      visible,
      width = 500,
      closeCb,
      onClose,
    } = this.props;
    return (
      <Dialog
        closeCb={closeCb}
        onClose={onClose}
        visible={visible}
        width={width}
      >
        {this.renderTop()}
        {this.renderContent()}
        {this.renderFooter()}
      </Dialog>
    );
  }
}

export default Modal;
