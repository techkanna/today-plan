import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { TodoContext } from '../globalStates/todoContext';
let date = new Date().toDateString();
date = date.slice(0, date.length - 5);
date = date.slice(0, 3) + ', ' + date.slice(4, date.length);
export const Header = () => {
  const { activeTasks } = useContext(TodoContext);
  return (
    <header>
      <div className="logo-text">
        <h4>{date}</h4>
        <span>{activeTasks} Active Tasks</span>
      </div>
      <div className="links">
        <h4>
          <NavLink
            className="link"
            to="/"
            exact
            activeStyle={{
              fontWeight: 'bold',
              color: '#fff',
            }}
          >
            Incomplete Tasks
          </NavLink>
        </h4>
        <h4>
          <NavLink
            className="link"
            to="/completed"
            activeStyle={{
              fontWeight: 'bold',
              color: '#fff',
            }}
          >
            Completed Tasks
          </NavLink>
        </h4>
      </div>
    </header>
  );
};
