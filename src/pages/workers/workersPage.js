import { retrieveWorkers } from "../../api/indexTreessueApi";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../theme/DarkModeContext";
import { useWindowDimensions } from "../../utils/useWindowDimensions.js";
import { CardWorker } from "../../components/cardWorker";
import { useSelector } from "react-redux";

const WorkersPage = ({ totalOrders }) => {
  const { darkMode } = useContext(DarkModeContext);
  const [error, setError] = useState("");
  const [workers, setWorkers] = useState([]);
  const navigate = useNavigate();
  const { wi } = useWindowDimensions();

  const roleUser = useSelector((state) => state.sessionInfo.user.role);
  var roleok;

  //l'abbiamo fatto solo qui tanto negli altri casi se vedi puoi anche modificare/creare
  if (roleUser === "admin") roleok = true;
  else roleok = false;

  useEffect(() => {
    retrieveWorkers().then((element) => {
      if (element.isError) {
        setError(element.messageError);
      } else {
        setError("");
        setWorkers(element.data);
      }
    });
  }, []);

  return (
    <div>
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
            Dipendenti
          </h2>

          <p className="col-6" style={{ textAlign: "right" }}>
            {roleok && (
              <button
                type="button"
                className={
                  "btn btn-outline-info " +
                  (darkMode ? "nav2button" : "nav2buttonl")
                }
                onClick={() => {
                  navigate("/workers/new");
                }}
              >
                <i className="bi bi-plus"></i>
                {" Aggiungi"}
              </button>
            )}
          </p>
        </div>
        <div className=" text flex-column">
          <div className="row flex-wrap align-items-center pb-3">
            <div
              className={
                "col-12 text-center pt-3  pb-3 " +
                (darkMode ? "sfondo3" : "sfondo1")
              }
            >
              {!(workers.length > 0) && (
                <p className={!darkMode ? "testolight" : "testodark"}>
                  Non ci sono ancora dipendenti
                </p>
              )}
              {wi > 1199 && (
                <CardWorker
                  indice={-1}
                  key={-1}
                  userCanModify={!roleok}
                ></CardWorker>
              )}
              {workers.length > 0 &&
                workers.map((dipendente, i) => {
                  /*const order = orders.find(
                    //(singleProd) => singleProd.id === element.productId
                    (singleProd) => {
                      return singleProd.id_product === element.id_product;
                    }
                  );*/

                  return (
                    <CardWorker
                      worker={dipendente}
                      indice={i}
                      //key={element.id}
                      key={dipendente.id_worker}
                      userCanModify={!roleok}
                    ></CardWorker>
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

export { WorkersPage };
