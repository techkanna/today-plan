import React from 'react';

let date = new Date().toDateString();
date = date.slice(0, date.length - 5);
date = date.slice(0, 3) + ', ' + date.slice(4, date.length);
export const Header = () => {
  return (
    <header>
      <div className="logo">
        <h4>{date}</h4>
        <span>3 Active Tasks</span>
      </div>
      <div className="links">
        <h4>Incomplete Tasks</h4>
        <h4>Completed Tasks</h4>
      </div>
    </header>
  );
};
