const mongoose = require('mongoose');
const todoSchema = require('../Schemas/TodoSchema'); 

const Todo = mongoose.model('Todo', todoSchema); 

module.exports = Todo; 