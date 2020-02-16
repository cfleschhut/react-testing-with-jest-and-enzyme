import React, { useState, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const dataReducer = (state, action) => {
  if (action.type === 'SET_ERROR') {
    return {
      ...state,
      list: [],
      error: true,
    };
  }
  if (action.type === 'SET_LIST') {
    return {
      ...state,
      list: action.list,
      error: null,
    };
  }
  throw new Error();
};

export const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREASE':
      return { ...state, count: state.count + 1 };

    case 'DECREASE':
      return { ...state, count: state.count - 1 };

    default:
      return state;
  }
};

const initialData = {
  list: [],
  error: null,
};

const App = () => {
  const [data, dispatch] = useReducer(dataReducer, initialData);
  const [counter, setCounter] = useReducer(counterReducer, { count: 0 });

  useEffect(() => {
    axios
      .get('http://hn.algolia.com/api/v1/search?query=react')
      .then(response => {
        dispatch({ type: 'SET_LIST', list: response.data.hits });
      })
      .catch(() => {
        dispatch({ type: 'SET_ERROR' });
      });
  }, []);

  return (
    <div>
      <h1>Counter (using useReducer hook)</h1>
      <Counter counter={counter.count} />
      <button type="button" onClick={() => setCounter({ type: 'INCREASE' })}>
        Increment
      </button>
      <button type="button" onClick={() => setCounter({ type: 'DECREASE' })}>
        Decrement
      </button>

      <h2>Async Data (using Axios and useEffect + useReducer hooks)</h2>
      {data.error && <div className="error">Error</div>}
      <ul>
        {data.list.map(item => (
          <li key={item.objectID}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export const Counter = ({ counter }) => (
  <div>
    <p>{counter}</p>
  </div>
);

Counter.propTypes = {
  counter: PropTypes.number.isRequired,
};

export default App;
