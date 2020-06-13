const Router = require('express').Router();
const User = require('../schema/todoUser');
const auth = require('../middleware/auth');

// @route   GET /api/todo/
// @desc    get all todos
// @access  Public
Router.get('/', auth, (req, res) => {
  User.findById(req.user.id)
    .select('todos')
    .then((user) => {
      res.json(user.todos);
    });
});

// @route   POST /api/todo/
// @desc    Create a todo
// @access  PRIVATE
Router.post('/', auth, (req, res) => {
  const newtodo = {
    completed: false,
    message: req.body.message,
  };
  User.findById(req.user.id)
    .select('todos')
    .then((user) => {
      user.todos.push(newtodo);
      user.save();
      res.status(201).json(user.todos[user.todos.length - 1]);
    });
});

// @route   PATCH /api/todo/
// @desc    Update todo state
// @access  PRIVATE
Router.patch('/', auth, (req, res) => {
  const { _id, message } = req.body;

  User.findById(req.user.id)
    .select('todos')
    .then((user) => {
      let todo = user.todos.find((todo) => todo._id == _id);
      if (todo) {
        if (message) {
          todo.message = message;
        } else {
          todo.completed = !todo.completed;
        }
        user.save();
        res.json({ updated: true, data: todo });
      }
    });
});

// @route   DELETE /api/todo/:id
// @desc    Delete a todo
// @access  PRIVATE
Router.delete('/:id/', auth, (req, res) => {
  const { id } = req.params;

  User.findById(req.user.id)
    .select('todos')
    .then((user) => {
      user.todos = user.todos.filter((todo) => todo.id != id);
      user.save();
      res.json({ deleted: true, msg: 'deleted successfully' });
    });
});

module.exports = Router;
