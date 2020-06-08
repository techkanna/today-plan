import React, { useState, createContext } from 'react';

export const TodoContext = createContext();

const Urls = {
  local: 'http://localhost:1313/api/',
  remote: 'https://todo-server-xi.now.sh/api/',
};

export const TodoProvider = (props) => {
  const [todos, setTodos] = useState([]);
  const [URL] = useState(Urls.local + 'todo');
  const [userURL] = useState(Urls.local + 'user');
  const [loginURL] = useState(Urls.local + 'auth');
  const [activeTasks, setactiveTasks] = useState(0);
  const [modalOpened, setModelOpened] = useState(false);
  const [edit, setEdit] = useState({});
  const [user, setUser] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <TodoContext.Provider
      value={{
        todos,
        URL,
        userURL,
        loginURL,
        setTodos,
        activeTasks,
        setactiveTasks,
        modalOpened,
        setModelOpened,
        edit,
        setEdit,
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};
