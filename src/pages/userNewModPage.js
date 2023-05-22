import "../pages/pages.css";
import userImagePlaceHolder from "../img/user_placeholder.png";
import { DarkModeContext } from "../theme/DarkModeContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import prov from "../utils/province.json";
import { retrieveSingleUserDetails } from "../api/indexTreessueApi";

//ciaooo
function UserNewModPage({ mod }) {
  //const dispatch = useDispatch();
  //const user = useSelector((state) => state.sessionInfo.user);
  const params = useParams();
  var idOfUser = undefined;
  const { darkMode } = useContext(DarkModeContext);
  const [isOnModify, setIsOnModify] = useState(mod === "detail" ? false : true);
  const [error, setError] = useState("");
  const [account, setAccount] = useState({
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
  });
  const [accountorig, setAccountorig] = useState({
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
  });

  if (params.id) {
    idOfUser = parseInt(params?.id);
  }

  useEffect(() => {
    if (idOfUser) {
      retrieveSingleUserDetails(idOfUser).then((element) => {
        if (element.isError) {
          setError(element.messageError);
        } else {
          setError("");
          setAccount(element.data);
          setAccountorig(element.data);
        }
      });
    }
  }, [idOfUser]);

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

    if (account.is_active === "") {
      setError("Impostare se l'utente è attivo o disattivato!");
    }

    if (
      account.phone_number?.length > 0 &&
      !isValidPhone(account.phone_number)
    ) {
      setError("Numero di telefono non valido!");
    }

    if (!isValidEmail(account.email)) {
      setError("Email non valida!");
    }

    if (!account.first_name || !account.last_name) {
      setError("Compilare il nome e il cognome!");
    }
  }, [
    account.email,
    account.phone_number,
    account.first_name,
    account.last_name,
    account.password,
    account,
  ]);

  const confirmSave = () => {
    if (
      account.email &&
      account.first_name &&
      account.last_name &&
      account.is_active !== ""
    ) {
      if (error === "" || error === null) {
        //chiamata di api di salvataggio

        //se corretto
        setIsOnModify(false);
        //dispatch(setSessionUser({ user: account }));
      }
    }
  };

  return (
    <div className="detailsPage">
      <h2
        className={darkMode ? "testolight" : "testodark"}
        style={{ width: "50%" }}
      >
        {idOfUser
          ? "Modifica Utente " + account.first_name + " " + account.last_name
          : "Aggiungi un nuovo utente"}
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
                          Password
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
                            value={account.first_name}
                            onChange={(el) => {
                              setAccount({
                                ...account,
                                first_name: el.target.value,
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
                            value={account.last_name}
                            onChange={(el) => {
                              setAccount({
                                ...account,
                                last_name: el.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
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
                            value={account.is_active}
                            onChange={(el) => {
                              setAccount({
                                ...account,
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
                          value={account.phone_number}
                          onChange={(el) => {
                            setAccount({
                              ...account,
                              phone_number: el.target.value,
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
                          value={account.birth_date}
                          onChange={(el) => {
                            setAccount({
                              ...account,
                              birth_date: el.target.value,
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
                          value={account.zip_code}
                          onChange={(el) => {
                            setAccount({
                              ...account,
                              zip_code: el.target.value,
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
                disabled={!isOnModify}
                type="button"
                onClick={() =>
                  setAccount({
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
                  setAccount(accountorig);
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

export { UserNewModPage };
