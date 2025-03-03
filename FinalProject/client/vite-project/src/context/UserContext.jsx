
import React, { createContext, useState, useContext, useEffect } from "react";

export const UserContext = createContext(null);
export const UserProvider = ({ children }) => {

  const initialUser = {
    username: localStorage.getItem("username") || "",
    token: localStorage.getItem("token") || null,
  };
  const [authedUser, setAuthedUser] = useState(initialUser);
    useEffect(() => {
  
    const storedUsername = localStorage.getItem("username") || "";
    const storedToken = localStorage.getItem("token") || null;
    setAuthedUser({
      username: storedUsername,
      token: storedToken,
    });
  }, []);
  return (
    <UserContext.Provider value={{ authedUser, setAuthedUser }}>
      {children}
    </UserContext.Provider>
  );
};
