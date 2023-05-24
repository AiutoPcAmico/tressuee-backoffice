import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children, ruoli }) {
  console.log(ruoli);
  const roleUser = useSelector((state) => state.sessionInfo.user.role);

  const positionRole = ruoli.indexOf(roleUser); //sost?

  let roleok;
  console.log({ positionRole });

  if (positionRole !== -1) roleok = true;
  else roleok = false;

  const access = useSelector((state) => state.sessionInfo.sessionToken);
  let location = useLocation();

  if (!access) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!roleok) {
    return <Navigate to="/error403" state={{ from: location }} replace />;
  }
  return children;
}

export { ProtectedRoute };
