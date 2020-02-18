import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import CounterList from './CounterList';
import User from './User';

ReactDOM.render(
  <div>
    <CounterList />
    <User id={1} />
    <App />
  </div>,
  document.getElementById('app'),
);

module.hot.accept();
