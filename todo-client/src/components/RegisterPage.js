import React, { useState, useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { TodoContext } from '../globalStates/todoContext';
import './css/RegisterPage.css';

export const RegisterPage = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setcPassword] = useState('');
  const [errors, setErrors] = useState('');

  const { userURL } = useContext(TodoContext);

  let history = useHistory();
  let location = useLocation();

  const getUser = async (e) => {
    e.preventDefault();
    if (password !== cPassword) {
      setErrors("passwords doesn't match");
      setPassword('');
      setcPassword('');
      return false;
    }

    try {
      const res = await fetch(userURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName,
          email,
          password,
        }),
      });
      const data = await res.json();
      if (data.user) {
        let { from } = location.state || { from: { pathname: '/' } };
        history.replace(from);
      } else {
        setErrors(data.msg);
        setcPassword('');
        setPassword('');
        setUserName('');
        setEmail('');
      }
    } catch (e) {
      setErrors(JSON.stringify(e));
    }
  };
  return (
    <div className="registerPage">
      <div className="register-container">
        <h2>Register your account</h2>
        <form onSubmit={getUser}>
          <div className="form-field">
            <label htmlFor="userName">UserName</label>
            <input
              required
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter a username..."
            />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email address</label>
            <input
              required
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
            />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              required
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password..."
            />
          </div>
          <div className="form-field">
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              required
              type="password"
              id="cpassword"
              value={cPassword}
              onChange={(e) => setcPassword(e.target.value)}
              placeholder="Enter your password again..."
            />
          </div>
          <p className="errors">{errors}</p>
          <input type="submit" value="Sign up" />
          <p>
            Already have an account? <Link to="/">Sign in.</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
