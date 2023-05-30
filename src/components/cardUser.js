import { DarkModeContext } from "../theme/DarkModeContext";
import { useContext, useState } from "react";
import { InnerCard } from "./innerCard";
import { useWindowDimensions } from "../utils/useWindowDimensions";
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "../utils/generalFunctions";
import { deleteUser } from "../api/indexTreessueApi";

function CardUser({ utente, indice, notifyDelete }) {
  const { darkMode } = useContext(DarkModeContext);
  const { wi } = useWindowDimensions();
  const navigate = useNavigate();
  const [localIsActive, setLocalIsActive] = useState(utente?.is_active);

  async function deleteUserButton() {
    console.log({ utente });
    await deleteUser(utente.id_user_customer).then((element) => {
      if (element.isError) {
      } else {
        notifyDelete();
        setLocalIsActive(false);
      }
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
              {}
              <InnerCard
                w={wi}
                title={"Cognome e Nome"}
                description={
                  (utente?.last_name
                    ? capitalizeFirstLetter(utente?.last_name)
                    : "") +
                  " " +
                  (utente?.first_name
                    ? capitalizeFirstLetter(utente?.first_name)
                    : "-")
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
                title={"Email"}
                description={utente?.email}
                i={indice}
              ></InnerCard>
            </div>
            <div
              className={"card col-sm-4 col-md-3 col-lg-2 p-0 innercardorders"}
            >
              <InnerCard
                w={wi}
                title={"Indirizzo"}
                description={
                  (utente?.address ? utente.address : "-") +
                  " " +
                  (utente?.city ? utente.city : "")
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
                title={"Telefono"}
                description={utente?.phone_number}
                i={indice}
              ></InnerCard>
            </div>

            <div
              className={"card col-sm-4 col-md-3 col-lg-1 p-0 innercardorders"}
            >
              <InnerCard
                w={wi}
                title={"Attivo"}
                description={utente?.is_active ? "Attivo" : "Inattivo"}
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
                        navigate("/users/detail/" + utente.id_user_customer);
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
                      onClick={deleteUserButton}
                      className={
                        "btn btn-outline-danger " +
                        (darkMode ? "nav2button" : "nav2buttonl")
                      }
                      //onClick={modifyInfo}
                    >
                      <i className="bi bi-x-octagon"></i>
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
      {/*<DialogOrderDetail ordine={utente}></DialogOrderDetail>*/}
    </div>
  );
}

export default CardUser;
