import React, { useState, createContext } from 'react';

export const TodoContext = createContext();

export const TodoProvider = (props) => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      completed: false,
      message: 'Clean my room',
    },
    {
      id: 2,
      completed: true,
      message: 'develop simple app',
    },
    {
      id: 3,
      completed: false,
      message: 'update portfolio',
    },
  ]);

  return (
    <TodoContext.Provider value={[todos, setTodos]}>
      {props.children}
    </TodoContext.Provider>
  );
};
