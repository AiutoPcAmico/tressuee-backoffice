import "../pages/pages.css";
import userImagePlaceHolder from "../img/user_placeholder.png";
import { DarkModeContext } from "../theme/DarkModeContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import prov from "../utils/province.json";
import { useDispatch, useSelector } from "react-redux";
import { destroySession, setSessionUser } from "../stores/sessionInfo";
import { retrieveSingleTower } from "../api/indexTreessueApi";

//ciaooo
function TowerNewModPage({ mod }) {
  const navigate = useNavigate();
  //const dispatch = useDispatch();
  //const user = useSelector((state) => state.sessionInfo.user);
  const { darkMode } = useContext(DarkModeContext);
  const params = useParams();
  var idOfTower = undefined;
  const [isOnModify, setIsOnModify] = useState(mod === "detail" ? false : true);
  const [error, setError] = useState(null);
  const [torreorig, setTorreorig] = useState({
    id_tower: "Verra' generato automaticamente",//*
    title: "",//*
    description: "",
    address: "",//*
    latitude: "",//*
    longitude: "",//*
    id_user_customer: "???",
    is_public: "",//*
    tissue_quantity: "", //*
})
  const [torre, setTorre] = useState({
    id_tower: "Verra' generato automaticamente",//*
    title: "",//*
    description: "",
    address: "",//*
    latitude: "",//*
    longitude: "",//*
    id_user_customer: "???",
    is_public: "",//*
    tissue_quantity: "", //*
  });

  if (params.id) {
    idOfTower = parseInt(params?.id);
  }
  console.log({ idOfTower })

  useEffect(() => {
    if (idOfTower) {
      retrieveSingleTower(idOfTower).then((element) => {
        //console.log(element);
        if (element.isError) {
          setError(element.messageError);
        } else {
          setError("");
          console.log(element.data);
          setTorre(element.data);
          setTorreorig(element.data)
        }
      });
    }
  }, []);



  const modifyInfo = () => {
    setIsOnModify(true);
  };

  var regLatLon = new RegExp("^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}");


  useEffect(() => {
    setError(null);
    if (!torre.is_public) {
      if (!torre.id_user_customer) {
        setError("Inserire il proprietario");
      }
    }


    if (torre.tissue_quantity > -1) {
      setError("Inserire numero di fazzoletti valido");
    }

    if (!torre.latitude || !torre.longitude || !torre.address) {
      setError("Compilare coordinate e indirizzo");
    }

    
    if (!regLatLon.exec(torre.longitude)) {
      setError("Longitudine non valida!");
    }
    if (!regLatLon.exec(torre.latitude)) {
      setError("Latitudine non valida!");
    }

    if (!torre.title) {
      setError("Compilare il nome della Torre");
    }

    if (torre.is_public === "") {
      setError("Selezionare se è di pubblico accesso o privato");
    }
  }, [
    torre.id_user_customer,
    torre.latitude,
    torre.longitude,
    torre.address,
    torre.tissue_quantity,
    torre.title,
    torre.is_public,
  ]);

  const confirmSave = () => {
    console.log({ torre });

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
        //chiamata di api di salvataggio

        //se corretto
        setIsOnModify(false);
        //dispatch(setSessionUser({ user: torre }));
      }
    }
    console.log({ torre });
  };

  function logout() {
    //dispatch(destroySession());
    navigate("/");
  }

  return (
    <div className="detailsPage">
      <h2
        className={darkMode ? "testolight" : "testodark"}
        style={{ width: "50%" }}
      >
        Torre attenzione a id non validi
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
                          <input
                            type="text"
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
                          Indirizzo*
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
                        Latitudine*
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          disabled={!isOnModify}
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
                        Longitudine*
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          disabled={!isOnModify}
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
                        <input
                          type="text"
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
                        />
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
                            setTorre({ ...torre, tissue_quantity: el.target.value });
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
                              is_public: el.target.value,
                            });
                          }}
                        >
                          <option value={""}></option>
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

            <p>
              <button
                disabled={!isOnModify}
                type="button"
                onClick={()=>setTorre({
                title: "",//*
                description: "",
                address: "",//*
                latitude: "",//*
                longitude: "",//*
                id_user_customer: "???",
                is_public: "",//*
                tissue_quantity: "", })}
                className={
                  "btn btn-outline-info mr-1 " +
                  (darkMode ? "nav2buttonl" : "nav2button")
                }
              >
              <i class="bi bi-trash3"></i>              
              </button>
              <button
                disabled={!isOnModify}
                type="button"
                onClick={()=>{setTorre(torreorig)}}
                className={
                  "btn btn-outline-info ml-1 " +
                  (darkMode ? "nav2buttonl" : "nav2button")
                }
              >
              <i class="bi bi-arrow-clockwise"></i>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { TowerNewModPage };
