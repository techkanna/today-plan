import React from 'react';

export const Todo = ({ todo, setCompleted }) => {
  return (
    <>
      <div>
        <input
          type="checkbox"
          onChange={() => setCompleted(todo)}
          name="todo"
          id="todo"
          checked={todo.completed}
        />
        <span
          style={{ textDecoration: todo.completed ? 'line-through' : '' }}
          onClick={() => setCompleted(todo)}
        >
          {todo.message}
        </span>
      </div>
    </>
  );
};
