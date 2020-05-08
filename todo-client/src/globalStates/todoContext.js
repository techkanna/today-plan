import React, { useState, useEffect, createContext } from 'react';

export const TodoContext = createContext();

export const TodoProvider = (props) => {
  const [todos, setTodos] = useState([]);
  const [activeTasks, setactiveTasks] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const URL = 'https://todo-server-xi.now.sh/api/todo';
      const res = await fetch(URL);
      const data = await res.json();
      setTodos(data);
    };
    getData();
  }, []);
  return (
    <TodoContext.Provider
      value={{ todos, setTodos, activeTasks, setactiveTasks }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};
