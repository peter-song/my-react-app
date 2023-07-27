/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  Button,
  Select,
  Space,
  Typography,
} from 'antd';

const friends = [
  {
    id: 1,
    name: 'xiaoxin',
    isOnline: true,
  },
  {
    id: 2,
    name: 'xiaoqiang',
    isOnline: false,
  },
  {
    id: 3,
    name: 'xiaowanzi',
    isOnline: true,
  },
];

const ChatAPI = {
  subscribeToFriendStatus(id, cb) {
    console.log('subscribeToFriendStatus');
    const friend = friends.find(item => item.id === id);
    cb(friend);
  },

  unsubscribeFromFriendStatus(id, cb) {
    console.log('unsubscribeFromFriendStatus');
    const friend = friends.find(item => item.id === id);
    cb(friend);
  },
};

function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}

function useFriendStatus(friendId) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(friendId, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendId, handleStatusChange);
    };
  });

  return isOnline;
}

function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(friend) {
      setIsOnline(friend.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  let online = null;
  if (isOnline === null) {
    online = 'Loading...';
  }

  online = isOnline ? 'Online' : 'Offline';

  return (
    <Space>
      {online}
      <Button onClick={() => setCount(count + 1)}>
        click me
      </Button>
    </Space>
  );
}

function ChatRecipientPicker() {
  const [recipientID, setRecipientID] = useState(1);
  const isRecipientOnline = useFriendStatus(recipientID);

  return (
    <Space>
      <span>{String(isRecipientOnline)}</span>
      <Select
        value={recipientID}
        onChange={value => setRecipientID(value)}
      >
        {
          friends.map(friend => <option key={friend.id} value={friend.id}>
            {friend.name}
          </option>)
        }
      </Select>
    </Space>
  );
}

function App() {
  const friend = { id: 1 };
  return (
    <div>
      <Typography.Title>Hooks</Typography.Title>
      <Typography.Text>出现本质原因</Typography.Text>
      <nav>
        <ol>
          <li>让函数组件也能做类组件的事，有自己的状态，可以处理一些副作用，能获取ref，也能做数据缓存</li>
          <li>解决逻辑复用难的问题</li>
          <li>放弃面向对象编程，拥抱函数式编程</li>
        </ol>
      </nav>

      <Typography.Text>三种处理策略</Typography.Text>
      <nav>
        <ol>
          <li>ContextOnlyDispatcher 函数组件外调用时报错</li>
          <li>HooksDispatcherOnMount 函数组件初始化</li>
          <li>HooksDispatcherOnUpdate 函数组件更新</li>
        </ol>
      </nav>

      <FriendStatusWithCounter friend={friend} />
      <ul>
        {
          friends.map(friend => (
            <FriendListItem key={friend.id} friend={friend} />
          ))
        }
      </ul>

      <ChatRecipientPicker />
    </div>
  );
}

export default App;
