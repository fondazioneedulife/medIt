import React, { createContext, useContext, useState } from "react";
import { RoleEnum } from "../generated/models/RoleEnum";
import { RegisterRequest } from "../../api-types/RegisterRequest";
import { User } from "../generated/models/User";

type RegistrationUser = RegisterRequest & User & { Confirmpassword: string };

interface RegistrationContextProps {
  patient: RegistrationUser;
  setPatient: React.Dispatch<React.SetStateAction<RegistrationUser>>;
}

const PatientRegistrationContenxt = createContext<RegistrationContextProps | undefined>(
  undefined
);

interface RegistrationProviderProps {
  children: React.ReactNode;
}

export const PatientRegistrationProvider: React.FC<RegistrationProviderProps> = ({
  children,
}) => {
  const [patient, setPatient] = useState<RegistrationUser>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    Confirmpassword: "",
    role: RoleEnum.Patient,
    caregiverId: 0,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: "en",
    created_at: new Date(),
    updated_at: new Date(),
  });

  return (
    <PatientRegistrationContenxt.Provider value={{ patient, setPatient }}>
      {children}
    </PatientRegistrationContenxt.Provider>
  );
};

export const useRegistration = (): RegistrationContextProps => {
  const context = useContext(PatientRegistrationContenxt);
  if (!context) {
    throw new Error(
      "useRegistration must be used within a PatientRegistrationProvider"
    );
  }
  return context;
};
