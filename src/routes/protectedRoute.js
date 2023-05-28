import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getUserRole } from "../utils/roleUtils";

function ProtectedRoute({ children, ruoli }) {
  var roleUser = null;
  const access = useSelector((state) => state.sessionInfo.sessionToken);
  let location = useLocation();
  var positionRole = null;
  let roleok=null

  if (!access) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (access) {
    roleUser = getUserRole();
    positionRole= ruoli.indexOf(roleUser);
  } //sost?

 
  if (positionRole !== -1 && roleUser) roleok = true;
  else roleok = false;

  if (!roleok) {
    return <Navigate to="/error403" state={{ from: location }} replace />;
  }
  return children;
}

export { ProtectedRoute };
