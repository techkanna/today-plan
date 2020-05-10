import React, { useContext } from 'react';
import './App.css';
import { TodoContext } from './globalStates/todoContext';

import { Todos } from './components/Todos';
import { Header } from './components/Header';
import { AddTodo } from './components/AddTodo';
import { Modal } from './components/Modal';

function App() {
  const { opened } = useContext(TodoContext);
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
      {opened ? (
        <div className="modal-wrapper">
          <Modal />
        </div>
      ) : null}
    </>
  );
}

export default App;
