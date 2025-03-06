import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../../generated/models/User";
import Cookies from "js-cookie";

interface LoginContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const LoginContext = createContext<LoginContextProps | undefined>(undefined);

interface LoginProviderProps {
  children: React.ReactNode;
}

export const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = Cookies.get("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      Cookies.set("user", JSON.stringify(user), {
        secure: true,
        sameSite: "Strict",
      });
    } else {
      Cookies.remove("user");
    }
  }, [user]);

  return (
    <LoginContext.Provider value={{ user, setUser }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = (): LoginContextProps => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
};
