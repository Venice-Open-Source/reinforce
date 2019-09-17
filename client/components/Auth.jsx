import React from 'react';
import '../stylesheets/Auth.css';

const Auth = () => {
  return (
    <form className="auth-form">
      <div className="form-control">
        <label htmlFor="email">E-mail</label>
        <input type="email" id="email"></input>
      </div>
      <div className="form-control">
        <label htmlFor="password">Password</label>
        <input type="password" id="password"></input>
      </div>
      <div className="form-actions">
        <button type="button">Switch to Signup</button>
        <button type="submit">Login</button>
      </div>
    </form>
  )
}

export default Auth;