import { Route, Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
}

function PrivateRoute({ children }: PrivateRouteProps|any): JSX.Element {
  const token = localStorage.getItem("AUTH_TOKEN");
  console.log("token =>? ",token)
  return token ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
}

export default PrivateRoute;
