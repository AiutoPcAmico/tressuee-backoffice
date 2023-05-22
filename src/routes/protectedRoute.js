import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const access = useSelector((state) => state.sessionInfo.sessionToken);
  let location = useLocation();

  if (!access) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export { ProtectedRoute };
