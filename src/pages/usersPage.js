import { retrieveUsers } from "../api/indexTreessueApi";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../theme/DarkModeContext";
import { useWindowDimensions } from "../utils/useWindowDimensions.js";
import CardUser from "../components/cardUser";

const UsersPage = ({ totalOrders }) => {
  const { darkMode } = useContext(DarkModeContext);
  const [error, setError] = useState("Caricamento dei dati in corso!");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { wi } = useWindowDimensions();

  useEffect(() => {
    retrieveUsers().then((element) => {
      if (element.isError) {
        setError(element.messageError);
      } else {
        setError("");
        setUsers(element.data);
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
            Utente
          </h2>

          <p className="col-6" style={{ textAlign: "right" }}>
            <button
              type="button"
              className={
                "btn btn-outline-info " +
                (darkMode ? "nav2button" : "nav2buttonl")
              }
              onClick={() => {
                navigate("/users/new");
              }}
            >
              <i className="bi bi-plus"></i>
              {" nuovo"}
            </button>
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
              {!(users.length > 0) && (
                <p className={!darkMode ? "testolight" : "testodark"}>
                  Non ci sono ancora utenti iscritti
                </p>
              )}
              {wi > 1199 && <CardUser indice={-1} key={-1}></CardUser>}
              {users.length > 0 &&
                users.map((user, i) => {
                  /*const order = orders.find(
                    //(singleProd) => singleProd.id === element.productId
                    (singleProd) => {
                      return singleProd.id_product === element.id_product;
                    }
                  );*/

                  return (
                    <CardUser
                      utente={user}
                      indice={i}
                      //key={element.id}
                      key={user.id_user}
                    ></CardUser>
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

export { UsersPage };
