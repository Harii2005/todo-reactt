const express = require('express');
const router = express.Router();
const Todo = require('../Models/TodoModel'); 

// Get all todos for a user
router.get('/', async (req, res) => {
  try {
    // req.user contains the authenticated user's ID from the middleware
    const todos = await Todo.find({ user: req.user.id });
    res.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a new todo
router.post('/', async (req, res) => {
  try {
    const newTodo = new Todo({
      task: req.body.task,
      isDone: false,
      user: req.user.id // Add the user ID from the middleware
    });
    
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    console.error('Error adding todo:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a todo (mark as done/undone or edit task)
router.put('/:id', async (req, res) => {
    try {
      const todoId = req.params.id;
      
      // Find todo and verify ownership
      const todo = await Todo.findById(todoId);
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      
      // Verify the todo belongs to the authenticated user
      if (todo.user.toString() !== req.user.id) {
        return res.status(403).json({ error: 'Not authorized to update this todo' });
      }
      
      // Update the todo
      const updatedTodo = await Todo.findByIdAndUpdate(
        todoId,
        { 
          task: req.body.task || todo.task,
          isDone: req.body.isDone !== undefined ? req.body.isDone : todo.isDone 
        },
        { new: true } // Return the updated document
      );
      
      res.json(updatedTodo);
    } catch (error) {
      console.error('Error updating todo:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // Delete a todo
router.delete('/:id', async (req, res) => {
    try {
      const todoId = req.params.id;
      
      // Find todo and verify ownership
      const todo = await Todo.findById(todoId);
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      
      // Verify the todo belongs to the authenticated user
      if (todo.user.toString() !== req.user.id) {
        return res.status(403).json({ error: 'Not authorized to delete this todo' });
      }
      
      // Delete the todo
      await Todo.findByIdAndDelete(todoId);
      
      res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
      console.error('Error deleting todo:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // Mark all todos as done
router.put('/markall/done', async (req, res) => {
    try {
      // Update all todos for the authenticated user
      const result = await Todo.updateMany(
        { user: req.user.id },
        { $set: { isDone: true } }
      );
      
      res.json({ 
        message: 'All todos marked as done',
        count: result.modifiedCount 
      });
    } catch (error) {
      console.error('Error updating todos:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
// Get todos by status (done/undone)
router.get('/status/:isDone', async (req, res) => {
    try {
      const isDone = req.params.isDone === 'true';
      
      const todos = await Todo.find({ 
        user: req.user.id,
        isDone: isDone
      });
      
      res.json(todos);
    } catch (error) {
      console.error('Error fetching filtered todos:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });


module.exports = router;