import React, { createContext, useContext, useState } from "react";
import { RoleEnum } from "../../generated/models/RoleEnum";
import { RegisterRequest } from "../../../api-types/RegisterRequest";
import { User } from "../../generated/models/User";

type RegistrationUser = RegisterRequest & User & { Confirmpassword: string };

interface RegistrationContextProps {
  user: RegistrationUser;
  setUser: React.Dispatch<React.SetStateAction<RegistrationUser>>;
}

const RegistrationContext = createContext<RegistrationContextProps | undefined>(
  undefined
);

interface RegistrationProviderProps {
  children: React.ReactNode;
}

export const RegistrationProvider: React.FC<RegistrationProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<RegistrationUser>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    Confirmpassword: "",
    role: RoleEnum.Patient,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: "en",
    created_at: new Date(),
    updated_at: new Date(),
  });

  return (
    <RegistrationContext.Provider value={{ user, setUser }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = (): RegistrationContextProps => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error(
      "useRegistration must be used within a RegistrationProvider"
    );
  }
  return context;
};
