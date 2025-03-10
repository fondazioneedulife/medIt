import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useLogin } from "../../src/components/login/LoginContext"; // Aggiorna con il tuo percorso

const AuthGuard: React.FC = () => {
  const { user } = useLogin();

  // if user is not autenticated
  if (!user) {
    return <Navigate to="/login/choose" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
