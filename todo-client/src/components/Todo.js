import React from 'react';
import { DeleteSvg } from './DeleteSvg';

export const Todo = ({ todo, setCompleted, deleteTodo }) => {
  return (
    <div className="todo">
      <div className="left-wrapper">
        <input
          type="checkbox"
          onChange={() => setCompleted(todo)}
          name="todo"
          className="todo-check-box"
          checked={todo.completed}
        />
        <span
          className="msg"
          style={{ textDecoration: todo.completed ? 'line-through' : '' }}
          onClick={() => setCompleted(todo)}
        >
          {todo.message}
        </span>
      </div>
      <button className="del-btn" onClick={() => deleteTodo(todo)}>
        <DeleteSvg />
      </button>
    </div>
  );
};
