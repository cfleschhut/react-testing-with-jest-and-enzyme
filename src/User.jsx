import React, { Component } from 'react';
import PropTypes from 'prop-types';

const urlForUser = id => `https://jsonplaceholder.typicode.com/users/${id}`;

const fetchUser = id => fetch(urlForUser(id)).then(data => data.json());

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    const { id } = this.props;
    fetchUser(id).then(user => this.setState({ user }));
  }

  render() {
    const { user } = this.state;
    return user === null ? (
      <p>Loading!</p>
    ) : (
      <div>
        <h4>{user.name}</h4>
        <p>
          URL:
          {user.website}
        </p>
      </div>
    );
  }
}

User.propTypes = {
  id: PropTypes.number.isRequired,
};

export default User;
