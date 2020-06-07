import React, { useState, createContext } from 'react';

export const TodoContext = createContext();

const Urls = {
  local: 'http://localhost:1313/api/todo',
  remote: 'https://todo-server-xi.now.sh/api/todo',
};

export const TodoProvider = (props) => {
  const [todos, setTodos] = useState([]);
  const [URL] = useState(Urls.local);
  const [activeTasks, setactiveTasks] = useState(0);
  const [modalOpened, setModelOpened] = useState(false);
  const [edit, setEdit] = useState({});

  return (
    <TodoContext.Provider
      value={{
        todos,
        URL,
        setTodos,
        activeTasks,
        setactiveTasks,
        modalOpened,
        setModelOpened,
        edit,
        setEdit,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};
