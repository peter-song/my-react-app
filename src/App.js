import React from 'react';
import {
  BrowserRouter,
  Link,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';

import ErrorBoundary from './pages/ErrorBoundary';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import Component from './pages/Component';
import Context from './pages/Context';
import Refs from './pages/Refs';
import UseMemo from './pages/UseMemo';
import UseCallback from './pages/UseCallback';
import Hooks from './pages/Hooks';
import RenderProps from './pages/RenderProps';
import UseState from './pages/UseState';
import UseContext from './pages/UseContext';
import UseReducer from './pages/UseReducer';
import UseImperativeHandle from './pages/UseImperativeHandle';
import LifeCycle from './pages/LifeCycle';
import Portals from './pages/Portals';
import JSX from './pages/JSX';
import Props from './pages/Props';
import HOC from './pages/HOC';
import Memo from './pages/Memo';
import Suspense from './pages/Suspense';
import TimeSlicing from './pages/TimeSlicing';
import MiniRouter from './pages/MiniRouter';

// import logo from "./logo.svg";
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

function App() {
  return (
    <div style={{ padding: 20 }}>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Welcome />} />
              <Route path="/home" element={<Home />} />
              <Route path="/component" element={<Component />} />
              <Route path="/context" element={<Context />} />
              <Route path="/refs" element={<Refs />} />
              <Route path="/memo" element={<Memo />} />
              <Route path="/useMemo" element={<UseMemo />} />
              <Route path="/useCallback" element={<UseCallback />} />
              <Route path="/hooks" element={<Hooks />} />
              <Route path="/render-props" element={<RenderProps />} />
              <Route path="/useState" element={<UseState />} />
              <Route path="/useContext" element={<UseContext />} />
              <Route path="/useReducer" element={<UseReducer />} />
              <Route path="/useImperativeHandle" element={<UseImperativeHandle />} />
              <Route path="/lifeCycle" element={<LifeCycle />} />
              <Route path="/portals" element={<Portals />} />
              <Route path="/jsx" element={<JSX />} />
              <Route path="/props" element={<Props />} />
              <Route path="/hoc" element={<HOC />} />
              <Route path="/suspense" element={<Suspense />} />
              <Route path="/timeSlicing" element={<TimeSlicing />} />
              <Route path="/mini" element={<MiniRouter />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </div>
  );
}

function Layout() {
  return (
    <div style={{ display: 'flex' }}>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <div style={{ width: 300 }}>
        <nav>
          <ul>
            <li>
              <Link to="/">Welcome</Link>
            </li>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/jsx">JSX</Link>
            </li>
            <li>
              <Link to="/component">Component</Link>
            </li>
            {/* <li>
              <Link to="/codespliting">CodeSpliting</Link>
            </li> */}
            <li>
              <Link to="/context">Context</Link>
            </li>
            <li>
              <Link to="/refs">Refs</Link>
            </li>
            <li>
              <Link to="/portals">Portals</Link>
            </li>
            <li>
              <Link to="/notUseES6">do not use es6</Link>
            </li>
            <li>
              <Link to="/render-props">Render Props</Link>
            </li>
            <li>
              <Link to="/un-controlled">Uncontrolled</Link>
            </li>
            <li>
              <Link to="/hooks">Hooks</Link>
            </li>
            <li>
              <Link to="/useState">UseState</Link>
            </li>
            <li>
              <Link to="/useContext">useContext</Link>
            </li>
            <li>
              <Link to="/useReducer">UseReducer</Link>
            </li>
            <li>
              <Link to="/useSyncExternalStore">UseSyncExternalStore</Link>
            </li>
            <li>
              <Link to="/useTransition">UseTransition</Link>
            </li>
            <li>
              <Link to="/useDeferredValue">UseDeferredValue</Link>
            </li>
            <li>
              <Link to="/useImperativeHandle">UseImperativeHandle</Link>
            </li>
            <li>
              <Link to="/memo">Memo</Link>
            </li>
            <li>
              <Link to="/useMemo">UseMemo</Link>
            </li>
            <li>
              <Link to="/useCallback">UseCallback</Link>
            </li>
            <li>
              <Link to="/customHooks">CustomHooks</Link>
            </li>
            <li>
              <Link to="/lodash">Lodash</Link>
            </li>
            <li>
              <Link to="/slider">SimpleSlider</Link>
            </li>
            <li>
              <Link to="/antd">Antd</Link>
            </li>
            <li>
              <Link to="/scroller">Scroller</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/dashboard">dashboard</Link>
            </li>
            <li>
              <Link to="/props">Props</Link>
            </li>
            <li>
              <Link to="/lifeCycle">LifeCycle</Link>
            </li>
            <li>
              <Link to="/suspense">Suspense</Link>
            </li>
            <li>
              <Link to="/timeSlicing">TimeSlicing</Link>
            </li>
            <li>
              <Link to="/scrollView">ScrollView</Link>
            </li>
            <li>
              <Link to="/form">Form</Link>
            </li>
            <li>
              <Link to="/hoc">HOC</Link>
            </li>
            <li>
              <Link to="/mini">MiniRouter</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
