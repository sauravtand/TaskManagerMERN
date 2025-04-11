const db = require("./db");

const createUser = async (username, hashedPassword) => {
  await db.execute("INSERT INTO users (username, password) VALUES (?, ?)", [
    username,
    hashedPassword,
  ]);
};

const findUserByUsername = async (username) => {
  const [rows] = await db.execute("SELECT * FROM users WHERE username = ?", [
    username,
  ]);
  return rows[0];
};

module.exports = { createUser, findUserByUsername };
