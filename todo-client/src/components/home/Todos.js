import React, { useContext, useEffect } from 'react';
import { TodoContext } from '../../globalStates/todoContext';
import { Todo } from './todo/Todo';
import { Switch, Route } from 'react-router-dom';

export const Todos = () => {
  const { URL, todos, setTodos, setactiveTasks } = useContext(TodoContext);

  useEffect(() => {
    let mounted = true;
    const getData = async () => {
      const token = JSON.parse(localStorage.getItem('token'));
      const res = await fetch(URL, {
        method: 'Get',
        headers: {
          'x-auth-token': token,
        },
      });
      const data = await res.json();
      if (mounted) {
        setTodos(data);
      }
    };
    getData();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setactiveTasks(todos.filter((todo) => !todo.completed).length);
    }
    return () => {
      mounted = false;
    };
  });

  return (
    <div className="todos">
      <Switch>
        <Route path="/home/completed">
          {todos
            .filter((todo) => todo.completed)
            .map((todo, i) => (
              <Todo key={i} todo={todo} />
            ))}
        </Route>
        <Route path="/home/">
          {todos
            .filter((todo) => !todo.completed)
            .map((todo, i) => (
              <Todo key={i} todo={todo} />
            ))}
        </Route>
      </Switch>
    </div>
  );
};
