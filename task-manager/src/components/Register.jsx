import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/register", form);
      toast.success("Registered successfully!");
    } catch (err) {
      toast.error("Error: " + (err.response?.data?.msg || err.message));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
          >
            Register
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm">Already have an account?</p>
          <button
            onClick={() => navigate("/")}
            className="text-green-600 hover:underline font-medium"
          >
            Login
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
