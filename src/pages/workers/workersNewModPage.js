import "../pages.css";
import userImagePlaceHolder from "../../img/user_placeholder.png";
import { DarkModeContext } from "../../theme/DarkModeContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  retrieveWorkerDetails,
  getAllRoles,
  createWorker,
  modifyWorker,
} from "../../api/indexTreessueApi";

function WorkerNewModPage({ mod }) {
  const params = useParams();
  var idOfWorker = undefined;
  const { darkMode } = useContext(DarkModeContext);
  const [isOnModify, setIsOnModify] = useState(mod === "detail" ? false : true);
  const [error, setError] = useState("");
  const [msgConferma, setMsgConferma] = useState(false);
  const [roles, setRoles] = useState([]);
  const [worker, setWorker] = useState({
    id_worker: "generato automaticamente",
    first_name: "",
    last_name: "",
    role: "",
    email: "",
    password: "",
    is_active: "",
  });
  const [workerorig, setWorkerorig] = useState({
    id_worker: "generato automaticamente",
    first_name: "",
    last_name: "",
    role: "",
    email: "",
    password: "",
    is_active: "",
  });

  if (params.id) {
    idOfWorker = parseInt(params?.id);
  }

  useEffect(() => {
    if (idOfWorker) {
      retrieveWorkerDetails(idOfWorker).then((element) => {
        if (element.isError) {
          setError(element.messageError);
        } else {
          setError("");
          setWorker(element.data);
          setWorkerorig(element.data);
        }
      });
    }
  }, [idOfWorker]);

  useEffect(() => {
    getAllRoles().then((element) => {
      setRoles(element.data);
    });
  }, []);

  const modifyInfo = () => {
    setIsOnModify(true);
    setMsgConferma("");
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function isValidPhone(numberString) {
    return /(^3\d{2}\d{7}$)|(^0\d{2,3}\d{4,6}$)/.test(numberString);
  }

  useEffect(() => {
    setError(null);

    if (worker.role === "") {
      setError("Selezionare il ruolo per l'utente!");
    }

    if (worker.is_active === "") {
      setError("Impostare se l'utente è attivo o disattivato!");
    }

    if (worker.phone_number?.length > 0 && !isValidPhone(worker.phone_number)) {
      setError("Numero di telefono non valido!");
    }

    if (!isValidEmail(worker.email)) {
      setError("Email non valida!");
    }

    if (!worker.first_name || !worker.last_name) {
      setError("Compilare il nome e il cognome!");
    }
  }, [
    worker.email,
    worker.phone_number,
    worker.first_name,
    worker.last_name,
    worker.password,
    worker,
  ]);
  console.log(worker);
  const confirmSave = () => {
    if (
      worker.email &&
      worker.first_name &&
      worker.last_name &&
      worker.is_active !== ""
    ) {
      if (error === "" || error === null) {
        //chiamata di api di salvataggio

        //se corretto
        setIsOnModify(false);
        //console.log(isMod);
        //isMod(worker);
        if (mod === "new") {
          console.log({ worker });
          createWorker(worker).then((element) => {
            if (element.isError) {
              setError(element.messageError);
            } else {
              setWorker({
                id_worker: "generato automaticamente",
                first_name: "",
                last_name: "",
                role: "",
                email: "",
                password: "",
                is_active: "",
              });
              setMsgConferma(true);
            }
          });
        } else {
          modifyWorker(worker).then((element) => {
            if (element.isError) {
              setError(element.messageError);
            } else {
              setMsgConferma(true);
            }
          });
        }
      }
    }
  };

  //console.log(roles);

  return (
    <div className="detailsPage">
      <h2
        className={darkMode ? "testolight" : "testodark"}
        style={{ width: "100%" }}
      >
        {idOfWorker
          ? "Modifica dipendente " + worker.first_name + " " + worker.last_name
          : "Aggiungi un nuovo dipendente"}
      </h2>
      <div className=" text flex-column" style={{}}>
        <div className="row flex-wrap align-items-center pb-3">
          <div
            style={{ width: "49%" }}
            className={
              "col-sm-8 col-12 text-center pt-3 " +
              (darkMode ? "sfondo3" : "sfondo1")
            }
          >
            {/*immagine + dati */}
            <div className="m-2">
              {/*<h2 className={darkMode ? "testolight" : "testodark"}>worker</h2>*/}
              <div className=" text flex-column" style={{}}>
                <div className="row flex-wrap align-items-center pb-3">
                  <div
                    style={
                      {
                        //maxHeight: "150px",
                      }
                    }
                    className={
                      "col-sm-3 col-12 text-center pt-3 "
                      //  (darkMode ? "sfondo3" : "sfondo1")
                    }
                  >
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        maxHeight: "200px",
                        maxWidth: "200px",
                        borderRadius: 100,
                      }}
                      src={userImagePlaceHolder}
                      alt="user placeholder"
                    ></img>
                  </div>
                  <div
                    style={{ width: "49%" }}
                    className={
                      "col-sm-9 col-12 align-self-start text-center " +
                      (darkMode
                        ? "testolight sfondocard1"
                        : "testodark sfondocard3")
                    }
                  >
                    <div style={{ textAlign: "left" }}>
                      <div className="form-group row mt-3">
                        <label
                          htmlFor="emailaccount"
                          className="col-md-3 col-form-label"
                        >
                          Email*
                        </label>
                        <div className="col-md-9">
                          <input
                            type="email"
                            disabled={!isOnModify}
                            className={
                              !isOnModify
                                ? "w-100" // "form-control-plaintext toglie sfondo ma responsive"
                                : "form-control"
                            }
                            id="emailaccount"
                            value={worker.email}
                            onChange={(el) => {
                              setWorker({
                                ...worker,
                                email: el.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="passwordaccount"
                          className="col-md-3 col-form-label"
                        >
                          Password*
                        </label>
                        <div className="col-md-9">
                          <input
                            type="password"
                            disabled={!isOnModify}
                            className={
                              !isOnModify
                                ? "w-100" // "form-control-plaintext toglie sfondo ma responsive"
                                : "form-control"
                            }
                            id="passwordaccount"
                            value={worker.password}
                            onChange={(el) => {
                              setWorker({
                                ...worker,
                                password: el.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="nomeaccount"
                          className="col-md-3 col-form-label"
                        >
                          Nome*
                        </label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            disabled={!isOnModify}
                            className={
                              !isOnModify
                                ? "w-100" // "form-control-plaintext toglie sfondo ma responsive"
                                : "form-control"
                            }
                            id="nomeaccount"
                            value={worker.first_name}
                            onChange={(el) => {
                              setWorker({
                                ...worker,
                                first_name: el.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="cognomeaccount"
                          className="col-md-3 col-form-label"
                        >
                          Cognome*
                        </label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            disabled={!isOnModify}
                            className={
                              !isOnModify
                                ? "w-100" // "form-control-plaintext toglie sfondo ma responsive"
                                : "form-control"
                            }
                            id="cognomeaccount"
                            value={worker.last_name}
                            onChange={(el) => {
                              setWorker({
                                ...worker,
                                last_name: el.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*riga sotto img */}
                  <div
                    style={{ textAlign: "left" }}
                    className={
                      " p-3 col-12 " +
                      (darkMode
                        ? "testolight sfondocard1"
                        : "testodark sfondocard3")
                    }
                  >
                    <div className="form-group row">
                      <label
                        htmlFor="statoaccount"
                        className="col-md-3 col-form-label"
                      >
                        Stato*
                      </label>
                      <div className="col-md-9">
                        <select
                          disabled={!isOnModify}
                          className={
                            (!isOnModify
                              ? "form-control-plaintext"
                              : "form-control") + " custom-select"
                          }
                          id="statoaccount"
                          value={worker.is_active}
                          onChange={(el) => {
                            console.log(el.target.value);

                            setWorker({
                              ...worker,
                              is_active: el.target.value,
                            });
                          }}
                        >
                          <option value={""}></option>
                          <option value={true}>Attivo</option>
                          <option value={false}>Disattivo</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="statoaccount"
                        className="col-md-3 col-form-label"
                      >
                        Ruolo*
                      </label>
                      <div className="col-md-9">
                        <select
                          disabled={!isOnModify}
                          className={
                            (!isOnModify
                              ? "form-control-plaintext"
                              : "form-control") + " custom-select"
                          }
                          id="statoaccount"
                          value={worker.role}
                          onChange={(el) => {
                            setWorker({
                              ...worker,
                              role: el.target.value,
                            });
                          }}
                        >
                          <option value={""}></option>
                          {/* get ruoli */}
                          {roles &&
                            roles.map((e) => {
                              return <option value={e}>{e}</option>;
                            })}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{ width: "49%" }}
            className={
              "col-sm-4 col-12 text-center sfondo2 " +
              (darkMode ? "testolight" : "testodark")
            }
          >
            {!isOnModify && (
              <button
                type="button"
                className={
                  "btn btn-outline-info mt-3 " +
                  (darkMode ? "nav2button" : "nav2buttonl")
                }
                onClick={modifyInfo}
              >
                <i className="bi bi-pencil"></i>
                {" modifica"}
              </button>
            )}
            {!!isOnModify && (
              <button
                type="button"
                disabled={error}
                className={
                  "btn btn-outline-info mt-3 " +
                  (darkMode ? "nav2button" : "nav2buttonl")
                }
                onClick={confirmSave}
              >
                <i className="bi bi-check"></i>
                {" salva"}
              </button>
            )}

            {error && (
              <div style={{ textAlign: "left" }}>
                <p className="alert alert-danger mt-3">
                  <b>Errore!</b>
                  <br></br>
                  <span>{error}</span>
                </p>
              </div>
            )}

            {msgConferma && (
              <div style={{ textAlign: "left" }}>
                <p className="alert alert-success mt-3">
                  <b>Creato!</b>
                  <br></br>
                  <span>
                    Il dipendente è stato{" "}
                    {mod === "new" ? "creato" : "modificato"} con successo!
                    Tornare alla pagina dei dipendenti per vederne i dettagli
                  </span>
                </p>
              </div>
            )}

            <p>
              <button
                disabled={!isOnModify}
                type="button"
                onClick={() =>
                  setWorker({
                    email: "",
                    password: "",
                    first_name: "",
                    last_name: "",
                    phone_number: "",
                    address: "",
                    birth_date: "", //data gg-mm-aaaa
                    zip_code: "",
                    city: "",
                    province: "",
                    is_active: "",
                  })
                }
                className={
                  "btn btn-outline-info mr-1 " +
                  (darkMode ? "nav2buttonl" : "nav2button")
                }
              >
                Pulisci &nbsp;
                <i className="bi bi-trash3"></i>
              </button>
              <button
                disabled={!isOnModify}
                type="button"
                onClick={() => {
                  setWorker(workerorig);
                }}
                className={
                  "btn btn-outline-info ml-1 " +
                  (darkMode ? "nav2buttonl" : "nav2button")
                }
              >
                Reimposta &nbsp;
                <i className="bi bi-arrow-clockwise"></i>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { WorkerNewModPage };
