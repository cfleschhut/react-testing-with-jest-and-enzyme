import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import CounterList from './CounterList';

ReactDOM.render(
  <div>
    <CounterList />
    <App />
  </div>,
  document.getElementById('app'),
);

module.hot.accept();
