const db = require('./db');

const getTasksByUserId = async (userId) => {
  const [rows] = await db.execute('SELECT * FROM tasks WHERE user_id = ?', [userId]);
  return rows;
};

const createTask = async (userId, title, description) => {
  await db.execute('INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)', [userId, title, description]);
};

const deleteTask = async (taskId, userId) => {
  await db.execute('DELETE FROM tasks WHERE id = ? AND user_id = ?', [taskId, userId]);
};

module.exports = { getTasksByUserId, createTask, deleteTask };
