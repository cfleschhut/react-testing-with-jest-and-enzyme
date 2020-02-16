/* eslint-disable react/sort-comp */

import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);

    this.state = { count: 0 };
  }

  makeIncrementer = amount => () =>
    this.setState(prevState => ({
      count: prevState.count + amount,
    }));

  increment = this.makeIncrementer(1);

  decrement = this.makeIncrementer(-1);

  render() {
    const { count } = this.state;

    return (
      <div>
        <p>
          Current count:
          <span>{count}</span>
        </p>
        <button type="button" onClick={this.increment} className="increment">
          +++
        </button>
        <button type="button" onClick={this.decrement} className="decrement">
          ---
        </button>

        <hr />
      </div>
    );
  }
}

export default Counter;
