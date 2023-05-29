import { useContext } from "react";
import { DarkModeContext } from "../theme/DarkModeContext";
import logo from "../img/logo.png";
import { useNavigate } from "react-router-dom";
import "./navbars.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
//import { destroySession } from "../stores/sessionInfo";


function FirstNavbar() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const access = useSelector((state) => state.sessionInfo.sessionToken);


  async function doLogout() {
    //cosi funziona 
    let {destroySession} = await import("../stores/sessionInfo");

    dispatch(destroySession());
    navigate("/login");

  }

  return (
    <nav
      className={
        "navbar navbar-light sticky-top " +
        (darkMode ? "upper-navbar-dark" : "upper-navbar-light")
      }
    >
      <a
        className={"navbar-brand " + (darkMode ? "testolight" : "testodark")}
        href="/"
      >
        <img
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt=""
        />
        &nbsp;&nbsp;Treessue
      </a>

      <ul className=" navbar-nav ml-auto mt-2 mt-lg-0 upper-navbar">
        {access && (
          <li className="nav-item ">
            <button
              data-toggle="tooltip"
              data-placement="bottom"
              title="Tooltip on bottom"
              className={
           "btn btn-outline-info " +
                  (darkMode ? "nav1buttonl" : "nav1button")
              }
              onClick={() => {
                doLogout()
              }}
            >
              <span style={{ fontSize: "11px" }}>Logout </span>
              <i class="bi bi-door-open"></i>            </button>
          </li>
        )}

        <li className="nav-item ml-2">
          <button
            className=" btn btn-outline-info nav2button"
            onClick={() => {
              toggleDarkMode();
            }}
          >
            <span style={{ fontSize: "11px" }}>Tema </span>

            <i
              className={!darkMode ? "bi-brightness-high " : "bi-moon-fill"}
            ></i>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export { FirstNavbar };
