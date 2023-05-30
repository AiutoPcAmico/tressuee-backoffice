import { DarkModeContext } from "../theme/DarkModeContext";
import { useContext } from "react";
import { InnerCard } from "./innerCard";
import { useWindowDimensions } from "../utils/useWindowDimensions";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../utils/roleUtils";
import { convertToDateIT } from "../utils/generalFunctions";

function CardOrders({ order, indice }) {
  const { darkMode } = useContext(DarkModeContext);
  const { wi } = useWindowDimensions();
  const navigate = useNavigate();

  function accolloOrdine() {
    //chiamata api per prendere l'ordine come proprio
  }

  return (
    <div>
      <div
        className={"card mb-1 " + (darkMode ? "sfondocard1" : "sfondocard3")}
        style={{ width: "100%" }}
      >
        <div className="d-flex flex-wrap justify-content-center row m-0">
          <div
            className={"card col-sm-3 col-md-2 col-lg-1 p-0 innercardorders"}
          >
            <InnerCard
              w={wi}
              i={indice}
              title={"Codice"}
              description={order?.id_order}
            ></InnerCard>
          </div>
          <div
            className={
              "card col-sm-4 col-md-3 col-lg-3 col-xl-2 p-0 innercardorders"
            }
          >
            <InnerCard
              w={wi}
              i={indice}
              title={"Corriere"}
              description={order?.courier_name}
            ></InnerCard>
          </div>
          <div
            className={"card col-sm-4 col-md-3 col-lg-2 p-0 innercardorders"}
          >
            <InnerCard
              w={wi}
              i={indice}
              title={"Stato"}
              description={order?.order_status}
            ></InnerCard>
          </div>
          <div
            className={
              "card col-sm-4 col-md-3 col-lg-3 col-xl-2 p-0 innercardorders"
            }
          >
            <InnerCard
              w={wi}
              i={indice}
              title={"Consegna stimata"}
              description={convertToDateIT(order?.order_date)}
            ></InnerCard>
          </div>
          <div
            className={"card col-sm-4 col-md-3 col-lg-2 p-0 innercardorders"}
          >
            <InnerCard
              w={wi}
              i={indice}
              title={"Data dell'ordine"}
              description={convertToDateIT(order?.order_date)}
            ></InnerCard>
          </div>
          <div
            className={"card col-sm-4 col-md-3 col-lg-2 p-0 innercardorders"}
          >
            <InnerCard
              w={wi}
              i={indice}
              title={"Totale"}
              description={order?.price + "€"}
            ></InnerCard>
          </div>
          {indice !== -1 && (
            <div
              className={
                "card col-sm-3 col-md-2 col-lg-2 col-xl-1 p-0 innercardorders"
              }
            >
              <div className="card-body p-1 row">
                <p className="card-title col-sm-6 col-6 m-0 pr-0">
                  <button
                    type="button"
                    className={
                      "btn btn-outline-info " +
                      (darkMode ? "nav2button" : "nav2buttonl")
                    }
                    onClick={() => {
                      navigate("/orders/detail/" + order.id_order);
                    }}
                  >
                    <i className="bi bi-pencil"></i>
                    {/*" modifica"*/}
                  </button>
                </p>

                {getUserRole() === "magazzino" && (
                  <p className="card-text col-sm-6 col-6 pl-0">
                    <button
                      type="button"
                      onClick={accolloOrdine}
                      className={
                        "btn btn-outline-danger " +
                        (darkMode ? "nav2button" : "nav2buttonl")
                      }
                    >
                      <i className="bi bi-rocket-takeoff"></i>
                      {/*" elimina"*/}
                    </button>
                  </p>
                )}
              </div>
            </div>
          )}

          {indice === -1 && (
            <div
              className={
                "card col-sm-3 col-md-2 col-lg-2 col-xl-1 p-0 innercardorders"
              }
            >
              <InnerCard
                w={wi}
                title={"Azioni"}
                description={" "}
                i={indice}
              ></InnerCard>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardOrders;
