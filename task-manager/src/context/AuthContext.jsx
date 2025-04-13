import { createContext, useContext, useState, useEffect } from "react";
import axios from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const response = await axios.post(
      "/login",
      { username: email, password },
      { withCredentials: true }
    );
    localStorage.setItem("token", response.data.token); // Assuming token is in response.data.token
    setUser({ username: email });
  };
  
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUser({}); // Fake set; ideally verify token with backend
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
