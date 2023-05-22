import { DarkModeContext } from "../theme/DarkModeContext";
import { useContext } from "react";
import { InnerCard } from "./innerCard";
import { useWindowDimensions } from "../utils/useWindowDimensions";
import { useNavigate } from "react-router-dom";

function CardTower({ torre, indice }) {
  const { darkMode } = useContext(DarkModeContext);
  const { wi } = useWindowDimensions();
  const navigate = useNavigate();

  return (
    <div>
      <div
        className={"card mb-1 " + (darkMode ? "sfondocard1" : "sfondocard3")}
        style={{ width: "100%" }}
        data-toggle="modal"
        data-target="#exampleModal"
      >
        {
          <div className="d-flex flex-wrap justify-content-center row m-0">
            <div
              className={"card col-sm-3 col-md-2 col-lg-1 p-0 innercardorders"}
            >
              <InnerCard
                w={wi}
                title={"Codice"}
                description={torre?.id_tower}
                i={indice}
              ></InnerCard>
            </div>
            <div
              className={
                "card col-sm-4 col-md-3 col-lg-3 col-xl-2 p-0 innercardorders"
              }
            >
              <InnerCard
                w={wi}
                title={"Info"}
                description={
                  torre?.title + " - fazzoletti " + torre?.tissue_quantity
                }
                i={indice}
              ></InnerCard>
            </div>
            <div
              className={"card col-sm-4 col-md-3 col-lg-2 p-0 innercardorders"}
            >
              <InnerCard
                w={wi}
                title={"Indirizzo"}
                description={torre?.address}
                i={indice}
              ></InnerCard>
            </div>
            <div
              className={
                "card col-sm-4 col-md-3 col-lg-3 col-xl-2 p-0 innercardorders"
              }
            >
              <InnerCard
                w={wi}
                title={"Descrizione"}
                description={torre?.description}
                i={indice}
              ></InnerCard>
            </div>
            <div
              className={"card col-sm-4 col-md-3 col-lg-2 p-0 innercardorders"}
            >
              <InnerCard
                w={wi}
                title={"Coordinate"}
                description={torre?.latitude + " " + torre?.longitude}
                i={indice}
              ></InnerCard>
            </div>
            <div
              className={"card col-sm-4 col-md-3 col-lg-2 p-0 innercardorders"}
            >
              <InnerCard
                w={wi}
                title={"Pubblica"}
                description={torre?.is_public ? "si" : "no"}
                i={indice}
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
                        navigate("/towers/detail/" + torre.id_tower);
                      }}
                    >
                      <i className="bi bi-pencil"></i>
                      {/*" modifica"*/}
                    </button>
                  </p>
                  <p className="card-text col-sm-6 col-6 pl-0">
                    <button
                      type="button"
                      className={
                        "btn btn-outline-danger " +
                        (darkMode ? "nav2button" : "nav2buttonl")
                      }
                      //onClick={modifyInfo}
                    >
                      <i className="bi bi-trash3"></i>
                      {/*" elimina"*/}
                    </button>
                  </p>
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
        }
      </div>
      {/*modal */}
      {/*<DialogOrderDetail ordine={torre}></DialogOrderDetail>*/}
    </div>
  );
}

export default CardTower;
