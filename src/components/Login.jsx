import React from 'react';

function Login() {
  return (
    <div>
      <input type="text" data-testid="email-input" />
      <input type="text" data-testid="password-input" />
      <div>
        <button type="button" data-testid="login-submit-btn">Enter</button>
      </div>
    </div>
  );
}

export default Login;
