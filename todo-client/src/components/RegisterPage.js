import React from 'react';
import { Link } from 'react-router-dom';
import './css/RegisterPage.css';

export const RegisterPage = () => {
  return (
    <div className="registerPage">
      <div className="register-container">
        <h2>Register your account</h2>
        <form>
          <div className="form-field">
            <label htmlFor="userName">UserName</label>
            <input
              type="text"
              id="userName"
              placeholder="Enter a username..."
            />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email address</label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email address..."
            />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password..."
            />
          </div>
          <div className="form-field">
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              type="password"
              id="cpassword"
              placeholder="Enter your password again..."
            />
          </div>
          <input type="submit" value="Sign up" />
          <p>
            Already have an account? <Link to="/">Sign in.</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
