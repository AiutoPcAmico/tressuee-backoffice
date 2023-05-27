import { DarkModeContext } from "../theme/DarkModeContext";
import { useContext, useState } from "react";
import { InnerCard } from "./innerCard";
import { useWindowDimensions } from "../utils/useWindowDimensions";
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "../utils/generalFunctions";
import { deleteWorker } from "../api/indexTreessueApi";

function CardWorker({ worker, indice, userCanModify }) {
  const { darkMode } = useContext(DarkModeContext);
  const { wi } = useWindowDimensions();
  const [localIsActive, setLocalIsActive] = useState(worker?.is_active);
  const navigate = useNavigate();

  async function deleteWorkerButton() {
    await deleteWorker(worker.id).then((element) => {
      if (element.isError) {
        console.log("ERROREEE nella delete");
      } else {
        console.log("Eliminato Worker");
        setLocalIsActive(false);
      }
      console.log(element);
    });
  }

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
              className={"card col-sm-3 col-md-2 col-lg-2 p-0 innercardorders"}
            >
              <InnerCard
                w={wi}
                title={"Cognome"}
                description={
                  worker ? capitalizeFirstLetter(worker?.last_name) : ""
                }
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
                title={"Nome"}
                description={
                  worker ? capitalizeFirstLetter(worker?.first_name) : ""
                }
                i={indice}
              ></InnerCard>
            </div>
            <div
              className={"card col-sm-4 col-md-3 col-lg-3 p-0 innercardorders"}
            >
              <InnerCard
                w={wi}
                title={"Email"}
                description={worker?.email}
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
                title={"Ruolo"}
                description={
                  worker?.role ? capitalizeFirstLetter(worker?.role) : ""
                }
                i={indice}
              ></InnerCard>
            </div>

            <div
              className={"card col-sm-4 col-md-3 col-lg-2 p-0 innercardorders"}
            >
              <InnerCard
                w={wi}
                title={"Attivo"}
                description={localIsActive ? "Attivo" : "Inattivo"}
                i={indice}
              ></InnerCard>
            </div>
            {indice !== -1 && !userCanModify && (
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
                        navigate("/workers/detail/" + worker.id);
                      }}
                    >
                      <i className="bi bi-pencil"></i>
                      {/*" modifica"*/}
                    </button>
                  </p>
                  <p className="card-text col-sm-6 col-6 pl-0">
                    <button
                      type="button"
                      disabled={!localIsActive}
                      className={
                        "btn btn-outline-danger " +
                        (darkMode ? "nav2button" : "nav2buttonl")
                      }
                      onClick={deleteWorkerButton}
                      //onClick={modifyInfo}
                    >
                      <i className="bi bi-x-octagon"></i>
                      {/*" elimina"*/}
                    </button>
                  </p>
                </div>
              </div>
            )}
            {indice === -1 && !userCanModify && (
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
      {/*<DialogOrderDetail ordine={utente}></DialogOrderDetail>*/}
    </div>
  );
}

export { CardWorker };
