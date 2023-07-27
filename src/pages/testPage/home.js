/* eslint-disable react/prop-types */
import React from 'react';
import { withRouter } from '../mini-router';
class HomeOne extends React.Component {
  routeGo = () => {
    const { history } = this.props;
    history.push('/detail');
  };

  render() {
    return (
      <div>
        <p>测试HOC——withRouter</p>
        <button onClick={this.routeGo} >跳转到详情页</button>
      </div>
    );
  }
}

const HOCHomeOne = withRouter(HomeOne);

export default function Home() {
  return (
    <div>
      hello,world。
      let us learn React!
      <HOCHomeOne />
    </div>
  );
}
