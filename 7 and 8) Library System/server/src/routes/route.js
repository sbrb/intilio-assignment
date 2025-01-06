const express = require('express');
const router = express.Router()
const Task =require('../models/task');

// get all task
router.get('/',async (req,res)=>{
    try {
        const tasks = await Task.find()
        return res.status(200).json({status:true,data:tasks})
    }
  catch (err) { 
       console.log(err)
      return res.status(500).json({ status: false, error: err.message })
  }
})

// create new task
router.post('/', async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTask = new Task({ title, description });
        await newTask.save();
        return res.status(200).json({ status: true, data: newTask })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ status: false, error: err.message })
    }
})

// update new task
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {status} = req.body;
        const updatedTask = await Task.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ status: false, message: 'Task not found' })
        }
        return res.status(200).json({ status: true, data: updatedTask })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ status: false, error: err.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ status: false, message: 'Task not found' })
        }
        return res.status(200).json({ status: true, message: 'Task deleted successfully' })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ status: false, error: err.message })
    }
})

module.exports = router;