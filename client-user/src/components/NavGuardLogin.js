import React from "react";
import { useNavigate } from "react-router-dom";

export default function NavGuardLogin({ children }) {
  const Navigate = useNavigate();
  const authorization = localStorage.getItem("access_token");
  if (!authorization) return <Navigate to={"/agent/login"} />;

  return children;
}
