import React, { Component } from 'react';

class App extends Component {
  serverTest() {
    fetch('/api/test', {
      method: 'POST',
      body: JSON.stringify({ message: 'hello world' }),
      headers: { 'Content-Type': 'application/json' },
    });
  }

  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <button onClick={this.serverTest}>server test</button>
      </div>
    );
  }
}

export default App;
