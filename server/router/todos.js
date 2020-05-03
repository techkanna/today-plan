const express = require('express');

const Router = express.Router();

const todos = [
  {
    id: 1,
    completed: false,
    message: 'Clean my room',
  },
  {
    id: 2,
    completed: true,
    message: 'develop simple app',
  },
  {
    id: 3,
    completed: false,
    message: 'update portfolio',
  },
];

Router.get('/', (_, res) => {
  res.json(todos);
});

Router.post('/', (req, res) => {
  const newOne = {
    id: todos.length + 1,
    completed: false,
    message: req.body.message,
  };
  todos.push(newOne);
  res.status(201).json(todos);
});

Router.patch('/', (req, res) => {
  const id = req.body.id;

  todos.forEach((todo) => {
    if (todo.id === id) {
      todo.completed = !todo.completed;
    }
  });

  res.json(todos);
});

Router.delete('/:id/', (req, res) => {
  const id = +req.params.id;

  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    if (id === todo.id) {
      todos.splice(i, 1);
    }
  }

  res.json({ msg: 'deleted successfully' });
});

module.exports = Router;
