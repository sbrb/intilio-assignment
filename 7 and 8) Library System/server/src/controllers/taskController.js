const Task = require('../models/task');

// Get all tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        return res.status(200).json({ status: true, data: tasks });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: false, error: err.message });
    }
};

// Create a new task
const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTask = new Task({ title, description });
        await newTask.save();
        return res.status(200).json({ status: true, data: newTask });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: false, error: err.message });
    }
};

// Update task status
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ status: false, message: 'Task not found' });
        }
        return res.status(200).json({ status: true, data: updatedTask });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: false, error: err.message });
    }
};

// Delete task
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ status: false, message: 'Task not found' });
        }
        return res.status(200).json({ status: true, message: 'Task deleted successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: false, error: err.message });
    }
};


module.exports = { getAllTasks, createTask, updateTask, deleteTask };