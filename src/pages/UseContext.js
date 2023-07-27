/* eslint-disable react/prop-types */
import React, {
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  Button,
  Card,
  Divider,
  Input,
  Modal,
  Space,
  Table,
  message,
} from 'antd';

import Theme from './components/Theme';

const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

const ThemeContext = React.createContext(null);
console.log('ThemeContext :>> ', ThemeContext);

function ThemeButton(props) {
  const theme = useContext(ThemeContext);
  console.log('theme :>> ', theme);

  const style = {
    background: theme.background,
    color: theme.foreground,
  };

  return (
    <Button style={style} {...props}>
      I am styled by theme context!
    </Button>
  );
}

class ThemeButton2 extends React.Component {
  render() {
    const theme = this.context;

    const style = {
      background: theme.background,
      color: theme.foreground,
    };

    return (
      <Button style={style} {...this.props}>
        I am styled by theme context!
      </Button>
    );
  }
}
ThemeButton2.contextType = ThemeContext;

function ThemeButton3(props) {
  return (
    <ThemeContext.Consumer>
      {
        theme => {
          const style = {
            background: theme.background,
            color: theme.foreground,
          };
          return (
            <Button style={style} {...props}>
              I am styled by theme context!
            </Button>
          );
        }
      }
    </ThemeContext.Consumer>
  );
}

// eslint-disable-next-line react/display-name
const DelModal = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [reason, setReason] = useState('');

  useImperativeHandle(ref, () => ({
    show(id) {
      setVisible(true);
      fetchData(id);
    },
    reason,
  }), [reason]);

  function fetchData(id) {
    console.log('id :>> ', id);
  }

  return (
    <Modal
      title={props.title}
      open={visible}
      onCancel={() => setVisible(false)}
      onOk={props.handleOk}
    >
      Are you sure to delete this person?
      <div style={{ marginTop: 8 }}>
        Reason: <Input value={reason} onChange={e => setReason(e.target.value)} />
      </div>
    </Modal>
  );
});

function List({ list }) {
  const delRef = useRef();

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
    },
    {
      title: '操作',
      dataIndex: 'id',
      render: value => (
        <Space>
          <Button type="link" onClick={() => delRef.current.show(value)}>删除</Button>
          <Button type="link" onClick={() => message.success(delRef.current.reason)}>获取理由</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={list}
      />
      <DelModal ref={delRef} title="删除" />
    </>
  );
}

function App() {
  const [theme, setTheme] = useState(themes.light);

  function toggleTheme() {
    setTheme(theme === themes.dark ? themes.light : themes.dark);
  }

  const data = [
    {
      id: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      id: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];

  return (
    <ThemeContext.Provider value={theme}>
      <Card title="学生信息" extra={
        <Space>
          <ThemeButton onClick={toggleTheme} />
          <ThemeButton2 onClick={toggleTheme} />
          <ThemeButton3 onClick={toggleTheme} />
        </Space>
      }>
        <List list={data} />
      </Card>

      <Divider />

      <Theme />
    </ThemeContext.Provider>
  );
}

export default App;
