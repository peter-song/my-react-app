// component
import Router, { RouterContext } from './component/Router';
import Route from './component/Route';
import Switch from './component/Switch';
// hooks
import useHistory from './hooks/useHistory';
import useListen from './hooks/useListen';
import useLocation from './hooks/useLocation';
// hoc
import withRouter from './hoc/withRouter';

export {
  Router,
  Switch,
  Route,
  useHistory,
  useListen,
  useLocation,
  withRouter,
  RouterContext,
};
