import React, { useState } from 'react';

const Signup = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit() {
    console.log(username, password);
    const result = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await result.json();
    console.log(data);
    if (data.hasOwnProperty('err')) return setError(data.err);
    if (data.signedUp === true) {
      props.handleLogin(data.user._id, data.user.username);
    } else setError('an unknown error occured');
  }
  return (
    <div id="signup">
      <label htmlFor="signup-form">
        SIGNUP
        <form
          id="signup-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <label htmlFor="signup-username">
            username
            <input
              id="signup-username"
              value={username}
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label htmlFor="signup-password">
            password
            <input
              id="signup-password"
              value={password}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button>submit</button>
        </form>
      </label>
      <p className="error" id="signup-error">
        {error}
      </p>
    </div>
  );
};
export default Signup;
