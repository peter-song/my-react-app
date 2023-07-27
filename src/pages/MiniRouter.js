import React from 'react';
import {
  Route,
  Router,
  Switch,
  useHistory,
  useListen,
} from './mini-router';

/* 引用业务组件 */
import Detail from './testPage/detail'; /* 详情页 */
import Home from './testPage/home'; /* 首页 */
import List from './testPage/list'; /* 列表页 */

// import './index.scss';

const menusList = [
  {
    name: '首页',
    path: '/mini/home',
  },
  {
    name: '列表',
    path: '/mini/list',
  },
  {
    name: '详情',
    path: '/mini/detail',
  },
];

function Top() {
  useListen(location => {
    console.log('当前路由是：', location.pathname);
  });

  console.log(111);
  return <div>--------top------</div>;
}

/**/
function Nav() {
  const history = useHistory();

  const path = history.location.pathname;

  /* 路由跳转 */
  const routerGo = url => history.push(url);

  return (
    <div>
      {
        menusList.map((item => (
          <span
            key={item.path}
            className={`nav ${item.path === path ? 'active' : ''}`}
            onClick={() => routerGo(item.path)} >
            {item.name}
          </span>
        )))
      }
    </div>
  );
}

function Index() {
  console.log('根组件渲染');
  return (
    <Router>
      <Top />
      <Nav />

      <Switch>
        <Route component={Home} path="/mini/home"></Route>
        <Route component={Detail} path="/mini/detail" />
        <Route path="/mini/list" render={props => <List {...props} />} />
      </Switch>
      <div>--------bottom------</div>
    </Router>
  );
}

export default Index;
