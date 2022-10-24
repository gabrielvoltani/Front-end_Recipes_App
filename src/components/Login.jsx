import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleInput = ({ target: { name, value } }) => {
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  return (
    <div>
      <input
        type="text"
        data-testid="email-input"
        name="email"
        value={ email }
        onChange={ handleInput }
      />
      <input
        type="text"
        data-testid="password-input"
        name="password"
        value={ password }
        onChange={ handleInput }
      />
      <div>
        <button type="button" data-testid="login-submit-btn">Enter</button>
      </div>
    </div>
  );
}

export default Login;
