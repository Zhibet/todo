const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/todo-list-data', { useNewUrlParser: true, useUnifiedTopology: true })


const todoSchema = new mongoose.Schema({
  item: {
    type: String,
  }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;