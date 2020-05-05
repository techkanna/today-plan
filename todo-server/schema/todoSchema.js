const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const todoSchema = new Schema({
  completed: { type: Boolean, default: false },
  message: {
    type: String,
    required: true,
  },
});

const TodoModel = mongoose.model('todo', todoSchema);

module.exports = TodoModel;
