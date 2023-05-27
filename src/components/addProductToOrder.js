import { retrieveAllProducts } from "../api/indexTreessueApi";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../theme/DarkModeContext";
import { useWindowDimensions } from "../utils/useWindowDimensions";

function AddProductToOrder({ arrayOfCart, setArrayOfCart, isOnModify }) {
  const { darkMode } = useContext(DarkModeContext);
  const [products, setProducts] = useState([]);
  const [saveEnabled, setSaveEnabled] = useState(false);
  const { wi } = useWindowDimensions();
  const [selected, setSelected] = useState({
    id: 0,
    quantity: 1,
  });

  useEffect(() => {
    retrieveAllProducts().then((element) => {
      if (!element.isError) {
        setProducts(element.data);
      } else {
        console.error("errore durante il recupero dei prodotti disponibili");
      }
    });
  }, []);

  function addToCart() {
    //console.log({ arrayOfCart });
    let previous = undefined;
    arrayOfCart.map((el) => {
      if (el.product.id_product === selected.id) {
        previous = el;
        el.quantity = el.quantity + selected.quantity;
      }
    });
    if (previous) {
      //previous.quantity = previous.quantity + selected.quantity;
      setArrayOfCart(JSON.parse(JSON.stringify(arrayOfCart)));
    } else {
      const object = products.find((el) => el.id_product === selected.id);

      setArrayOfCart((prevState) => [
        ...prevState,
        { product: object, quantity: parseInt(selected.quantity) },
      ]);
    }
  }

  const del = (i) => {
    //console.log(arrayOfCart);
    //console.log(i); //splice non va boooh
    const x = arrayOfCart.filter((e, indice) => {
      if (i === indice) {
        return false;
      } else {
        return true;
      }
    });
    //console.log(x);
    setArrayOfCart(x);
  };

  useEffect(() => {
    //console.log({ selected });
    const value = parseInt(selected.quantity);
    if (selected.id && value >= 1) {
      setSaveEnabled(true);
    } else {
      setSaveEnabled(false);
    }
  }, [selected]);

  //console.log(darkMode);

  return (
    <div>
      {products && (
        <div>
          <div className="form-group row">
            <label htmlFor="latitudine" className="col-sm-3 col-form-label">
              Prodotti
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
                onChange={(el) => {
                  //console.log(el.target.value);
                  setSelected({ ...selected, id: parseInt(el.target.value) });
                }}
              >
                <option value={""}></option>
                {products &&
                  products.length > 0 &&
                  products.map((p, index) => {
                    return (
                      <option key={index} value={p.id_product}>
                        {p.prod_name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          {/*qui */}
          <div className="form-group row">
            <label
              htmlFor="cittaordine"
              className="col-md-2 col-sm-3 col-form-label"
            >
              Quantita'
            </label>
            <div className="col-md-5 col-sm-9">
              <input
                type="number"
                min={1}
                disabled={!isOnModify}
                className={
                  !isOnModify
                    ? "w-100" // "form-control-plaintext toglie sfondo ma responsive"
                    : "form-control"
                }
                id="cittaordine"
                value={selected.quantity}
                onChange={(el) => {
                  setSelected({
                    ...selected,
                    quantity: el.target.value,
                  });
                }}
              />
            </div>
            <div className="col-md-5 text-center">
              <button
                onClick={addToCart}
                className={
                  "btn btn-outline-info " +
                  (darkMode ? "nav2button" : "nav2buttonl")
                }
                disabled={!saveEnabled}
              >
                aggiungi
              </button>
            </div>
          </div>
          <div
            style={{ display: "flex" }}
            className="justify-content-center flex-wrap"
          >
            <div
              className={" row m-1 "}
              style={{ width: wi > 767 ? "80%" : "100%" }}
            >
              <div className="col-5">Prodotti aggiunti</div>
              <div className="col-4">quantita'</div>
              <div className="col-3"></div>
            </div>
            {arrayOfCart &&
              arrayOfCart.map((prod, i) => {
                return (
                  <div
                    className={
                      " p-2 row m-1 " + (darkMode ? "sfondo3" : "sfondo1")
                    }
                    style={{
                      color: "#212a3e",
                      width: wi > 767 ? "80%" : "100%",
                    }}
                    key={i}
                  >
                    <div className="col-5">{prod.product.prod_name}</div>
                    <div className="col-4">{prod.quantity}</div>
                    <div className="col-3">
                      <button
                        type="button"
                        className={
                          "btn btn-outline-danger " +
                          (darkMode ? "nav2button" : "nav2buttonl")
                        }
                        onClick={() => del(i)}
                      >
                        <i className="bi bi-trash3"></i>
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export { AddProductToOrder };
