const { getTasksByUserId, createTask, deleteTask } = require('../models/taskModel');

const getTasks = async (req, res) => {
  const tasks = await getTasksByUserId(req.user.id);
  res.json(tasks);
};

const addTask = async (req, res) => {
  const { title, description } = req.body;
  await createTask(req.user.id, title, description);
  res.status(201).json({ msg: 'Task created' });
};

const removeTask = async (req, res) => {
  const taskId = req.params.id;
  await deleteTask(taskId, req.user.id);
  res.json({ msg: 'Task deleted' });
};

module.exports = { getTasks, addTask, removeTask };
