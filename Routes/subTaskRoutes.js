const express = require('express');
const router = express.Router();
const subTaskController = require('../controllers/subTaskController');
const authMiddleware = require('../midddleware/authMiddleware');

router.post('/', authMiddleware, subTaskController.createSubTask);
router.get('/:task_id', authMiddleware, subTaskController.getAllSubTasks);
router.put('/:id', authMiddleware, subTaskController.updateSubTask);
router.delete('/:id', authMiddleware, subTaskController.deleteSubTask);

module.exports = router;
