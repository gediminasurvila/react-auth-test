import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = (p) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {p.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
