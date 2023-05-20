import { useEffect, useState } from "react";
import { LeafletMap } from "../components/LeafletMap";
import { CardMappa } from "../components/cardMappa";
import { DarkModeContext } from "../theme/DarkModeContext";
import { useContext } from "react";
import { retrievePublicTowers } from "../api/indexTreessueApi";

function TowersMap() {
  const [hide, setHide] = useState("hidden");
  const [selected, setSelected] = useState({ latitude: 0.0, longitude: 0.0 });
  const [positions, setPositions] = useState([]);
  const [error, setError] = useState("Caricamento dei dati in corso");
  //console.log(selected);
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    retrievePublicTowers().then((element) => {
      //console.log(element);
      if (element.isError) {
        setError(element.messageError);
      } else {
        setError("");
        console.log(element.data);
        setPositions(element.data);
      }
    });
  }, []);

  function dismissoverlay() {
    //nascondi side e overlay
    var element = document.getElementById("sidebar");
    element.classList.remove("active");

    var element1 = document.getElementById("sidebarCollapse");
    element1.classList.remove("active");

    var element3 = document.getElementById("mapwrapper");
    element3.classList.remove("wrapper-map");

    var element2 = document.getElementById("overlay");
    element2.classList.remove("active");
    setHide("hidden");
  }
  function display() {
    //hide === "hidden"
    if (hide === "hidden") {
      //vedi side overlay
      var element = document.getElementById("sidebar");
      element.classList.add("active");

      var element1 = document.getElementById("sidebarCollapse");
      element1.classList.add("active");

      var element3 = document.getElementById("mapwrapper");
      element3.classList.add("wrapper-map");

      var element2 = document.getElementById("overlay");
      element2.classList.add("active");
      setHide("visible");

      //element.classList.toggle("in");
    } else {
      dismissoverlay();
    }
  }

  return (
    <div>
      <div id="mapwrapper">
        {error !== "" && (
          <div
            className="alert alert-danger mx-auto mt-4"
            role="alert"
            style={{ width: "300px", textAlign: "center" }}
          >
            <b>Attenzione!</b>
            <p>{error}</p>
          </div>
        )}

        {/*<!-- Sidebar -->*/}
        <nav id="sidebar" style={{ visibility: hide }} className="">
          <div className={"sidebar-header "}>
            <h3>{"    Le nostre torri"}</h3>
          </div>
          <div
            className="bg-light border-right min-vh-100"
            id="sidebar-wrapper"
          >
            <div
              className="list-group list-group-flush overflow-auto"
              style={{ height: "78.3vh", backgroundColor: "#9ba4b5" }}
            >
              {positions.length > 0 &&
                positions.map((singlePosition) => {
                  return (
                    <CardMappa
                      posizione={singlePosition}
                      set={setSelected}
                    ></CardMappa>
                  );
                })}
            </div>
          </div>
        </nav>

        {/*<!-- Dark Overlay element --> se lo metto dopo non copre content*/}
        <div className="overlay" id="overlay" onClick={dismissoverlay}></div>

        {/*<!-- Page Content -->*/}
        <div id="content" style={{ zIndex: 9999 }}>
          <div className="container-fluid">
            <button
              type="button"
              id="sidebarCollapse"
              className={"btn btn-info "}
              onClick={display}
            >
              <div
                style={darkMode ? { color: "#212a3e" } : { color: "#f1f6f9" }}
              >
                {hide === "hidden" ? ">" : "x"}
              </div>
            </button>
          </div>
          {positions.length > 0 && (
            <span>
              {/*qui va tutta la pagina in rendering!*/}
              <div style={{ height: "3em" }}></div>
              <LeafletMap
                positions={positions}
                isFixed={hide}
                positionSelected={selected}
              ></LeafletMap>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export { TowersMap };
