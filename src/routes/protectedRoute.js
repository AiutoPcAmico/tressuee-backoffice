import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getUserRole } from "../utils/roleUtils";
import { destroySession } from "../stores/sessionInfo";

function ProtectedRoute({ children, ruoli }) {
  var roleUser = null;
  const access = useSelector((state) => state.sessionInfo.sessionToken);
  const expireJWT = useSelector((state) => state.sessionInfo.sessionExpire);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let location = useLocation();
  var positionRole = null;
  let roleok = null;

  var expireDate = new Date(0);
  expireDate.setUTCSeconds(expireJWT);
  //console.log(expireDate);
  const nowDate = new Date();
  //console.log(nowDate);

  var expiredToken = false;
  if (nowDate.getTime() > expireDate.getTime()) {
    expiredToken = true;
  } else {
    expiredToken = false;
  }

  if (expiredToken) {
    dispatch(destroySession());
    return (
      <div
        className="alert alert-danger mx-auto mt-4"
        role="alert"
        style={{ width: "300px", textAlign: "center" }}
      >
        <b>Attenzione!</b>
        <p>
          La sessione è scaduta oppure login non effettuato.<br></br>
          <br></br>E' pregato di rieffettuare l'accesso!
          <button
            type="button"
            className="btn btn-success"
            style={{ marginTop: "10px" }}
            onClick={() => navigate("/login")}
          >
            Vai al Login
          </button>
        </p>
      </div>
    );
  }

  if (!access) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (access) {
    roleUser = getUserRole();
    positionRole = ruoli.indexOf(roleUser);
  } //sost?

  if (positionRole !== -1 && roleUser) roleok = true;
  else roleok = false;

  if (!roleok) {
    return <Navigate to="/error403" state={{ from: location }} replace />;
  }
  return children;
}

export { ProtectedRoute };
