import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Counter from './Counter';

ReactDOM.render(
  <div>
    <Counter />
    <App />
  </div>,
  document.getElementById('app'),
);

module.hot.accept();
