import { useContext } from 'react';
import { RouterContext } from '../component/Router';

function useLocation() {
  return useContext(RouterContext).location;
}

export default useLocation;
