import React from 'react';
import { Link } from 'react-router-dom';
import './css/LoginPage.css';

export const LoginPage = () => {
  return (
    <div className="loginPage">
      <div className="login-container">
        <h2>Sign in to your account</h2>
        <form>
          <div className="form-field">
            <label htmlFor="login-email">Email address</label>
            <input
              type="text"
              id="login-email"
              placeholder="Enter your email address..."
            />
          </div>
          <div className="form-field">
            <label htmlFor="login-Password">Password</label>
            <input
              type="password"
              id="login-Password"
              placeholder="Enter your password..."
            />
          </div>
          <input type="submit" value="Sign up" />
          <p>
            New user? <Link to="/register">Create an account.</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
