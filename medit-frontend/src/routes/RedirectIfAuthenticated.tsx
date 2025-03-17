import { Navigate } from "react-router-dom";
import { useLogin } from "../components/login/LoginContext";
import { JSX } from "react";

interface RedirectIfAuthenticatedProps {
  children: JSX.Element;
}

const RedirectIfAuthenticated: React.FC<RedirectIfAuthenticatedProps> = ({
  children,
}) => {
  const { user } = useLogin();

  if (user) {
    return <Navigate to="/home" />;
  }

  return children;
};

export default RedirectIfAuthenticated;
