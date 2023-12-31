import { createContext, useEffect, useState } from "react";
import { makeRequest } from "../axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const storedUser = localStorage.getItem("user");
  const initialUser = storedUser ? JSON.parse(storedUser) : null;
  const [currentUser, setCurrentUser] = useState(initialUser);

  const login = async (inputs) => {
    try {
      const res = await makeRequest.post("auth/login", inputs);

      if (res.status === 200) {
        const { token, userId } = res.data;
        localStorage.setItem("jwttoken", token);
        localStorage.setItem("userid", userId);
        setCurrentUser(res.data);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const register = async (inputs) => {
    try {
      const res = await makeRequest.post("auth/register", inputs);
      if (res.status === 201) {
        const { token, userId } = res.data;
        localStorage.setItem("jwttoken", token);
        localStorage.setItem("userid", userId);
        setCurrentUser(res.data);
      }
      
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    setCurrentUser(null);
  };

  useEffect(() => {
    if (currentUser && typeof currentUser === "object") {
      localStorage.setItem("user", JSON.stringify(currentUser));
    }
  }, [currentUser]);
  const contextValue = {
    currentUser,
    login,
    register,
    logout,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};