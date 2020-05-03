import React, { useContext, useState } from 'react';
import { TodoContext } from '../globalStates/todoContext';
import { Todo } from './Todo';
export const Todos = () => {
  const [todos, setTodos] = useContext(TodoContext);
  const [newTodo, setNewTodo] = useState('');
  const setCompleted = (todo) => {
    const copy = [...todos];
    copy.forEach((localTodo) => {
      if (localTodo.id === todo.id) {
        localTodo.completed = !localTodo.completed;
      }
    });
    setTodos(copy);
  };

  const submitHanler = (e) => {
    e.preventDefault();
    const copy = [
      ...todos,
      { message: newTodo, completed: false, id: todos.length + 1 },
    ];
    setTodos(copy);
    setNewTodo('');
  };
  return (
    <>
      {todos.map((todo, i) => {
        return <Todo key={i} todo={todo} setCompleted={setCompleted} />;
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
