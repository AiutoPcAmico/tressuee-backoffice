import "../pages/pages.css";
import userImagePlaceHolder from "../img/user_placeholder.png";
import { DarkModeContext } from "../theme/DarkModeContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import prov from "../utils/province.json";
import { useDispatch, useSelector } from "react-redux";
import { destroySession, setSessionUser } from "../stores/sessionInfo";

//ciaooo
function AccountPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.sessionInfo.user);

  const { darkMode } = useContext(DarkModeContext);
  const [isOnModify, setIsOnModify] = useState(false);
  const [error, setError] = useState(null);
  const [account, setAccount] = useState({
    email: user.email || "",
    password: user.password || "",
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    phoneNumber: user.phoneNumber || "",
    address: user.address || "",
    birthDate: user.birthDate || "", //data gg-mm-aaaa
    zipCode: user.zipCode || "",
    city: user.city || "",
    province: user.province || "",
  });

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
    if (!account.password) {
      setError("Inserire la nuova (o vecchia) password");
    }

    if (!account.firstName || !account.lastName) {
      setError("Compilare il nome e il cognome!");
    }

    if (account.phoneNumber.length > 0 && !isValidPhone(account.phoneNumber)) {
      setError("Numero di telefono non valido!");
    }

    if (!isValidEmail(account.email)) {
      setError("Email non valida!");
    }
  }, [
    account.email,
    account.phoneNumber,
    account.firstName,
    account.lastName,
    account.password,
  ]);

  const confirmSave = () => {
    console.log({ account });

    if (
      account.email &&
      account.password &&
      account.firstName &&
      account.lastName
    ) {
      if (error === null) {
        //chiamata di api di salvataggio

        //se corretto
        setIsOnModify(false);
        dispatch(setSessionUser({ user: account }));
      }
    }
    console.log({ account });
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
        Account
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
                            value={account.email}
                            onChange={(el) => {
                              setAccount({
                                ...account,
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
                            value={account.password}
                            onChange={(el) => {
                              setAccount({
                                ...account,
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
                            value={account.firstName}
                            onChange={(el) => {
                              setAccount({
                                ...account,
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
                            value={account.lastName}
                            onChange={(el) => {
                              setAccount({
                                ...account,
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
                          value={account.phoneNumber}
                          onChange={(el) => {
                            setAccount({
                              ...account,
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
                          value={account.address}
                          onChange={(el) => {
                            setAccount({
                              ...account,
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
                          value={account.birthDate}
                          onChange={(el) => {
                            setAccount({
                              ...account,
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
                          value={account.zipCode}
                          onChange={(el) => {
                            setAccount({
                              ...account,
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
                          value={account.city}
                          onChange={(el) => {
                            setAccount({ ...account, city: el.target.value });
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
                          value={account.province}
                          onChange={(el) => {
                            setAccount({
                              ...account,
                              province: el.target.value,
                            });
                          }}
                        >
                          <option value={""}></option>
                          {
                            //se vuoto prende la prima in automatico
                            prov.map((p) => {
                              if (p.sigla === account.province) {
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
        I tuoi dispositivi
        <div className="d-flex flex-wrap justify-content-center">
          {/*listProduct.map((p, i) => {
          return (
            <CardProdotto
              singleProduct={p}
              indice={i}
              key={p.id}
            ></CardProdotto>
          );
        })*/}
          <div
            className={"card m-2 " + (darkMode ? "sfondocard2" : "sfondocard1")}
            style={{ width: "18rem" }}
            onClick={() => {
              //navigateToDetails(singleProduct.id);
            }}
          >
            <img
              //src={getImage()}
              className="card-img-top mx-auto mt-1"
              //alt={`${singleProduct.category} icon`}
              style={{ width: "150px" }}
              alt="icon"
            />

            <div className="card-body">
              <h5 className="card-title">{/*singleProduct.name*/}nome</h5>
              <p className="card-text small">
                {/*(Math.round(singleProduct.unitPrice * 100) / 100).toFixed(2)*/}{" "}
                tipo
              </p>
              <p className="card-text">se torre num fazzoletti?</p>

              <button
                className="btn btn-outline-info nav2button"
                onClick={() => {
                  //navigateToDetails(singleProduct.id);
                }}
              >
                Visualizza i dettagli!
              </button>
            </div>
          </div>
          <div
            className={"card m-2 " + (darkMode ? "sfondocard2" : "sfondocard1")}
            style={{ width: "18rem" }}
            onClick={() => {
              //navigateToDetails(singleProduct.id);
            }}
          >
            <img
              //src={getImage()}
              className="card-img-top mx-auto mt-1"
              //alt={`${singleProduct.category} icon`}
              style={{ width: "150px" }}
            />

            <div className="card-body">
              <h5 className="card-title">
                {/*singleProduct.name*/}nome pagina per
                modifica?????????????????????????????????????
              </h5>
              <p className="card-text small">
                {/*(Math.round(singleProduct.unitPrice * 100) / 100).toFixed(2)*/}{" "}
                tipo
              </p>
              <p className="card-text">Affrettati!</p>

              <button
                className="btn btn-outline-info nav2button"
                onClick={() => {
                  //navigateToDetails(singleProduct.id);
                }}
              >
                Visualizza i dettagli!
              </button>
            </div>
          </div>
          <div
            className={"card m-2 " + (darkMode ? "sfondocard2" : "sfondocard1")}
            style={{ width: "18rem" }}
            onClick={() => {
              //navigateToDetails(singleProduct.id);
            }}
          >
            <img
              //src={getImage()}
              className="card-img-top mx-auto mt-1"
              //alt={`${singleProduct.category} icon`}
              style={{ width: "150px" }}
            />

            <div className="card-body">
              <h5 className="card-title">{/*singleProduct.name*/}nome dato</h5>
              <p className="card-text small">
                {/*(Math.round(singleProduct.unitPrice * 100) / 100).toFixed(2)*/}{" "}
                tipo articolo
              </p>
              <p className="card-text">se si tiene colori alternati</p>

              <button
                className="btn btn-outline-info nav2button"
                onClick={() => {
                  //navigateToDetails(singleProduct.id);
                }}
              >
                Visualizza i dettagli!
              </button>
            </div>
          </div>
          <div
            className={"card m-2 " + (darkMode ? "sfondocard2" : "sfondocard1")}
            style={{ width: "18rem" }}
            onClick={() => {
              //navigateToDetails(singleProduct.id);
            }}
          >
            <img
              //src={getImage()}
              className="card-img-top mx-auto mt-1"
              //alt={`${singleProduct.category} icon`}
              style={{ width: "150px" }}
            />

            <div className="card-body">
              <h5 className="card-title">{/*singleProduct.name*/}nome</h5>
              <p className="card-text small">
                {/*(Math.round(singleProduct.unitPrice * 100) / 100).toFixed(2)*/}{" "}
                tipo
              </p>
              <p className="card-text">La spedizione gratuita!</p>

              <button
                className="btn btn-outline-info nav2button"
                onClick={() => {
                  //navigateToDetails(singleProduct.id);
                }}
              >
                Visualizza i dettagli!
              </button>
            </div>
          </div>
          <div
            className={"card m-2 " + (darkMode ? "sfondocard2" : "sfondocard1")}
            style={{ width: "18rem" }}
            onClick={() => {
              //navigateToDetails(singleProduct.id);
            }}
          >
            <img
              //src={getImage()}
              className="card-img-top mx-auto mt-1"
              //alt={`${singleProduct.category} icon`}
              style={{ width: "150px" }}
            />

            <div className="card-body">
              <h5 className="card-title">{/*singleProduct.name*/}nome</h5>
              <p className="card-text">
                {/*(Math.round(singleProduct.unitPrice * 100) / 100).toFixed(2)*/}{" "}
                tipo
              </p>
              <p className="card-text">Affrettati! La spedizione è gratuita!</p>

              <button
                className="btn btn-outline-info nav2button"
                onClick={() => {
                  //navigateToDetails(singleProduct.id);
                }}
              >
                Visualizza i dettagli!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { AccountPage };
