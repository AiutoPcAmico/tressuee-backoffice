import "../pages.css";
import { DarkModeContext } from "../../theme/DarkModeContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  retrieveSingleOrder,
  retrieveUsers,
  createOrder,
  getStatus,
  modifyOrder,
} from "../../api/indexTreessueApi";
import {
  capitalizeFirstLetter,
  convertToDateIT,
} from "../../utils/generalFunctions";
import { AddProductToOrder } from "../../components/addProductToOrder";

//ciaooo
function OrderNewModPage({ mod }) {
  //const dispatch = useDispatch();
  //const user = useSelector((state) => state.sessionInfo.user);
  const { darkMode } = useContext(DarkModeContext);
  const params = useParams();
  var idOfOrder = undefined;
  const [users, setUsers] = useState(null);
  const [isOnModify, setIsOnModify] = useState(mod === "detail" ? false : true);
  const [error, setError] = useState(null);
  const [msgConferma, setMsgConferma] = useState(false);
  const [arrayOfCart, setArrayOfCart] = useState([]);
  const [status, setStatus] = useState([]);

  const [ordineorig, setOrdineorig] = useState({
    id_order: "Generato automaticamente",
    order_date: new Date(),
    id_order_status: null,
    courier_name: "",
    tracking_code: "Generato automaticamente",
    start_shipping_date: "",
    expected_delivery_date: "",
    delivery_data: "",
    original_price: "",
    discount: "",
    price: 0,
    id_user_customer: "",
    products: [],
  });
  const [ordine, setOrdine] = useState({
    //obbligatori?
    id_order: "Generato automaticamente",
    order_date: new Date(),
    id_order_status: null,
    courier_name: "",
    tracking_code: "Generato automaticamente",
    start_shipping_date: "",
    expected_delivery_date: "",
    delivery_data: "",
    original_price: "",
    discount: "",
    price: 0,
    id_user_customer: "",
    products: [],
  });

  if (params.id) {
    idOfOrder = parseInt(params?.id);
  }

  useEffect(() => {
    retrieveUsers().then((element) => {
      setUsers(element.data);
    });
    getStatus().then((element) => {
      setStatus(element.data);
    });
    //    setArrayOfCart([]);
  }, []);

  useEffect(() => {
    if (idOfOrder) {
      retrieveSingleOrder(idOfOrder).then((element) => {
        if (element.isError) {
          setError(element.messageError);
        } else {
          setError("");
          setOrdine(element.data);
          setOrdineorig(element.data);
          setArrayOfCart(element.data.orderList);
        }
      });
    }
  }, [idOfOrder]);

  useEffect(() => {
    let sumPrice = 0;

    console.log({ arrayOfCart });
    arrayOfCart.forEach((el) => {
      //ma xke ce li passa diversamente?! >:c
      sumPrice = sumPrice + el.quantity * el.product.unit_price;
    });

    setOrdine((prevState) => ({
      ...prevState,
      products: arrayOfCart,
      price: sumPrice.toFixed(2),
    }));
  }, [arrayOfCart]);

  const modifyInfo = () => {
    setIsOnModify(true);
  };

  const confirmSave = () => {
    setError("");
    //console.log({ ordine });
    if (ordine.id_order) {
      if (error === "") {
        setIsOnModify(false);
        //console.log(ordine);
        if (mod === "new") {
          createOrder(ordine).then((element) => {
            if (element.isError) {
              setError(element.messageError);
            } else {
              setOrdine(ordineorig);
              setMsgConferma(true);
            }
          });
        } else {
          modifyOrder(ordine).then((element) => {
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
        style={{ width: "50%" }}
      >
        {idOfOrder
          ? "Modifica ordine numero " + idOfOrder
          : "Aggiungi un nuovo ordine"}
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
                      src={require(`../../img/scatola_cartone.png`)}
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
                          htmlFor="orderStatus"
                          className="col-md-3 col-form-label"
                        >
                          Stato*
                        </label>
                        <div className="col-md-9">
                          <select
                            disabled={!isOnModify || mod === "new"}
                            className={
                              (!isOnModify || mod === "new"
                                ? "form-control-plaintext"
                                : "form-control") + " custom-select"
                            }
                            id="orderStatus"
                            value={ordine.id_order_status}
                            onChange={(el) => {
                              setOrdine({
                                ...ordine,
                                id_order_status: el.target.value,
                              });
                            }}
                          >
                            {status.length > 0 &&
                              status.map((s, key) => {
                                return (
                                  <option key={key} value={s.id_order_status}>
                                    {s.status}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="descrizioneordine"
                          className="col-md-3 col-form-label"
                        >
                          Cliente*
                        </label>
                        <div className="col-md-9">
                          <select
                            disabled={!isOnModify}
                            className={
                              (!isOnModify
                                ? "w-100" // "form-control-plaintext toglie sfondo ma responsive"
                                : "form-control") + " custom-select"
                            }
                            id="captorre"
                            value={ordine.id_user_customer}
                            onChange={(el) => {
                              setOrdine({
                                ...ordine,
                                id_user_customer: el.target.value,
                              });
                            }}
                          >
                            <option value={""}></option>
                            {users &&
                              users.length > 0 &&
                              users.map((u, index) => {
                                return (
                                  <option
                                    key={index}
                                    value={u.id_user_customer}
                                  >
                                    {capitalizeFirstLetter(u.first_name) +
                                      " " +
                                      capitalizeFirstLetter(u.last_name) +
                                      " ~ " +
                                      u.email}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="indirizzoordine"
                          className="col-md-3 col-form-label"
                        >
                          Data
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
                            id="indirizzoordine"
                            value={convertToDateIT(ordine.order_date)}
                            onChange={(el) => {
                              setOrdine({
                                ...ordine,
                                order_date: el.target.value,
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
                        Tracking
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          disabled={true}
                          className={
                            true
                              ? "w-100" // "form-control-plaintext toglie sfondo ma responsive"
                              : "form-control"
                          }
                          id="latitudine"
                          value={ordine.tracking_code}
                          onChange={(el) => {
                            setOrdine({
                              ...ordine,
                              tracking_code: el.target.value,
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
                        Spedizione
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          disabled={true}
                          className={
                            true
                              ? "w-100" // "form-control-plaintext toglie sfondo ma responsive"
                              : "form-control"
                          }
                          id="longitudine"
                          value={convertToDateIT(ordine.start_shipping_date)}
                          onChange={(el) => {
                            setOrdine({
                              ...ordine,
                              start_shipping_date: el.target.value,
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
                        Prevista
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          disabled={true}
                          className={
                            true
                              ? "w-100" // "form-control-plaintext toglie sfondo ma responsive"
                              : "form-control"
                          }
                          id="capordine"
                          value={convertToDateIT(ordine.expected_delivery_date)}
                          onChange={(el) => {
                            setOrdine({
                              ...ordine,
                              expected_delivery_date: el.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="capordine"
                        className="col-sm-4 col-form-label"
                      >
                        Consegna
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          disabled={true}
                          className={
                            true
                              ? "w-100" // "form-control-plaintext toglie sfondo ma responsive"
                              : "form-control"
                          }
                          id="capordine"
                          value={ordine.delivery_data}
                          onChange={(el) => {
                            setOrdine({
                              ...ordine,
                              delivery_data: el.target.value,
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
                        Prezzo
                      </label>
                      <div className="col-md-5 col-sm-9">
                        <input
                          type="text"
                          min={0}
                          disabled={true}
                          className={
                            true
                              ? "w-100" // "form-control-plaintext toglie sfondo ma responsive"
                              : "form-control"
                          }
                          id="cittaordine"
                          value={ordine.price + " €"}
                          onChange={(el) => {
                            setOrdine({
                              ...ordine,
                              price: el.target.value,
                            });
                          }}
                        />
                      </div>
                      <label
                        htmlFor="pubblicaPrivata"
                        className="col-md-2 col-sm-3 col-form-label"
                      >
                        Sconto
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
                          value={ordine.discount}
                          onChange={(el) => {
                            setOrdine({
                              ...ordine,
                              discount: el.target.value,
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
                  <div
                    style={{ textAlign: "left" }}
                    className={
                      " p-3 col-12 " +
                      (darkMode
                        ? "testolight sfondocard1"
                        : "testodark sfondocard3")
                    }
                  >
                    {
                      <AddProductToOrder
                        arrayOfCart={arrayOfCart}
                        setArrayOfCart={setArrayOfCart}
                        isOnModify={isOnModify}
                        mod={mod}
                      ></AddProductToOrder>
                    }
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
            {msgConferma && (
              <div style={{ textAlign: "left" }}>
                <p className="alert alert-success mt-3">
                  <b>Creato!</b>
                  <br></br>
                  <span>
                    L'orine è stato {mod === "new" ? "creato" : "modificato"}{" "}
                    con successo! Tornare alla pagina dei dipendenti per vederne
                    i dettagli
                  </span>
                </p>
              </div>
            )}
            <p>
              <button
                disabled={!isOnModify}
                type="button"
                onClick={() =>
                  setOrdine({
                    id_order: "Generato automaticamente",
                    order_date: new Date().toLocaleDateString("it-IT"),
                    order_status: 2,
                    courier_name: "",
                    tracking_code: "Generato automaticamente",
                    start_shipping_date: "",
                    expected_delivery_date: "Generato automaticamente",
                    delivery_data: "Generato automaticamente",
                    original_price: "calcolato db",
                    discount: "c db",
                    price: 0,
                    id_user_customer: "",
                    products: [],
                  })
                }
                className={
                  "btn btn-outline-info mr-1 " +
                  (darkMode ? "nav2buttonl" : "nav2button")
                }
              >
                <i className="bi bi-trash3"></i>
              </button>
              <button
                disabled={!isOnModify}
                type="button"
                onClick={() => {
                  setOrdine(ordineorig);
                }}
                className={
                  "btn btn-outline-info ml-1 " +
                  (darkMode ? "nav2buttonl" : "nav2button")
                }
              >
                <i className="bi bi-arrow-clockwise"></i>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { OrderNewModPage };
