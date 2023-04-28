import { createContext, useReducer } from "react";
import { AUTH_KEY } from "../api/axios";

const initialValue = localStorage.getItem(AUTH_KEY);

const reducer = (state, action) => {
  switch (action.type) {
    case "GET": {
      const token = localStorage.getItem(AUTH_KEY);
      return token;
    }
    case "SET": {
      localStorage.setItem(AUTH_KEY, action.payload);
      return action.payload;
    }
    case "DELETE": {
      localStorage.setItem(AUTH_KEY, "");
      return "";
    }
    default:
      return state;
  }
};

const AuthContext = createContext({});

export const AuthProvider = (p) => {
  const [token, dispatch] = useReducer(reducer, initialValue);

  return (
    <AuthContext.Provider value={{ token, dispatch }}>
      {p.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
