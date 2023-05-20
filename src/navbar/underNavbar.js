import { NavigationButton } from "../components/navigationButton";
import { SearchBar } from "../components/searchBar";
import logo from "../img/logo.png";

import "./navbars.css";
import { useContext } from "react";
import { DarkModeContext } from "../theme/DarkModeContext";

function UnderNavBar({ selezionato, setSelezionato }) {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);


  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-lightgreen">
      <button
        className="navbar-toggler bg-light"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
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

        <ul className="navbar-nav ml-auto mt-2 mt-lg-0 header_center">
          <NavigationButton
            buttonText={"Torri"}
            goToPage={"/towers"}
            selezionato={selezionato}
            setSelezionato={setSelezionato}
          />

          <NavigationButton
            buttonText={"Utenti"}
            goToPage={"/users"}
            selezionato={selezionato}
            setSelezionato={setSelezionato}
          />

          <NavigationButton
            buttonText={"Magazzino"}
            goToPage={"/store"}
            selezionato={selezionato}
            setSelezionato={setSelezionato}
          />

          <NavigationButton
            buttonText={"Ordini"}
            goToPage={"/orders"}
            selezionato={selezionato}
            setSelezionato={setSelezionato}
          />

          <NavigationButton
            buttonText={"Dipendenti"}
            goToPage={"/workers"}
            selezionato={selezionato}
            setSelezionato={setSelezionato}
          />
          <li className="nav-item ml-2">
          <button
            className=" btn btn-outline-info nav1buttonl"
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
      </div>
    </nav>
  );
}

export { UnderNavBar };
