import React from 'react';
import './App.css';
import { TodoProvider } from './globalStates/todoContext';
import { Todos } from './components/Todos';
import { Header } from './components/Header';
import { AddTodo } from './components/AddTodo';

function App() {
  return (
    <TodoProvider>
      <div className="App">
        <div className="container">
          <div className="wrapper">
            <Header />
            <AddTodo />
            <Todos />
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
