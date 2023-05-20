import "../pages/pages.css";
import userImagePlaceHolder from "../img/user_placeholder.png";
import { DarkModeContext } from "../theme/DarkModeContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import prov from "../utils/province.json";
import { useDispatch, useSelector } from "react-redux";
import { destroySession, setSessionUser } from "../stores/sessionInfo";
import { retrieveSingleProduct } from "../api/indexTreessueApi";

//ciaooo
function ProductNewModPage({mod}) {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);
  const [height, setHeight] = useState(0);
 // const [quantity, setQuantity] = useState(1);
  const [isOnModify, setIsOnModify] = useState(mod==="detail"? false : true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState({
    id_product: null,
    prod_name: "",
    category: "",
    description: "",
    unit_price: null,
    is_available: true,
    quantity: 1,
    image: "",
    //pezzi magazzino
  });
  const idOfProduct = params.id? parseInt(params.id): -1;

  useEffect(() => {
    if(idOfProduct!==-1){
    //retrieveDetailsOfProduct(idOfProduct).then((found) => {
      retrieveSingleProduct(idOfProduct).then((element) => {
        if (element.isError) {
          setError(element.messageError);
        } else {
          setError("");
          setProduct(element.data);
          console.log(element.data);
        }
      });
    }

  }, [idOfProduct]);

  const modifyInfo = () => {
    setIsOnModify(true);
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function isValidPhone(numberString) {
    return /(^3\d{2}\d{7}$)|(^0\d{2,3}\d{4,6}$)/.test(numberString);
  }

  useEffect(() => {
    setError(null);
    if (!product.password) {
      setError("Inserire la nuova (o vecchia) password");
    }

    if (!product.firstName || !product.lastName) {
      setError("Compilare il nome e il cognome!");
    }

    if (product.phoneNumber.length > 0 && !isValidPhone(product.phoneNumber)) {
      setError("Numero di telefono non valido!");
    }

    if (!isValidEmail(product.email)) {
      setError("Email non valida!");
    }
  }, [
    product.email,
    product.phoneNumber,
    product.firstName,
    product.lastName,
    product.password,
  ]);

  const confirmSave = () => {
    console.log({ product });

    if (
      product.email &&
      product.password &&
      product.firstName &&
      product.lastName
    ) {
      if (error === null) {
        //chiamata di api di salvataggio

        //se corretto
        setIsOnModify(false);
        dispatch(setSessionUser({ user: product }));
      }
    }
    console.log({ product });
  };

  function logout() {
    dispatch(destroySession());
    navigate("/");
  }

  return (
    <div className="detailsPage">
      <h2
        className={darkMode ? "testolight" : "testodark"}
        style={{ width: "50%" }}
      >
        Prodotto
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
              {/*<h2 className={darkMode ? "testolight" : "testodark"}>Account</h2>*/}
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
                            value={product.email}
                            onChange={(el) => {
                              setProduct({
                                ...product,
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
                            value={product.password}
                            onChange={(el) => {
                              setProduct({
                                ...product,
                                password: el.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="nomeaccount"
                          className="col-lg-3 col-form-label"
                        >
                          Nome*
                        </label>
                        <div className="col-lg-3">
                          <input
                            type="text"
                            disabled={!isOnModify}
                            className={
                              !isOnModify
                                ? "w-100" // "form-control-plaintext toglie sfondo ma responsive"
                                : "form-control"
                            }
                            id="nomeaccount"
                            value={product.firstName}
                            onChange={(el) => {
                              setProduct({
                                ...product,
                                firstName: el.target.value,
                              });
                            }}
                          />
                        </div>
                        <label
                          htmlFor="cognomeaccount"
                          className="col-lg-3 col-form-label"
                        >
                          Cognome*
                        </label>
                        <div className="col-lg-3">
                          <input
                            type="text"
                            disabled={!isOnModify}
                            className={
                              !isOnModify
                                ? "w-100" // "form-control-plaintext toglie sfondo ma responsive"
                                : "form-control"
                            }
                            id="cognomeaccount"
                            value={product.lastName}
                            onChange={(el) => {
                              setProduct({
                                ...product,
                                lastName: el.target.value,
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
                        htmlFor="telefonoaccount"
                        className="col-sm-3 col-form-label"
                      >
                        Telefono
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          disabled={!isOnModify}
                          className={
                            !isOnModify
                              ? "w-100" // "form-control-plaintext toglie sfondo ma responsive"
                              : "form-control"
                          }
                          id="telefonoaccount"
                          value={product.phoneNumber}
                          onChange={(el) => {
                            setProduct({
                              ...product,
                              phoneNumber: el.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="indirizzoaccount"
                        className="col-sm-3 col-form-label"
                      >
                        Indirizzo
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          disabled={!isOnModify}
                          className={
                            !isOnModify
                              ? "w-100" // "form-control-plaintext toglie sfondo ma responsive"
                              : "form-control"
                          }
                          id="indirizzoaccount"
                          value={product.address}
                          onChange={(el) => {
                            setProduct({
                              ...product,
                              address: el.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="dataaccount"
                        className="col-md-3 col-sm-3 col-form-label"
                      >
                        Data di nascita
                      </label>
                      {/*diversi step funzionano? */}
                      <div className="col-md-5 col-sm-9">
                        <input
                          type="date"
                          disabled={!isOnModify}
                          className={
                            !isOnModify
                              ? "w-100" // "form-control-plaintext toglie sfondo ma responsive"
                              : "form-control"
                          }
                          max={new Date().toISOString().split("T")[0]}
                          min={
                            new Date(
                              new Date().setFullYear(
                                new Date().getFullYear() - 100
                              )
                            )
                              .toISOString()
                              .split("T")[0]
                          }
                          id="dataaccount"
                          value={product.birthDate}
                          onChange={(el) => {
                            setProduct({
                              ...product,
                              birthDate: el.target.value,
                            });
                          }}
                        />
                      </div>
                      <label
                        htmlFor="capaccount"
                        className="col-md-1 col-sm-3 col-form-label"
                      >
                        Cap
                      </label>
                      <div className="col-md-3 col-sm-9">
                        <input
                          type="text"
                          maxLength={5}
                          disabled={!isOnModify}
                          className={
                            !isOnModify
                              ? "w-100" // "form-control-plaintext toglie sfondo ma responsive"
                              : "form-control"
                          }
                          id="capaccount"
                          value={product.zipCode}
                          onChange={(el) => {
                            setProduct({
                              ...product,
                              zipCode: el.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="cittaaccount"
                        className="col-md-2 col-sm-3 col-form-label"
                      >
                        Citta'
                      </label>
                      <div className="col-md-5 col-sm-9">
                        <input
                          type="text"
                          disabled={!isOnModify}
                          className={
                            !isOnModify
                              ? "w-100" // "form-control-plaintext toglie sfondo ma responsive"
                              : "form-control"
                          }
                          id="cittaaccount"
                          value={product.city}
                          onChange={(el) => {
                            setProduct({ ...product, city: el.target.value });
                          }}
                        />
                      </div>
                      <label
                        htmlFor="provinciaaccount"
                        className="col-md-2 col-sm-3 col-form-label"
                      >
                        Provincia
                      </label>
                      <div className="col-md-3 col-sm-9">
                        <select
                          disabled={!isOnModify}
                          className={
                            (!isOnModify
                              ? "form-control-plaintext"
                              : "form-control") + " custom-select"
                          }
                          id="provinciaaccount"
                          value={product.province}
                          onChange={(el) => {
                            setProduct({
                              ...product,
                              province: el.target.value,
                            });
                          }}
                        >
                          <option value={""}></option>
                          {
                            //se vuoto prende la prima in automatico
                            prov.map((p) => {
                              if (p.sigla === product.province) {
                                return (
                                  <option selected key={p.sigla}>
                                    {p.sigla}
                                  </option>
                                );
                              } else {
                                return <option key={p.sigla}>{p.sigla}</option>;
                              }
                            })
                          }
                        </select>
                        {/*<input
                          type="text"
                          disabled={!isOnModify}
                          className={
                            !isOnModify
                              ? "form-control-plaintext"
                              : "form-control"
                          }
                          id="provinciaaccount"
                          value={account.province}
                          onChange={(el) => {
                            setAccount({
                              ...account,
                              province: el.target.value,
                            });
                          }}
                        />*/}
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
                type="button"
                onClick={logout}
                className={
                  "btn btn-outline-info " +
                  (darkMode ? "nav2buttonl" : "nav2button")
                }
              >
                Logout
              </button>
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export { ProductNewModPage };
