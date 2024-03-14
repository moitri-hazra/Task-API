const SubTask = require('../models/SubTask_Model');
const Task = require('../models/Task_Model');


exports.createSubTask = async (req, res) => {
  try {
    const { task_id } = req.body;
    if (!task_id) {
      return res.status(400).json({ error: 'Task ID is required' });
    }
    const subTask = new SubTask({
      task_id,
      status: 0
    });
    await subTask.save();
    res.status(201).json({ message: 'Subtask created successfully', subTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllSubTasks = async (req, res) => {
  try {
    const { task_id } = req.params;
    const task = await Task.findOne({ _id: task_id, deleted_at: null });

    // Check if task exists and is not soft-deleted
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Retrieve subtasks for the task
    const subTasks = await SubTask.find({ task_id, deleted_at: null });
    res.status(200).json(subTasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.updateSubTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    let subTask = await SubTask.findById(id);
    if (!subTask) {
      return res.status(404).json({ error: 'Subtask not found' });
    }
    if (status !== undefined) {
      subTask.status = status;
    }
    await subTask.save();
    res.status(200).json({ message: 'Subtask updated successfully', subTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteSubTask = async (req, res) => {
  try {
    const { id } = req.params;
    const subTask = await SubTask.findById(id);
    if (!subTask) {
      return res.status(404).json({ error: 'Subtask not found' });
    }
    subTask.deleted_at = new Date();
    await subTask.save();
    res.status(200).json({ message: 'Subtask deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
