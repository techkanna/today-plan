import React, { useState, createContext } from 'react';

export const TodoContext = createContext();

const Urls = {
  local: 'http://localhost:1313/api/',
  remote: 'https://todo-server-xi.now.sh/api/',
};

export const TodoProvider = (props) => {
  const [todos, setTodos] = useState([]);
  const [URL] = useState(Urls.remote + 'todo/');
  const [userURL] = useState(Urls.remote + 'user/');
  const [loginURL] = useState(Urls.remote + 'auth');
  const [activeTasks, setactiveTasks] = useState(0);
  const [modalOpened, setModelOpened] = useState(false);
  const [edit, setEdit] = useState({});
  const [user, setUser] = useState('');
  const [globalError, setGlobalError] = useState('');
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
        globalError,
        setGlobalError,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};
