const express = require('express');
const router = express.Router();
const { getAllTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');

router.get('/api/tasks', getAllTasks);
router.post('/api/tasks', createTask);
router.patch('/api/tasks/:id', updateTask);
router.delete('/api/tasks/:id', deleteTask);

module.exports = router;
