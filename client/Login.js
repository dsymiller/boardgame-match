import React, { useState } from 'react';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit() {
    console.log(username, password);
    const result = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await result.json();
    console.log(data);
    if (data.hasOwnProperty('err')) return setError(data.err);
    if (data.loggedIn === true) {
      console.log(data);
      props.handleLogin(data.user._id, data.user.username);
    } else setError('an unknown error occured');
  }
  return (
    <div id="login">
      <label htmlFor="login-form">
        LOGIN
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <label htmlFor="login-username">
            username
            <input
              id="login-username"
              value={username}
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label htmlFor="login-password">
            password
            <input
              id="login-password"
              value={password}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button>submit</button>
        </form>
      </label>
      <p className="error" id="login-error">
        {error}
      </p>
    </div>
  );
};
export default Login;
