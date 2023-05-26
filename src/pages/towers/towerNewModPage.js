import "../pages.css";
import { DarkModeContext } from "../../theme/DarkModeContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { retrieveSingleTower, createTower, retrieveUsers, modifyTower } from "../../api/indexTreessueApi";

//ciaooo
function TowerNewModPage({ mod }) {
  //const dispatch = useDispatch();
  //const user = useSelector((state) => state.sessionInfo.user);
  const { darkMode } = useContext(DarkModeContext);
  const params = useParams();
  var idOfTower = undefined;
  const [isOnModify, setIsOnModify] = useState(mod === "detail" ? false : true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState(null);
  const [msgConferma, setMsgConferma] = useState(false);
  const [torreorig, setTorreorig] = useState({
    id_tower: "Autogenerato", //*
    title: "", //*
    description: "",
    address: "", //*
    latitude: "", //*
    longitude: "", //*
    id_user_customer: "",
    is_public: true, //*
    tissue_quantity: "", //*
  });
  const [torre, setTorre] = useState({
    id_tower: "Autogenerato", //*
    title: "", //*
    description: "",
    address: "", //*
    latitude: "", //*
    longitude: "", //*
    id_user_customer: "",
    is_public: true, //*
    tissue_quantity: "", //*
  });

  if (params.id) {
    idOfTower = parseInt(params?.id);
  }

  useEffect(() => {
    if (idOfTower) {
      retrieveSingleTower(idOfTower).then((element) => {
        if (element.isError) {
          setError(element.messageError);
        } else {
          setError("");
          setTorre(element.data);
          setTorreorig(element.data);
        }
      });
    }
  }, [idOfTower]);

  useEffect(() => {
    retrieveUsers().then((element) => {
      setUsers(element.data);
    });
  }, []);

  const modifyInfo = () => {
    setIsOnModify(true);
    setMsgConferma("");

  };

  useEffect(() => {
    const regLatLon = new RegExp("^-?([1-8]?[1-9]|[1-9]0)\\.{1}\\d{1,6}");
    setError(null);

    if (!torre.is_public) {
      if (!torre.id_user_customer) {
        setError("Inserire il proprietario");
      }
    }

    if (torre.tissue_quantity < 0) {
      setError("Inserire numero di fazzoletti valido");
    }

    if (torre.is_public && !torre.address) {
      setError("Compilare l'indirizzo");
    }

    if (torre.is_public && !regLatLon.exec(torre.longitude)) {
      setError("Longitudine non valida!");
    }
    if (torre.is_public && !regLatLon.exec(torre.latitude)) {
      console.log({ torre });
      setError("Latitudine non valida!");
    }

    if (!torre.title) {
      setError("Compilare il nome della Torre");
    }

    if (torre.is_public === "") {
      setError("Selezionare se è di pubblico accesso o privato");
    }
  }, [torre]);

  const confirmSave = () => {
    if (
      torre.id_user_customer &&
      torre.latitude &&
      torre.longitude &&
      torre.address &&
      torre.tissue_quantity &&
      torre.title &&
      torre.is_public
    ) {
      if (error === null) {

        setIsOnModify(false);

        if (mod === "new") {
          createTower(torre).then((element) => {
            if (element.isError) {
              setError(element.messageError);
            } else {
              setTorre({
                id_tower: "Autogenerato", //*
                title: "", //*
                description: "",
                address: "", //*
                latitude: "", //*
                longitude: "", //*
                id_user_customer: "",
                is_public: true, //*
                tissue_quantity: "", //*
              });
              setMsgConferma(true);
            }
          });
        } else {
          modifyTower(torre).then((element) => {
            if (element.isError) {
              setError(element.messageError);
            } else {
              setMsgConferma(true);
            }
          });
        }


        //se corretto
      }
    }
  };

  return (
    <div className="detailsPage">
      <h2
        className={darkMode ? "testolight" : "testodark"}
        style={{ width: "100%" }}
      >
        {idOfTower
          ? "Dettagli Torre numero " + idOfTower
          : "Inserisci una nuova Torre"}
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
              {/*<h2 className={darkMode ? "testolight" : "testodark"}>torre</h2>*/}
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
                      src={require(`../../img/ricaricatore.png`)}
                      alt="torre ricaricatore"
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
                          htmlFor="idtorre"
                          className="col-md-3 col-form-label"
                        >
                          Id*
                        </label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            disabled={true}
                            className={
                              true
                                ? "w-100" // "form-control-plaintext toglie sfondo ma responsive"
                                : "form-control"
                            }
                            id="idtorre"
                            value={torre.id_tower}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="titolotorre"
                          className="col-md-3 col-form-label"
                        >
                          Titolo*
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
                            id="titolotorre"
                            value={torre.title}
                            onChange={(el) => {
                              setTorre({
                                ...torre,
                                title: el.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="descrizionetorre"
                          className="col-md-4 col-form-label"
                        >
                          Descrizione*
                        </label>
                        <div className="col-md-8">
                          <textarea
                            type="text"
                            rows={3}
                            disabled={!isOnModify}
                            className={
                              !isOnModify
                                ? "w-100" // "form-control-plaintext toglie sfondo ma responsive"
                                : "form-control"
                            }
                            id="descrizionetorre"
                            value={torre.description}
                            onChange={(el) => {
                              setTorre({
                                ...torre,
                                description: el.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="indirizzotorre"
                          className="col-md-3 col-form-label"
                        >
                          Indirizzo{torre.is_public ? "*" : ""}
                        </label>
                        <div className="col-md-9">
                          <textarea
                            type="text"
                            rows={2}
                            disabled={!isOnModify || !torre.is_public}
                            className={
                              !isOnModify
                                ? "w-100" // "form-control-plaintext toglie sfondo ma responsive"
                                : "form-control"
                            }
                            id="indirizzotorre"
                            value={torre.address}
                            onChange={(el) => {
                              setTorre({
                                ...torre,
                                address: el.target.value,
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
                        htmlFor="latitudine"
                        className="col-sm-4 col-form-label"
                      >
                        Latitudine{torre.is_public ? "*" : ""}
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          disabled={!isOnModify || !torre.is_public}
                          className={
                            !isOnModify
                              ? "w-100" // "form-control-plaintext toglie sfondo ma responsive"
                              : "form-control"
                          }
                          id="latitudine"
                          value={torre.latitude}
                          onChange={(el) => {
                            setTorre({
                              ...torre,
                              latitude: el.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="longitudine"
                        className="col-sm-4 col-form-label"
                      >
                        Longitudine{torre.is_public ? "*" : ""}
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          disabled={!isOnModify || !torre.is_public}
                          className={
                            !isOnModify
                              ? "w-100" // "form-control-plaintext toglie sfondo ma responsive"
                              : "form-control"
                          }
                          id="longitudine"
                          value={torre.longitude}
                          onChange={(el) => {
                            setTorre({
                              ...torre,
                              longitude: el.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      {/*diversi step funzionano? */}

                      <label
                        htmlFor="captorre"
                        className="col-sm-4 col-form-label"
                      >
                        Proprietario
                      </label>
                      <div className="col-sm-8">
                      <select
                          disabled={!isOnModify}
                          className={
                            !isOnModify
                              ? "w-100" // "form-control-plaintext toglie sfondo ma responsive"
                              : "form-control"
                          }
                          id="captorre"
                          value={torre.id_user_customer}
                          onChange={(el) => {
                            setTorre({
                              ...torre,
                              id_user_customer: el.target.value,
                            });
                          }}
                        >
                          <option value={""}></option>
                          {users && users.length>0 && users.map((u)=>{
                            return <option value={u.id_user_customer}>{u.email+"-"+u.first_name+" "+u.last_name}</option>
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="cittatorre"
                        className="col-md-2 col-sm-3 col-form-label"
                      >
                        Fazzoletti
                      </label>
                      <div className="col-md-5 col-sm-9">
                        <input
                          type="number"
                          min={0}
                          disabled={!isOnModify}
                          className={
                            !isOnModify
                              ? "w-100" // "form-control-plaintext toglie sfondo ma responsive"
                              : "form-control"
                          }
                          id="cittatorre"
                          value={torre.tissue_quantity}
                          onChange={(el) => {
                            setTorre({
                              ...torre,
                              tissue_quantity: el.target.value,
                            });
                          }}
                        />
                      </div>
                      <label
                        htmlFor="pubblicaPrivata"
                        className="col-md-2 col-sm-3 col-form-label"
                      >
                        Pubblica*
                      </label>
                      <div className="col-md-3 col-sm-9">
                        <select
                          disabled={!isOnModify}
                          className={
                            (!isOnModify
                              ? "form-control-plaintext"
                              : "form-control") + " custom-select"
                          }
                          id="pubblicaPrivata"
                          value={torre.is_public}
                          onChange={(el) => {
                            setTorre({
                              ...torre,
                              is_public: "true" === el.target.value,
                              address: "",
                              latitude: "",
                              longitude: "",
                            });
                          }}
                        >
                          <option value={true}>Si</option>
                          <option value={false}>No</option>
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
                    La torre è stata{" "}
                    {mod === "new" ? "creata" : "modificata"} con successo!
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
                  setTorre({
                    title: "", //*
                    description: "",
                    address: "", //*
                    latitude: "", //*
                    longitude: "", //*
                    id_user_customer: "???",
                    is_public: "", //*
                    tissue_quantity: "",
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
                  setTorre(torreorig);
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

export { TowerNewModPage };
