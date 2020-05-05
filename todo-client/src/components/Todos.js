import React, { useContext, useState } from 'react';
import { TodoContext } from '../globalStates/todoContext';
import { Todo } from './Todo';
const URL = 'https://todo-server-xi.now.sh/api/todo';
export const Todos = () => {
  const [todos, setTodos] = useContext(TodoContext);
  const [newTodo, setNewTodo] = useState('');

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

  const submitHanler = async (e) => {
    e.preventDefault();

    const res = await fetch(URL, {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: newTodo }),
    });
    const data = await res.json();
    const copy = [...todos, data];
    setTodos(copy);
    setNewTodo('');
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
      <form onSubmit={submitHanler}>
        <input
          type="text"
          placeholder="Add Todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <input type="submit" value="Add" />
      </form>
    </>
  );
};
