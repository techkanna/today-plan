import React from 'react';
import './App.css';
import { TodoProvider } from './globalStates/todoContext';
import { Todos } from './components/Todos';
function App() {
  return (
    <TodoProvider>
      <div className="App">
        <h1>Todo List</h1>
        <Todos />
      </div>
    </TodoProvider>
  );
}

export default App;
