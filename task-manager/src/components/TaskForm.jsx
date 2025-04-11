import { useState } from "react";
import axios from "../services/api";
import { toast } from "react-toastify";

const TaskForm = ({ onTaskAdded }) => {
  const [task, setTask] = useState({ title: "", description: "" });

  const addTask = async () => {
    try {
      await axios.post("/tasks", task);
      setTask({ title: "", description: "" });
      toast.success("Task added successfully!");
      onTaskAdded();
    } catch (err) {
      toast.error(err.response?.data?.msg || "Error adding task");
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md space-y-4">
      <input
        type="text"
        placeholder="Task Title"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <textarea
        placeholder="Task Description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        rows="3"
        className="w-full px-4 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
      ></textarea>
      <button
        onClick={addTask}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-semibold transition-all"
      >
        Add Task
      </button>
    </div>
  );
};

export default TaskForm;
