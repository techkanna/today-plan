import React, { useContext } from 'react';
import '../App.css';
import { TodoContext } from '../globalStates/todoContext';
import { useHistory, useLocation } from 'react-router-dom';

import { Todos } from './home/Todos';
import { Header } from './home/Header';
import { AddTodo } from './home/AddTodo';
import { Modal } from './home/Modal';

export const Home = () => {
  const { modalOpened, user, setUser, setIsAuthenticated } = useContext(
    TodoContext
  );

  let history = useHistory();
  let location = useLocation();

  const signOut = () => {
    localStorage.removeItem('token');
    setUser('');
    setIsAuthenticated(true);
    let { from } = location.state || { from: { pathname: '/' } };
    history.replace(from);
  };
  return (
    <>
      <div className="App">
        <div className="container">
          <div className="wrapper">
            <h3 className="title-logo">
              <i className="fas fa-list"></i> {user}'s Todo List
            </h3>
            <span className="sign-out" onClick={signOut}>
              <i className="fas fa-sign-out-alt"></i>
            </span>
            <Header />
            <AddTodo />
            <Todos />
          </div>
        </div>
      </div>
      {modalOpened ? (
        <div className="modal-wrapper">
          <Modal />
        </div>
      ) : null}
    </>
  );
};
