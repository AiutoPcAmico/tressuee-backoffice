import "../pages.css";
import { DarkModeContext } from "../../theme/DarkModeContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { retrieveSingleProduct } from "../../api/indexTreessueApi";

function ProductNewModPage({ mod }) {
  const params = useParams();

  const { darkMode } = useContext(DarkModeContext);
  const [isOnModify, setIsOnModify] = useState(mod === "detail" ? false : true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState({
    id_product: "Generato automaticamente",
    prod_name: "",
    category: "",
    description: "",
    unit_price: "",
    is_available: "",
    available_quantity: "",
    image: "",
    //pezzi magazzino
  });
  const [productorig, setProductorig] = useState({
    id_product: "Generato automaticamente", //quanli obblig?
    prod_name: "",
    category: "",
    description: "",
    unit_price: null,
    is_available: true,
    available_quantity: 1,
    image: "",
    //pezzi magazzino
  });
  var idOfProduct = undefined;

  if (params.id) {
    idOfProduct = parseInt(params?.id);
  }

  useEffect(() => {
    if (idOfProduct) {
      //retrieveDetailsOfProduct(idOfProduct).then((found) => {
      retrieveSingleProduct(idOfProduct).then((element) => {
        if (element.isError) {
          setError(element.messageError);
        } else {
          setError("");
          setProduct(element.data);
          setProductorig(element.data);
        }
      });
    }
  }, [idOfProduct]);

  const modifyInfo = () => {
    setIsOnModify(true);
  };

  useEffect(() => {
    setError(null);
    if (!product.prod_name) {
      setError("Inserire nome");
    }

    if (!product.category) {
      setError("Compilare categoria");
    }
  }, [product.prod_name, product.category]);

  const confirmSave = () => {
    if (
      product.prod_name &&
      product.category /* &&
      product.firstName &&
      product.lastName*/
    ) {
      if (error === null) {
        //chiamata di api di salvataggio

        //se corretto
        setIsOnModify(false);
        //dispatch(setSessionUser({ user: product }));
      }
    }
  };

  return (
    <div className="detailsPage">
      <h2
        className={darkMode ? "testolight" : "testodark"}
        style={{ width: "100%" }}
      >
        {idOfProduct
          ? "Modifica del prodotto " + product.prod_name
          : "Aggiunta di un nuovo prodotto"}
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
              {/*<h2 className={darkMode ? "testolight" : "testodark"}>product</h2>*/}
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
                      src={
                        product.image
                          ? require(`../../img/${product.image}`)
                          : require(`../../img/intero.png`)
                      }
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
                          htmlFor="idproduct"
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
                            id="idproduct"
                            value={product.id_product}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="titoloproduct"
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
                            id="titoloproduct"
                            value={product.prod_name}
                            onChange={(el) => {
                              setProduct({
                                ...product,
                                prod_name: el.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="descrizioneproduct"
                          className="col-md-4 col-form-label"
                        >
                          Descrizione*
                        </label>
                        <div className="col-md-8">
                          <textarea
                            type="text"
                            rows={6}
                            disabled={!isOnModify}
                            className={
                              !isOnModify
                                ? "w-100" // "form-control-plaintext toglie sfondo ma responsive"
                                : "form-control"
                            }
                            id="descrizioneproduct"
                            value={product.description}
                            onChange={(el) => {
                              setProduct({
                                ...product,
                                description: el.target.value,
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
                        htmlFor="cittaproduct"
                        className="col-md-2 col-sm-3 col-form-label"
                      >
                        Prezzo
                      </label>
                      <div className="col-md-4 col-sm-9">
                        <input
                          type="number"
                          min={0}
                          disabled={!isOnModify}
                          className={
                            !isOnModify
                              ? "w-100" // "form-control-plaintext toglie sfondo ma responsive"
                              : "form-control"
                          }
                          id="cittaproduct"
                          value={product.unit_price}
                          onChange={(el) => {
                            setProduct({
                              ...product,
                              unit_price: el.target.value,
                            });
                          }}
                        />
                      </div>
                      <label
                        htmlFor="pubblicaPrivata"
                        className="col-md-2 col-sm-4 col-form-label"
                      >
                        Categoria*
                      </label>
                      <div className="col-md-4 col-sm-8">
                        <select
                          disabled={!isOnModify}
                          className={
                            (!isOnModify
                              ? "form-control-plaintext"
                              : "form-control") + " custom-select"
                          }
                          id="pubblicaPrivata"
                          value={product.category}
                          onChange={(el) => {
                            setProduct({
                              ...product,
                              category: el.target.value,
                            });
                          }}
                        >
                          <option value={""}></option>
                          <option value={true}>??????</option>
                          <option value={false}>???</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="cittaproduct"
                        className="col-md-3 col-sm-3 col-form-label"
                      >
                        Quantita'
                      </label>
                      <div className="col-md-3 col-sm-9">
                        <input
                          type="number"
                          min={0}
                          disabled={!isOnModify}
                          className={
                            !isOnModify
                              ? "w-100" // "form-control-plaintext toglie sfondo ma responsive"
                              : "form-control"
                          }
                          id="cittaproduct"
                          value={product.available_quantity}
                          onChange={(el) => {
                            setProduct({
                              ...product,
                              available_quantity: el.target.value,
                            });
                          }}
                        />
                      </div>
                      <label
                        htmlFor="pubblicaPrivata"
                        className="col-md-3 col-sm-4 col-form-label"
                      >
                        Disponibile*
                      </label>
                      <div className="col-md-3 col-sm-8">
                        <select
                          disabled={!isOnModify}
                          className={
                            (!isOnModify
                              ? "form-control-plaintext"
                              : "form-control") + " custom-select"
                          }
                          id="pubblicaPrivata"
                          value={product.is_available}
                          onChange={(el) => {
                            setProduct({
                              ...product,
                              is_available: el.target.value,
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

            <p>
              <button
                disabled={!isOnModify}
                type="button"
                onClick={() =>
                  setProduct({
                    prod_name: "",
                    category: "",
                    description: "",
                    unit_price: "",
                    is_available: "",
                    available_quantity: "",
                    image: "",
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
                  setProduct(productorig);
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

export { ProductNewModPage };
