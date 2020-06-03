const Router = require('express').Router();
const TodoModel = require('../schema/todoSchema');
const auth = require('../middleware/auth');

// @route   GET /api/todo/
// @desc    get all todos
// @access  Public
Router.get('/', (_, res) => {
  TodoModel.find((err, todos) => {
    if (err) return err;
    res.json(todos);
  });
});

// @route   POST /api/todo/
// @desc    Create a todo
// @access  PRIVATE
Router.post('/', auth, (req, res) => {
  const newtodo = new TodoModel({
    completed: false,
    message: req.body.message,
  });
  newtodo.save((err, todo) => {
    if (err) return err;
    res.status(201).json(todo);
  });
});

// @route   PATCH /api/todo/
// @desc    Update todo state
// @access  PRIVATE
Router.patch('/', auth, (req, res) => {
  const { _id, message } = req.body;

  if (!message) {
    TodoModel.findById(_id, (err, todo) => {
      if (err) return err;
      todo.completed = !todo.completed;
      todo.save();
      res.json({ updated: true, data: todo });
    });
  }

  if (message) {
    TodoModel.findById(_id, (err, todo) => {
      if (err) return err;
      todo.message = message;
      todo.save();
      res.json({ updated: true, data: todo });
    });
  }
});

// @route   DELETE /api/todo/:id
// @desc    Delete a todo
// @access  PRIVATE
Router.delete('/:id/', auth, (req, res) => {
  const { id } = req.params;

  TodoModel.findByIdAndDelete({ _id: id }, (err, _) => {
    if (err) return err;
    res.json({ deleted: true, msg: 'deleted successfully' });
  });
});

module.exports = Router;
