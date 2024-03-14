const Task = require('../models/Task_Model');
const SubTask = require('../models/SubTask_Model');

exports.createTask = async (req, res) => {
  try {
    const { title, description, due_date } = req.body;
    if (!title || !description || !due_date) {
      return res.status(400).json({ error: 'Title, description, and due date are required' });
    }
    const task = new Task({
      title,
      description,
      due_date,
      user_id: req.user.id
    });
    await task.save();
    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllUserTasks = async (req, res) => {
  try {
    const { priority, due_date, page = 1, limit = 10 } = req.query;
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { due_date: 1 }
    };
    const conditions = { 
      user_id: req.user.id,
      deleted_at: null
    };
    if (priority) {
      conditions.priority = parseInt(priority);
    }
    if (due_date) {
      conditions.due_date = { $lte: new Date(due_date) };
    }
    const tasks = await Task.paginate(conditions, options);
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { due_date, status } = req.body;
    let task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    if (due_date) {
      task.due_date = due_date;
    }
    if (status) {
      task.status = status;
    }
    await task.save();
    res.status(200).json({ message: 'Task updated successfully', task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    task.deleted_at = new Date();
    await task.save();
    await SubTask.updateMany({ task_id: id }, { $set: { deleted_at: new Date() } });
    res.status(200).json({ message: 'Task and associated subtasks deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
