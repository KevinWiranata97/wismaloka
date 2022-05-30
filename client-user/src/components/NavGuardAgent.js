import { Navigate } from "react-router";

import React from "react";

export default function NavGuardAgent({ children }) {
  const authorization = localStorage.getItem("access_token");
  const authentication = localStorage.getItem("role");

  if (authentication !== "Agen") return <Navigate to={"/agent/login"} />;

  return children;
}
