import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const Authentication = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")) || false
  );

  const authInfo = {
    auth,
    setAuth,
    persist,
    setPersist,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default Authentication;
