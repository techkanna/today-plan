import React, { useContext, useState } from 'react';
import { TodoContext } from '../../globalStates/todoContext';
export const Modal = () => {
  const { URL, todos, setTodos, setModelOpened, edit } = useContext(
    TodoContext
  );

  const [newMsg, setNewMsg] = useState(edit.message);

  const updateMessage = async (e) => {
    e.preventDefault();

    const { _id } = edit;
    const message = newMsg;

    const copy = [...todos];
    const res = await fetch(URL, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id, message }),
    });
    const data = await res.json();

    if (data.data) {
      for (let i = 0; i < copy.length; i++) {
        const todo = todos[i];
        if (todo._id === _id) {
          todo.message = data.data.message;
          break;
        }
      }
    }

    setTodos(copy);
    setModelOpened(false);
  };

  return (
    <div className="modal">
      <button className="close-btn" onClick={() => setModelOpened(false)}>
        &#935;
      </button>

      <h3>Edit</h3>

      <section className="add-todo">
        <form onSubmit={updateMessage}>
          <input
            type="text"
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
          />
          <input type="submit" value="Save" />
        </form>
      </section>
    </div>
  );
};
