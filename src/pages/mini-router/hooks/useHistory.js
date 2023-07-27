import { useContext } from 'react';
import { RouterContext } from '../component/Router';

function useHistory() {
  return useContext(RouterContext).history;
}

export default useHistory;
