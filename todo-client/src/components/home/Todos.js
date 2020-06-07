import React, { useContext, useEffect } from 'react';
import { TodoContext } from '../../globalStates/todoContext';
import { Todo } from './todo/Todo';
import { Switch, Route } from 'react-router-dom';

export const Todos = () => {
  const { URL, todos, setTodos, setactiveTasks } = useContext(TodoContext);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(URL);
      const data = await res.json();
      setTodos(data);
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setactiveTasks(todos.filter((todo) => !todo.completed).length);
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
