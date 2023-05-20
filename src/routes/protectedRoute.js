import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const access = useSelector((state) => state.sessionInfo.sessionToken);
  //console.log(access);
  let location = useLocation();

  if (!access) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  //console.log(children);

  return children;
}

export { ProtectedRoute };
