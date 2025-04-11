const express = require("express");
const {
  getTasks,
  addTask,
  removeTask,
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", protect, getTasks);
router.post("/", protect, addTask);
router.delete("/:id", protect, removeTask);

module.exports = router;
