import { NavigationButton } from "../components/navigationButton";
import "./navbars.css";

function UnderNavBar({ selezionato, setSelezionato }) {

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
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0 header_center">
          <NavigationButton
            buttonText={"Torri"}
            goToPage={"/towers"}
            selezionato={selezionato}
            setSelezionato={setSelezionato}
            ruoli={["ufficio", "admin", "torrista"]}
          />

          <NavigationButton
            buttonText={"Utenti"}
            goToPage={"/users"}
            selezionato={selezionato}
            setSelezionato={setSelezionato}
            ruoli={["ufficio", "admin"]}
          />

          <NavigationButton
            buttonText={"Magazzino"}
            goToPage={"/store"}
            selezionato={selezionato}
            setSelezionato={setSelezionato}
            ruoli={["ufficio", "admin", "magazzino"]}
          />

          <NavigationButton
            buttonText={"Ordini"}
            goToPage={"/orders"}
            selezionato={selezionato}
            setSelezionato={setSelezionato}
            ruoli={["ufficio", "admin", "magazzino"]}
          />

          <NavigationButton
            buttonText={"Dipendenti"}
            goToPage={"/workers"}
            selezionato={selezionato}
            setSelezionato={setSelezionato}
            ruoli={["ufficio", "admin"]}
          />
        </ul>
      </div>
    </nav>
  );
}

export { UnderNavBar };
