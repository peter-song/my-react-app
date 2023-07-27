import React, { useReducer } from 'react';
import { Button, Space } from 'antd';

const initialCount = 1;

function init(initialCount) {
  console.log('initialCount :>> ', initialCount);
  return { count: initialCount };
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialCount, init);

  return (
    <Space>
      Counter: {state.count}
      <Button onClick={() => dispatch({ type: 'increment' })}>+</Button>
      <Button onClick={() => dispatch({ type: 'decrement' })}>-</Button>
      <Button
        onClick={() => dispatch({
          type: 'reset',
          payload: initialCount,
        })}
      >
        Reset
      </Button>
    </Space>
  );
}

export default Counter;
