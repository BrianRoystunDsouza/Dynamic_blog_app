import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
    );
    
    const login = async (inputs) => {
      console.log(process.env.REACT_APP_BACKEND_URL);
      const res = await axios.post(process.env.REACT_APP_BACKEND_URL + "api/auth/login", inputs);
      setCurrentUser(res.data);
      localStorage.setItem("Token",res.data.token);
    };
    
    const logout = async (inputs) => {
      await axios.post(process.env.REACT_APP_BACKEND_URL + "api/auth/logout");
      localStorage.removeItem('token');
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
