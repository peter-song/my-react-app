import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import ReactDOM from 'react-dom';

const controlShow = (
  f1, f2, value, timer,
) => {
  f1(value);

  return setTimeout(() => {
    f2(value);
  }, timer);
};

function Dialog(props) {
  const {
    width,
    visible,
    closeCb,
    onClose,
  } = props;

  const [modalShow, setModalShow] = useState(visible);
  const [modalShowAsync, setModalShowAsync] = useState(visible);

  useEffect(() => {
    let timer = null;
    if (visible) {
      timer = controlShow(
        setModalShow, setModalShowAsync, visible, 30,
      );
    } else {
      timer = controlShow(
        setModalShow, setModalShowAsync, visible, 3000,
      );
    }

    return function () {
      timer && clearTimeout(timer);
    };
  }, [visible]);

  useEffect(() => {
    !modalShow && typeof closeCb === 'function' && closeCb();
  }, [modalShow]);

  const renderChildren = useMemo(() => ReactDOM.createPortal((
    <div style={{ display: modalShow ? 'block' : 'none' }} >
      <div className="model_container" style={{
        opacity: modalShowAsync ? 1 : 0,
        position: 'fixed',
        top: '60%',
        left: '50%',
        border: '1px dashed',
        padding: 30,
        transform: 'translate(-50%, -50%)',
      }}>
        <div className="model_wrap" >
          <div style={{ width: `${width}px` }} > {props.children} </div>
        </div>
      </div>
      <div className="model_container mast" onClick={() => onClose && onClose()} style={{ opacity: modalShowAsync ? 0.6 : 0 }} />
    </div>
  ), document.body), [modalShow, modalShowAsync]);

  return renderChildren;
}

export default Dialog;
