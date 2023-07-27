/* eslint-disable new-cap */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, {
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  Button,
  Input,
  Space,
  Typography,
} from 'antd';

import Util from './utils/utils';

class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  focusTextInput = () => {
    console.log('CustomTextInput :>> ', 'focusTextInput');
    this.textInput.current.focus();
  };

  sayHello = () => {
    console.log('CustomTextInput :>> ', 'hello');
  };

  render() {
    const { children } = this.props;
    return (
      <Space style={{ marginTop: 8 }}>
        <Input
          type="text"
          ref={this.textInput}
        />
        <Button
          onClick={this.focusTextInput}
        >
          {children}
        </Button>
      </Space>
    );
  }
}

function MyFunctionComponent() {
  let textInput = null;

  function focusTextInput() {
    textInput.focus();
  }

  return (
    <Space style={{ marginTop: 8 }}>
      <Input
        type="text"
        ref={input => {
          textInput = input;
        }}
      />
      <Button onClick={focusTextInput}>
        Focus the text input
      </Button>
    </Space>
  );
}

function MyHooksComponent() {
  const textInput = React.useRef(null);

  function focusTextInput() {
    textInput.current.focus();
  }

  return (
    <Space style={{ marginTop: 8 }}>
      <Input
        type="text"
        ref={textInput}
      />
      <Button
        onClick={focusTextInput}
      >
        Focus the text input
      </Button>
    </Space>
  );
}

class CustomCallBackTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = null;
  }

  focusTextInput = () => {
    this.textInput.focus();
  };

  sayHello = () => {
    console.log('CustomCallBackTextInput :>> ', 'hello');
  };

  render() {
    return (
      <Space style={{ marginTop: 8 }}>
        <Input
          type="text"
          ref={input => {
            this.textInput = input;
          }}
        />
        <Button
          onClick={this.focusTextInput}
        >
          Focus the text input
        </Button>
      </Space>
    );
  }
}

class ParentChildTextInput extends React.Component {
  render() {
    const { inputRef, clickRef } = this.props;
    return (
      <Space style={{ marginTop: 8 }}>
        <Input
          type="text"
          ref={inputRef}
        />
        <Button
          onClick={clickRef}
        >
          focus the text input
        </Button>
      </Space>
    );
  }
}

const FancyButtonRef = React.forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    hi(){
      return 'hi';
    },
  }), []);

  return (
    <Space style={{ marginTop: 8 }}>
      <Input
        type="text"
        ref={ref}
      />
      <Button
        onClick={props.clickRef}
      >
        focus the text input
      </Button>
    </Space>
  );
});

class FancyButton extends React.Component {
  render() {
    const {
      label, inputRef, clickRef,
    } = this.props;

    console.log('label :>> ', label);

    return (
      <Space style={{ marginTop: 8 }}>
        <Input
          defaultValue={label}
          type="text"
          ref={inputRef}
        />
        <Button
          style={{ marginLeft: 8 }}
          onClick={clickRef}
        >
          focus the text input
        </Button>
      </Space>
    );
  }
}

function HocLogProps(Component) {
  class LogProps extends React.Component {
    render() {
      const { forwardRef, ...rest } = this.props;
      return (
        <Component inputRef={forwardRef} {...rest} />
      );
    }
  }

  return React.forwardRef((props, ref) => {
    console.log('this.props :>> ', props);
    return <LogProps forwardRef={ref} {...props} />;
  });
}

const HocFancyButton = HocLogProps(FancyButton);

const Son = React.forwardRef(({ toFather }, ref) => {
  const [sonMsg, setSonMsg] = useState('');
  const [fatherMsg, setFatherMsg] = useState('');

  useImperativeHandle(ref, () => ({
    sonMsg,
    fatherSay(fatherMsg) {
      setFatherMsg(fatherMsg);
    },
  }), [sonMsg]);

  // const fatherSay = fatherMsg => {
  //   setFatherMsg(fatherMsg);
  // };

  return (
    <div>
      <Typography.Title>子组件</Typography.Title>
      <p>父组件对我说：{fatherMsg}</p>

      <Space>
        对父组件说：<Input onChange={e => setSonMsg(e.target.value)} />
        <Button onClick={() => toFather(sonMsg)}>To Father</Button>
      </Space>
    </div>
  );
});

function Father() {
  const [sonMsg, setSonMsg] = useState('');
  const [fatherMsg, setFatherMsg] = useState('');
  const sonInstance = useRef(null);

  const toSon = () => {
    sonInstance.current.fatherSay(fatherMsg);
  };

  return (
    <div>
      <Typography.Title>父组件</Typography.Title>
      <p>子组件对我说：{sonMsg}</p>
      <Space>
        对子组件说：<Input onChange={e => setFatherMsg(e.target.value)} />
        <Button onClick={toSon}>To Father</Button>
        <Button onClick={() => setSonMsg(sonInstance.current.sonMsg)}>Get SonMsg</Button>
      </Space>

      <Son ref={sonInstance} toFather={setSonMsg} />
    </div>
  );
}

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.textCustomInput = React.createRef();
    this.textParentChildInput = React.createRef();
    this.fancyRef = React.createRef();
    this.hocFancyRef = React.createRef();

    this.ref = Util.createRef();
  }

  componentDidMount() {
    this.textCustomInput.current.focusTextInput();
    this.textCustomInput.current.sayHello();

    const hi = this.fancyRef.current.hi();
    console.log('hi :>> ', hi);

    console.log('this.ref :>> ', this.ref);
  }

  handleDomRef = () => {
    console.log('this.myRef :>> ', this.myRef);
    this.myRef.current.style.color = 'red';
  };

  clickParentChildRef = () => {
    this.textParentChildInput.current.focus();
  };

  clickFancyRef = () => {
    this.fancyRef.current.focus();
  };

  clickHocFancyRef = () => {
    this.hocFancyRef.current.focus();
  };

  render() {
    return (
      <>
        <Typography.Title>Refs</Typography.Title>
        <Typography.Text>提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素。</Typography.Text>

        <div>
          <nav>
            <ul>
              <li>Ref对象创建</li>
              <li>React本身对Ref的处理</li>
            </ul>
          </nav>

          <React.StrictMode>
            <Button
              type="link"
              ref={this.myRef}
              onClick={this.handleDomRef}
            >
              点击改变字体颜色
            </Button>
          </React.StrictMode>
        </div>

        <div>
          <h1>为class组件添加ref</h1>
          <CustomTextInput ref={this.textCustomInput}>
            focus the text input
          </CustomTextInput>
        </div>

        <div>
          <h1>为函数式组件添加ref</h1>
          <MyFunctionComponent />
        </div>

        <div>
          <h1>hook方式添加ref</h1>
          <MyHooksComponent />
        </div>

        <div>
          <h1>为组件添加ref（回调方式）</h1>
          <CustomCallBackTextInput />
        </div>

        <div>
          <h1>父子组件传递ref</h1>
          <ParentChildTextInput
            inputRef={this.textParentChildInput}
            clickRef={this.clickParentChildRef}
          />
        </div>

        <div>
          <h1>转发refs</h1>
          <FancyButtonRef
            ref={this.fancyRef}
            clickRef={this.clickFancyRef}
          />
        </div>

        <div>
          <h1>HOC 转发refs</h1>
          <HocFancyButton
            label="xiaoxin"
            ref={this.hocFancyRef}
            clickRef={this.clickHocFancyRef}
          />
        </div>

        <Father />
      </>
    );
  }
}

export default MyComponent;
