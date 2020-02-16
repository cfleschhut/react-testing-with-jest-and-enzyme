import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);

    this.state = { count: 0 };
  }

  increment = () => {
    this.setState(prevState => ({
      count: prevState.count + 1,
    }));
  };

  decrement = () => {
    this.setState(prevState => ({
      count: prevState.count - 1,
    }));
  };

  render() {
    const { count } = this.state;

    return (
      <div>
        <p>
          Current count:
          <span>{count}</span>
        </p>
        <button type="button" onClick={this.increment} className="increment">
          Increment
        </button>
        <button type="button" onClick={this.decrement} className="decrement">
          Decrement
        </button>

        <hr />
      </div>
    );
  }
}

export default Counter;
