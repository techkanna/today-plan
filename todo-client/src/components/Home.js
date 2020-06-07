import React, { useContext } from 'react';
import '../App.css';
import { TodoContext } from '../globalStates/todoContext';

import { Todos } from './home/Todos';
import { Header } from './home/Header';
import { AddTodo } from './home/AddTodo';
import { Modal } from './home/Modal';

export const Home = () => {
  const { modalOpened } = useContext(TodoContext);
  return (
    <>
      <div className="App">
        <div className="container">
          <div className="wrapper">
            <h3 className="title-logo">
              <i className="fas fa-list"></i>Todo List
            </h3>
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
