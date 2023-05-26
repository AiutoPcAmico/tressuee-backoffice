import "../pages.css";
import { DarkModeContext } from "../../theme/DarkModeContext";
import { useContext, useEffect, useState } from "react";
import { retrieveAllTowers } from "../../api/indexTreessueApi";
import CardTower from "../../components/cardTower";
import { useWindowDimensions } from "../../utils/useWindowDimensions.js";
import { useNavigate } from "react-router-dom";
import FilterTower from "../../components/filterTower";
import { filterArray, sortArray } from "../../utils/filterAndSort";

const TowersPage = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [towers, setTowers] = useState([]); //lista tutti prodotti
  const [towerSorted, setTowerSorted] = useState([]);
  const [error, setError] = useState("Caricamento dei dati in corso!");
  const { wi } = useWindowDimensions();
  const navigate = useNavigate();

  const [filtri, setFiltri] = useState({
    fcodice: null,
    finfo: null,
    findirizzo: null,
    fdesc: null,
    fattiva: "tutte",
  });

  useEffect(() => {
    let nuovoarray = [];
    //filter
    //filter da rivedere
    //non controlliamo mai torre.is_public o come si chiama
    if (filtri.fattiva === "tutte") {
      nuovoarray = JSON.parse(JSON.stringify(towers));
    }

    if (filtri.fattiva === "pubbliche") {
      nuovoarray = filterArray(
        JSON.parse(JSON.stringify(towers)),
        filtri,
        "fattiva",
        "pubbliche",
        "is_public",
        true
      );
    }
    if (filtri.fattiva === "private") {
      nuovoarray = filterArray(
        JSON.parse(JSON.stringify(towers)),
        filtri,
        "fattiva",
        "private",
        "is_public",
        false
      );
    }
    if (filtri.fdesc) {
      nuovoarray = sortArray(nuovoarray, filtri, "fdesc", "description");
    }

    if (filtri.fcodice) {
      nuovoarray = sortArray(nuovoarray, filtri, "fcodice", "id_tower");
    }

    if (filtri.findirizzo) {
      nuovoarray = sortArray(nuovoarray, filtri, "findirizzo", "address");
    }

    if (filtri.finfo) {
      nuovoarray = sortArray(nuovoarray, filtri, "finfo", "title");
    }

    setTowerSorted(nuovoarray);
  }, [filtri, towers]);

  useEffect(() => {
    retrieveAllTowers().then((element) => {
      if (element.isError) {
        setError(element.messageError);
      } else {
        setError("");
        setTowers(element.data);
        setTowerSorted(element.data);
      }
    });
  }, []);

  //carello           se non fattibile una che fa tutto basterebbe un push?
  //login -> map su store carrello ->chiamata aggiunge
  //poi aggiorna store  get carrello

  return (
    <div>
      {!error && (
        <div
          className={"mx-auto mt-2 p-2 "}
          style={{ width: "95%", textAlign: "center" }}
        >
          {<FilterTower filtri={filtri} setFiltri={setFiltri}></FilterTower>}
        </div>
      )}

      <div className="detailsPage">
        {error && (
          <div style={{ textAlign: "left", width: "100%" }}>
            <p className="alert alert-danger mt-3">
              <b>Attenzione!</b>
              <br></br>
              <span>{error}</span>
            </p>
          </div>
        )}
        <div className="row">
          <h2 className={"col-6 " + (darkMode ? "testolight" : "testodark")}>
            Torri
          </h2>

          <p className="col-6" style={{ textAlign: "right" }}>
            <button
              type="button"
              className={
                "btn btn-outline-info " +
                (darkMode ? "nav2button" : "nav2buttonl")
              }
              onClick={() => {
                navigate("/towers/map");
              }}
            >
              <i className="bi bi-geo-alt"></i>
              {" Visualizza Mappa"}
            </button>

            <button
              type="button"
              style={{ marginLeft: "10px" }}
              className={
                "btn btn-outline-info " +
                (darkMode ? "nav2button" : "nav2buttonl")
              }
              onClick={() => {
                navigate("/towers/new");
              }}
            >
              <i className="bi bi-plus"></i>
              {" Aggiungi"}
            </button>
          </p>
        </div>
        <div className=" text flex-column" style={{}}>
          <div className="row flex-wrap align-items-center pb-3">
            <div
              className={
                "col-12 text-center pt-3 pb-3 " +
                (darkMode ? "sfondo3" : "sfondo1")
              }
            >
              {!(towerSorted.length > 0) && (
                <p className={!darkMode ? "testolight" : "testodark"}>
                  Non ci sono torri
                </p>
              )}
              {wi > 1199 && <CardTower indice={-1} key={-1}></CardTower>}
              {towerSorted.length > 0 &&
                towerSorted.map((tower, i) => {
                  /*const order = orders.find(
                    //(singleProd) => singleProd.id === element.productId
                    (singleProd) => {
                      return singleProd.id_product === element.id_product;
                    }
                  );*/

                  return (
                    <CardTower
                      torre={tower}
                      indice={i}
                      //key={element.id}
                      key={tower.id_tower}
                    ></CardTower>
                  );
                })}
              {/*!orders.length > 0 && <p>Non hai ancora ordinato nulla</p>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { TowersPage };
