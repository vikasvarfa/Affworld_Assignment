import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  function setUser(user) {
    setCurrentUser(user);
    if (user) localStorage.setItem("current_user", JSON.stringify(user));
    else localStorage.removeItem("current_user");
  }
  const value = {
    currentUser,
    setUser,
  };
  useEffect(() => {
    const user = localStorage.getItem("current_user");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setIsReady(true);
  }, []);
  return (
    <AuthContext.Provider value={value}>
      {isReady ? children : null}
    </AuthContext.Provider>
  );
};
