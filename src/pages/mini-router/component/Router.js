/* eslint-disable react/prop-types */
import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { createBrowserHistory as createHistory } from 'history';

export const RouterContext = React.createContext();

export let rootHistory = null;

function Router(props) {
  const history = useMemo(() => {
    rootHistory = createHistory();
    return rootHistory;
  }, []);
  const [location, setLocation] = useState(history.location);

  useEffect(() => {
    const unListen = history.listen(location => setLocation(location));

    return () => {
      unListen && unListen();
    };
  }, [history]);

  const contextValue = {
    location,
    history,
    match: {
      path: '/mini/',
      url: '/mini/',
      params: {},
      isExact: location.pathname === '/mini/',
    },
  };

  return (
    <RouterContext.Provider value={contextValue}>
      {props.children}
    </RouterContext.Provider>
  );
}

export default Router;
