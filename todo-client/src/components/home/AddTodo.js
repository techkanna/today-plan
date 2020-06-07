import React, { useContext, useState } from 'react';
import { TodoContext } from '../../globalStates/todoContext';

export const AddTodo = () => {
  const { URL, todos, setTodos } = useContext(TodoContext);

  const [newTodo, setNewTodo] = useState('');

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
    if (data.message) {
      const copy = [...todos, data];
      setTodos(copy);
    }
    setNewTodo('');
  };
  return (
    <section className="add-todo">
      <form onSubmit={submitHanler}>
        <input
          type="text"
          placeholder="Enter a todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <input type="submit" value="Add Todo" />
      </form>
    </section>
  );
};
