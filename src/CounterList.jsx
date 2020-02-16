/* eslint-disable class-methods-use-this */
/* eslint-disable react/state-in-constructor */

import React, { Component } from 'react';
import Counter from './Counter';

const createRange = num => Array.from(Array(num).keys());

class CounterList extends Component {
  state = {
    numCounters: 2,
  };

  addCounter = () =>
    this.setState(prevState => ({
      numCounters: prevState.numCounters + 1,
    }));

  renderCounter(index) {
    return (
      <li key={index}>
        <Counter />
      </li>
    );
  }

  render() {
    const { numCounters } = this.state;
    const countersArray = createRange(numCounters);

    return (
      <div>
        <button type="button" onClick={this.addCounter}>
          Add counter
        </button>
        <ul>{countersArray.map(num => this.renderCounter(num))}</ul>
      </div>
    );
  }
}

export default CounterList;
