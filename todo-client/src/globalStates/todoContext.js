import React, { useState, useEffect, createContext } from 'react';

export const TodoContext = createContext();

export const TodoProvider = (props) => {
  const [todos, setTodos] = useState([]);
  const [inCompletedTodos, setInCompletedTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const URL = 'https://todo-server-xi.now.sh/api/todo';
      const res = await fetch(URL);
      const data = await res.json();
      const inCompleted = data.filter((todo) => !todo.completed);
      const completed = data.filter((todo) => todo.completed);
      setInCompletedTodos(inCompleted);
      setCompletedTodos(completed);
      setTodos(data);
    };
    getData();
  }, []);
  return (
    <TodoContext.Provider
      value={{ todos, setTodos, inCompletedTodos, completedTodos }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};
