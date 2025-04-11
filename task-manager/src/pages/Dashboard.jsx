import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useState } from "react";

const Dashboard = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const { user } = useAuth();

  if (!user) return <Navigate to="/" />;

  const handleTaskAdded = () => {
    setRefreshKey((prev) => prev + 1); // triggers re-fetch
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-200 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Welcome, {user.username}!
        </h2>

        {/* Task Form */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Add New Task
          </h3>
          <TaskForm onTaskAdded={handleTaskAdded} />
        </div>

        {/* Task List */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Your Tasks
          </h3>
          <TaskList refreshKey={refreshKey} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
