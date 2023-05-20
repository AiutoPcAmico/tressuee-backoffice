import { useContext } from "react";
import { DarkModeContext } from "../theme/DarkModeContext";
import logo from "../img/logo.png";
import { useNavigate } from "react-router-dom";
import "./navbars.css";
import { useSelector } from "react-redux";

function FirstNavbar({ selezionato, setSelezionato }) {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const access = useSelector((state) => state.sessionInfo.sessionToken);

  const click = (bott) => {
    setSelezionato(bott);
    //if(bott=='home')
    navigate(`/${bott}`);
  };

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
        &nbsp;&nbsp;Rimuovere?
      </a>

      <ul className=" navbar-nav ml-auto mt-2 mt-lg-0 upper-navbar">
        {!access && (
          <li className="nav-item ">
            <button
              data-toggle="tooltip"
              data-placement="bottom"
              title="Tooltip on bottom"
              className={
                selezionato === "login"
                  ? "btn btn-outline-info " +
                    (darkMode ? "nav1buttonselectedl" : "nav1buttonselected")
                  : "btn btn-outline-info " +
                    (darkMode ? "nav1buttonl" : "nav1button")
              }
              onClick={() => {
                click("login");
              }}
            >
              <span style={{ fontSize: "11px" }}>Login </span>
              <i className="bi bi-incognito"></i>
            </button>
          </li>
        )}

        {access && (
          <li className="nav-item ">
            <button
              data-toggle="tooltip"
              data-placement="bottom"
              title="Tooltip on bottom"
              className={
                selezionato === "account"
                  ? "btn btn-outline-info " +
                    (darkMode ? "nav1buttonselectedl" : "nav1buttonselected")
                  : "btn btn-outline-info " +
                    (darkMode ? "nav1buttonl" : "nav1button")
              }
              onClick={() => {
                click("account");
              }}
            >
              <span style={{ fontSize: "11px" }}>Account </span>
              <i className="bi bi-person"></i>
            </button>
          </li>
        )}
        {access && (
          <li className="nav-item ml-2">
            <button
              className={
                selezionato === "orders"
                  ? "btn btn-outline-info " +
                    (darkMode ? "nav1buttonselectedl" : "nav1buttonselected")
                  : "btn btn-outline-info " +
                    (darkMode ? "nav1buttonl" : "nav1button")
              }
              onClick={() => {
                click("orders");
              }}
            >
              <span style={{ fontSize: "11px" }}>Ordini </span>

              <i className="bi bi-bag"></i>
            </button>
          </li>
        )}

        <li className="nav-item ml-2">
          <button
            className={
              selezionato === "cart"
                ? "btn btn-outline-info " +
                  (darkMode ? "nav1buttonselectedl" : "nav1buttonselected")
                : "btn btn-outline-info " +
                  (darkMode ? "nav1buttonl" : "nav1button")
            }
            onClick={() => {
              click("cart");
            }}
          >
            <span style={{ fontSize: "11px" }}>Carrello </span>

            <i className="bi bi-cart"></i>
          </button>
        </li>

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
