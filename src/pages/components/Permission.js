/* eslint-disable react/prop-types */
/* eslint-disable new-cap */
import React, { useEffect, useState } from 'react';

const PermissionContext = React.createContext(null);

function Doc({ name }) {
  return <div>Doc, {name}</div>;
}
Doc.displayName = 'doc';

function Tag({ name }) {
  return <div>Tag, {name}</div>;
}
Tag.displayName = 'tag';

function NoPermission({ auth }) {
  return <div>{ auth }: no permission</div>;
}

function WithHOC(auth) {
  return function (Component) {
    return function Home(props) {
      return (
        <PermissionContext.Consumer>
          {permission => (
            permission.includes(auth) ? <Component {...props} /> : <NoPermission auth={auth} />
          )}
        </PermissionContext.Consumer>
      );
    };
  };
}

const WithDoc = WithHOC('docList2')(Doc);
const WithTag = WithHOC('tagList')(Tag);

function RootRouter() {
  return (
    <div>
      <WithDoc name="xiaoxin" />
      <WithTag name="xiaoqiang" />
    </div>
  );
}

function Index() {
  const [permission, setPermission] = useState([]);

  useEffect(() => {
    setPermission(['docList', 'tagList']);
  }, []);

  return (
    <PermissionContext.Provider value={permission}>
      <RootRouter />
    </PermissionContext.Provider>
  );
}

export default Index;
