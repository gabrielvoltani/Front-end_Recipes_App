import React, { useState } from 'react';
import { setUser } from '../services/localStorage';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleInput = ({ target: { name, value } }) => {
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const emailIsValid = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  const minLengthPassword = 6;

  return (
    <form>
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
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ !(emailIsValid && password.length > minLengthPassword) }
          onClick={ () => setUser({ email }) }
        >
          Enter
        </button>
      </div>
    </form>
  );
}

export default Login;
