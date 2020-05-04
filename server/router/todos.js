const express = require('express');
const Router = express.Router();
const TodoModel = require('../schema/todoSchema');

Router.route('/')
  .get((_, res) => {
    TodoModel.find((err, todos) => {
      if (err) return err;
      res.json(todos);
    });
  })
  .post((req, res) => {
    const newOne = {
      completed: false,
      message: req.body.message,
    };
    const newtodo = new TodoModel(newOne);
    newtodo.save((err, todo) => {
      if (err) return err;
      res.status(201).json(todo);
    });
  })
  .patch((req, res) => {
    const id = req.body._id;

    TodoModel.findById(id, (err, todo) => {
      if (err) return err;
      todo.completed = !todo.completed;
      todo.save();
      res.json({ updated: true, data: todo });
    });
  });

Router.delete('/:id/', (req, res) => {
  const id = req.params.id;

  TodoModel.findByIdAndDelete({ _id: id }, (err, _) => {
    if (err) return err;
    res.json({ deleted: true, msg: 'deleted successfully' });
  });
});

module.exports = Router;
