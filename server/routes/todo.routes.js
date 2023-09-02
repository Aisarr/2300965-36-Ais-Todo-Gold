const express = require('express'); 
const router = express.Router();

const todoController = require('../controllers/todo.controller')

router.post('/todos', todoController.createTodo)
router.get('/todos', todoController.getTodo)
router.get('/todos/:id', todoController.getTodoById)
router.put('/todos/:id', todoController.editTodo)
router.delete('/todos/:id', todoController.deleteTodo)

module.exports = router