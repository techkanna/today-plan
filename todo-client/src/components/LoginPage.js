import React, { useState, useContext } from 'react';
import { TodoContext } from '../globalStates/todoContext';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './css/LoginPage.css';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loginURL, setUser, setIsAuthenticated } = useContext(TodoContext);

  let history = useHistory();
  let location = useLocation();

  const getLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(loginURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();
      if (data.user) {
        localStorage.setItem('token', JSON.stringify(data.token));
        setUser(data.user.name);
        setIsAuthenticated(true);
        let { from } = location.state || { from: { pathname: '/home' } };
        history.replace(from);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="loginPage">
      <div className="login-container">
        <h2>Sign in to your account</h2>
        <form onSubmit={getLogin}>
          <div className="form-field">
            <label htmlFor="login-email">Email address</label>
            <input
              required
              type="text"
              id="login-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
            />
          </div>
          <div className="form-field">
            <label htmlFor="login-Password">Password</label>
            <input
              required
              type="password"
              id="login-Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
