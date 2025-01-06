const express = require('express');
const router = express.Router();
const taskRoutes = require('./taskRoutes');
const authRoutes = require('./authRoutes');
const authMiddleware = require('../middlewares/authMiddleware');

router.use('/tasks', authMiddleware, taskRoutes); 
router.use('/auth', authMiddleware, authRoutes);  

module.exports = router;
