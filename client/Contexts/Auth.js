import React, { createContext, useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [admin, setAdmin] = useState({});
  const [conversation, setConversation] = useState({});
  const [person, setperson] = useState({});
  const [activeUsers, setActiveUsers] = useState([]);
  const [users, setUsers] = useState();
  const [mainNav, setMainNav] = useState(false);
  const [newMessageFlag, setnewMessageFlag] = useState(false);
  const socket = useRef();
  const [profiles, setProfiles] = useState();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("AandataUser"));
    if (items) {
      setUser(items);
    }
  }, []);

  useEffect(() => {
    socket.current = io("http://54.83.109.185:4000");
  }, []);

  const userLogin = (user) => {
    setUser(user);
    localStorage.setItem("AandataUser", JSON.stringify(user));
    toast.success("Login Successful");
  };

  const adminLogin = (admin) => {
    setAdmin(admin);
    localStorage.setItem("admin", JSON.stringify(admin));
    toast.success("Login Successful");
  };

  const userLogout = () => {
    setUser({});
    localStorage.removeItem("AandataUser");
  };

  const adminLogout = () => {
    setAdmin({});
    localStorage.removeItem("admin");
    toast.success("Logout Successful");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userLogin,
        userLogout,
        admin,
        adminLogin,
        adminLogout,
        socket,
        conversation,
        setConversation,
        person,
        profiles,
        mainNav,
        setMainNav,
        setProfiles,
        setperson,
        users,
        setUsers,
        activeUsers,
        setActiveUsers,
        newMessageFlag,
        setnewMessageFlag,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
