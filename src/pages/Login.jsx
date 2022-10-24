import React, { useState } from 'react';
import { func } from 'prop-types';
import { setUser } from '../services/localStorage';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleInput = ({ target: { name, value } }) => {
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const emailIsValid = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  const minLengthPassword = 6;

  const handleSubmit = () => {
    setUser({ email });
    history.push('/meals');
  };

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
          onClick={ handleSubmit }
        >
          Enter
        </button>
      </div>
    </form>
  );
}

Login.propTypes = {
  history: func.isRequired,
};

export default Login;
