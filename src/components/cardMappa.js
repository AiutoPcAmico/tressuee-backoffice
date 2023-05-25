import { DarkModeContext } from "../theme/DarkModeContext";
import { useContext } from "react";

function CardMappa({ posizione, set }) {
  const { darkMode } = useContext(DarkModeContext);

  const cliccata = () => {
    set(posizione);
    document.getElementById("sidebarCollapse").click();
  };

  return (
    <div
    //className="list-group-item list-group-item-action bg-light"
    //style={{
    //color: darkMode ? "testodark" : "testolight",
    //}}
    >
      <div
        className={"card mx-auto " + (darkMode ? "sfondocard1" : "sfondocard3")}
        style={{ maxWidth: "25'px" }}
        onClick={cliccata}
      >
        <div className="card-body">
          <h5 className="card-title">{posizione.title}</h5>
          <p
            className="card-subtitle mb-2 small"
            style={!darkMode ? { color: "#c9de8c" } : { color: "#39813f" }}
          >
            <i className="bi bi-geo-alt"></i>
            {/*" " + posizione.location*/}
            {" " + posizione.address}
          </p>
          <p className="card-text small">{posizione.description}</p>
          <p className="card-text">
            <span
              style={!darkMode ? { color: "#c9de8c" } : { color: "#39813f" }}
            >
              {"Fazzoletti "}
            </span>
            {/*posizione.tissuenumber*/}
            {posizione.tissue_quantity}
          </p>
        </div>
      </div>
    </div>
  );
}

export { CardMappa };
