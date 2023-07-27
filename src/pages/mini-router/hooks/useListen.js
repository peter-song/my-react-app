/* eslint-disable no-empty-function */
import { useEffect } from 'react';
import { rootHistory } from '../component/Router';

function useLocation(cb) {
  useEffect(() => {
    if (!rootHistory) return () => {};

    const unListen = rootHistory.listen(location => {
      cb && cb(location);
    });

    return function () {
      unListen && unListen();
    };
  }, [cb]);
}

export default useLocation;
