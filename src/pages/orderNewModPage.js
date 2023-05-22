import "../pages/pages.css";
import userImagePlaceHolder from "../img/user_placeholder.png";
import { DarkModeContext } from "../theme/DarkModeContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import prov from "../utils/province.json";
import { useDispatch, useSelector } from "react-redux";
import { destroySession, setSessionUser } from "../stores/sessionInfo";
import { retrieveSingleOrder } from "../api/indexTreessueApi";

//ciaooo
function OrderNewModPage({ mod }) {
  const navigate = useNavigate();
  //const dispatch = useDispatch();
  //const user = useSelector((state) => state.sessionInfo.user);
  const { darkMode } = useContext(DarkModeContext);
  const params = useParams();
  var idOfOrder = undefined;
  const [isOnModify, setIsOnModify] = useState(mod === "detail" ? false : true);
  const [error, setError] = useState(null);
  const [ordineorig, setOrdineorig] = useState({
    id_order: "Generato automaticamente",
    order_date: "",
    order_status: "",
    courier_name: "",
    tracking_code: "",
    start_shipping_date: "",
    expected_delivery_date: "",
    delivery_data: "",
    original_price: "",
    discount: "",
    price: "",
})
  const [ordine, setOrdine] = useState({//obbligatori?
    id_order: "Generato automaticamente",
    order_date: "",
    order_status: "",
    courier_name: "",
    tracking_code: "",
    start_shipping_date: "",
    expected_delivery_date: "",
    delivery_data: "",
    original_price: "",
    discount: "",
    price: "",
  });

  if (params.id) {
    idOfOrder = parseInt(params?.id);
  }
  console.log({ idOfOrder })

  useEffect(() => {
    if (idOfOrder) {
      retrieveSingleOrder(idOfOrder).then((element) => {
        //console.log(element);
        if (element.isError) {
          setError(element.messageError);
        } else {
          setError("");
          console.log(element.data);
          setOrdine(element.data);
          setOrdineorig(element.data)
        }
      });
    }
  }, []);



  const modifyInfo = () => {
    setIsOnModify(true);
  };


  useEffect(() => {
    setError(null);
    /*if (!ordine.is_public) {
      if (!ordine.id_user_customer) {
        setError("Inserire il proprietario");
      }
    }


    if (ordine.tissue_quantity > -1) {
      setError("Inserire numero di fazzoletti valido");
    }

    if (!ordine.latitude || !ordine.longitude || !ordine.address) {
      setError("Compilare coordinate e indirizzo");
    }

    
    if (!regLatLon.exec(ordine.longitude)) {
      setError("Longitudine non valida!");
    }
    if (!regLatLon.exec(ordine.latitude)) {
      setError("Latitudine non valida!");
    }

    if (!ordine.title) {
      setError("Compilare il nome della ordine");
    }

    if (ordine.is_public === "") {
      setError("Selezionare se è di pubblico accesso o privato");
    }*/
  }, [
    /*ordine.id_user_customer,
    ordine.latitude,
    ordine.longitude,
    ordine.address,
    ordine.tissue_quantity,
    ordine.title,
    ordine.is_public,*/
  ]);

  const confirmSave = () => {
    console.log({ ordine });

    if (
      ordine.id_order/* &&
      ordine.latitude &&
      ordine.longitude &&
      ordine.address &&
      ordine.tissue_quantity &&
      ordine.title &&
      ordine.is_public*/
    ) {
      if (error === null) {
        //chiamata di api di salvataggio

        //se corretto
        setIsOnModify(false);
        //dispatch(setSessionUser({ user: ordine }));
      }
    }
    console.log({ ordine });
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
        Ordine attenzione a id non validi
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
              {/*<h2 className={darkMode ? "testolight" : "testodark"}>ordine</h2>*/}
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
                          htmlFor="idordine"
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
                            id="idordine"
                            value={ordine.id_order}

                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="titoloordine"
                          className="col-md-3 col-form-label"
                        >
                          Corriere*
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
                            id="titoloordine"
                            value={ordine.courier_name}
                            onChange={(el) => {
                              setOrdine({
                                ...ordine,
                                courier_name: el.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="descrizioneordine"
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
                          id="pubblicaPrivata"
                          value={ordine.is_public}
                          onChange={(el) => {
                            setOrdine({
                              ...ordine,
                              is_public: el.target.value,
                            });
                          }}
                        >
                          <option value={""}></option>
                          <option value={"in lavorazione"}>in lavorazione</option>
                          <option value={"consegnato"}>consegnato</option>

                        </select>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="indirizzoordine"
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
                            id="indirizzoordine"
                            value={ordine.address}
                            onChange={(el) => {
                              setOrdine({
                                ...ordine,
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
                          value={ordine.latitude}
                          onChange={(el) => {
                            setOrdine({
                              ...ordine,
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
                          value={ordine.longitude}
                          onChange={(el) => {
                            setOrdine({
                              ...ordine,
                              longitude: el.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-group row">

                      {/*diversi step funzionano? */}

                      <label
                        htmlFor="capordine"
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
                          id="capordine"
                          value={ordine.id_user_customer}
                          onChange={(el) => {
                            setOrdine({
                              ...ordine,
                              id_user_customer: el.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="cittaordine"
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
                          id="cittaordine"
                          value={ordine.tissue_quantity}
                          onChange={(el) => {
                            setOrdine({ ...ordine, tissue_quantity: el.target.value });
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
                          value={ordine.is_public}
                          onChange={(el) => {
                            setOrdine({
                              ...ordine,
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
                onClick={()=>setOrdine({
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
                onClick={()=>{setOrdine(ordineorig)}}
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

export { OrderNewModPage };
