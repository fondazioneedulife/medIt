import React, { createContext, useContext, useState } from "react";
import { RoleEnum } from "../../generated/models/RoleEnum";
import { RegisterRequest } from "../../generated/models/RegisterRequest";

interface RegistrationContextProps {
  user: RegisterRequest & { Confirmpassword: string };
  setUser: React.Dispatch<
    React.SetStateAction<RegisterRequest & { Confirmpassword: string }>
  >;
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
  const [user, setUser] = useState<
    RegisterRequest & { Confirmpassword: string }
  >({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    Confirmpassword: "",
    role: RoleEnum.Patient,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: "en",
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
