import React, { useContext, useEffect } from 'react';
import { TodoContext } from '../globalStates/todoContext';
import { Todo } from './Todo';
import { Switch, Route } from 'react-router-dom';
const URL = 'https://todo-server-xi.now.sh/api/todo';

export const Todos = () => {
  const { todos, setTodos, setactiveTasks } = useContext(TodoContext);
  useEffect(() => {
    setactiveTasks(todos.filter((todo) => !todo.completed).length);
  });

  const setCompleted = async (todo) => {
    const id = todo._id;
    const copy = [...todos];
    const res = await fetch(URL, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id: id }),
    });
    const data = await res.json();
    for (let i = 0; i < copy.length; i++) {
      const todo = todos[i];
      if (todo._id === id) {
        todo.completed = data.data.completed;
        break;
      }
    }
    setTodos(copy);
  };

  const deleteTodo = async (todo) => {
    const id = todo._id;
    let copy = [...todos];
    const res = await fetch(`https://todo-server-xi.now.sh/api/todo/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (data.deleted) {
      copy = copy.filter((todo) => todo._id !== id);
      setTodos(copy);
    }
  };

  return (
    <div className="todos">
      <Switch>
        <Route exact path="/">
          <Incompleted
            todos={todos.filter((todo) => !todo.completed)}
            setCompleted={setCompleted}
            deleteTodo={deleteTodo}
          />
        </Route>
        <Route path="/completed">
          <Completed
            todos={todos.filter((todo) => todo.completed)}
            setCompleted={setCompleted}
            deleteTodo={deleteTodo}
          />
        </Route>
      </Switch>
    </div>
  );
};

const Completed = ({ todos, setCompleted, deleteTodo }) => {
  return (
    <>
      {todos.map((todo, i) => {
        return (
          <Todo
            key={i}
            todo={todo}
            setCompleted={setCompleted}
            deleteTodo={deleteTodo}
          />
        );
      })}
    </>
  );
};

const Incompleted = ({ todos, setCompleted, deleteTodo }) => {
  return (
    <>
      {todos.map((todo, i) => {
        return (
          <Todo
            key={i}
            todo={todo}
            setCompleted={setCompleted}
            deleteTodo={deleteTodo}
          />
        );
      })}
    </>
  );
};
