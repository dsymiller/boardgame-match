import React, { Component } from 'react';
import Login from './Login';
import Signup from './Signup';
import BoardgameContainer from './BoardgameContainer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: 3,
      username: '',
      loggedIn: true,
    };
  }

  handleLogin(user, username) {
    const newState = {
      user,
      username,
      loggedIn: true,
    };
    this.setState(newState);
  }

  handleLogout() {
    const newState = {
      user: '',
      loggedIn: false,
    };
    this.setState(newState);
  }

  serverTest() {
    fetch('/api/test', {
      method: 'POST',
      body: JSON.stringify({ message: 'hello world' }),
      headers: { 'Content-Type': 'application/json' },
    });
  }

  render() {
    if (!this.state.loggedIn) {
      return (
        <div>
          <Login
            handleLogin={(user, username) => this.handleLogin(user, username)}
          />
          <Signup
            handleLogin={(user, username) => this.handleLogin(user, username)}
          />
        </div>
      );
    } else {
      return (
        <div>
          <BoardgameContainer
            username={this.state.username}
            user={this.state.user}
            handleLogout={() => handleLogout()}
          />
        </div>
      );
    }
  }
}

export default App;
