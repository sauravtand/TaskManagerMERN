import { useEffect, useState } from "react";
import axios from "../services/api";
import { toast } from "react-toastify";

const TaskList = ({ refreshKey }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      toast.error(err || "Failed to fetch tasks");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`);
      toast.success("Task deleted");
      fetchTasks();
    } catch (err) {
      toast.error(err || "Failed to delete task");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [refreshKey]); // re-run fetch when refreshKey changes

  return (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white p-4 rounded-md shadow hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {task.title}
                </h3>
                <p className="text-gray-600 mt-1">{task.description}</p>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
