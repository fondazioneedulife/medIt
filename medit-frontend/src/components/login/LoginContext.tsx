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

    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      parsedUser.profileImage = localStorage.getItem("profileImage") || "";
      return parsedUser;
    }

    return null;
  });

  useEffect(() => {
    if (user) {
      const { profileImage, ...userWithoutImage } = user;

      Cookies.set("user", JSON.stringify(userWithoutImage), {
        secure: true,
        sameSite: "Strict",
        expires: 365 * 100,
      });

      if (profileImage) {
        localStorage.setItem("profileImage", profileImage);
      }
    } else {
      localStorage.removeItem("profileImage");
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
