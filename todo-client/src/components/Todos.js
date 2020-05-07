import React, { useContext } from 'react';
import { TodoContext } from '../globalStates/todoContext';
import { Todo } from './Todo';
const URL = 'https://todo-server-xi.now.sh/api/todo';
export const Todos = () => {
  const { todos, setTodos } = useContext(TodoContext);
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
    const copy = [...todos];
    let index;
    const res = await fetch(`https://todo-server-xi.now.sh/api/todo/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (data.deleted) {
      for (let i = 0; i < copy.length; i++) {
        const todo = todos[i];
        if (todo._id === id) {
          index = i;
          break;
        }
      }
    }
    if (index) {
      copy.splice(index, 1);
    }
    setTodos(copy);
  };
  return (
    <div className="todos">
      <Incompleted
        todos={todos.filter((todo) => !todo.completed)}
        setCompleted={setCompleted}
        deleteTodo={deleteTodo}
      />
      <Completed
        todos={todos.filter((todo) => todo.completed)}
        setCompleted={setCompleted}
        deleteTodo={deleteTodo}
      />
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
