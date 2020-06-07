import React, { useContext } from 'react';
import { TodoContext } from '../../../globalStates/todoContext';
import { DeleteSvg } from './DeleteSvg';

export const Todo = ({ todo }) => {
  const { URL, todos, setTodos, setModelOpened, setEdit } = useContext(
    TodoContext
  );

  const setCompleted = async () => {
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
    if (data.data) {
      for (let i = 0; i < copy.length; i++) {
        const todo = todos[i];
        if (todo._id === id) {
          todo.completed = data.data.completed;
          break;
        }
      }
    }
    setTodos(copy);
  };

  const deleteTodo = async () => {
    const id = todo._id;
    let copy = [...todos];
    const res = await fetch(`${URL}/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (data.deleted) {
      copy = copy.filter((todo) => todo._id !== id);
      setTodos(copy);
    }
  };

  return (
    <div className="todo">
      <div className="left-wrapper">
        <input
          type="checkbox"
          onChange={setCompleted}
          name="todo"
          className="todo-check-box"
          checked={todo.completed}
        />
        <span
          className="msg"
          style={{ textDecoration: todo.completed ? 'line-through' : '' }}
          onClick={() => {
            setModelOpened(true);
            setEdit(todo);
          }}
        >
          {todo.message}
        </span>
      </div>
      <button className="del-btn" onClick={deleteTodo}>
        <DeleteSvg />
      </button>
    </div>
  );
};
