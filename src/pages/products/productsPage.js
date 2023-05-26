import { DarkModeContext } from "../../theme/DarkModeContext";
import { useContext, useEffect, useState } from "react";
import { retrieveAllProducts } from "../../api/indexTreessueApi";
import CardProduct from "../../components/cardProduct";
import { useNavigate } from "react-router-dom";
import { useWindowDimensions } from "../../utils/useWindowDimensions.js";

const ProductsPage = ({ totalOrders }) => {
  const { darkMode } = useContext(DarkModeContext);
  const [products, setProducts] = useState([]); //lista tutti prodotti
  const [error, setError] = useState("Caricamento dei dati in corso!");
  const { wi } = useWindowDimensions();
  const navigate = useNavigate();

  useEffect(() => {
    retrieveAllProducts().then((element) => {
      if (element.isError) {
        setError(element.messageError);
      } else {
        setError("");
        setProducts(element.data);
      }
    });
  }, []);

  return (
    <div>
      <div className="detailsPage">
        {error && (
          <div style={{ textAlign: "left", width: "100%" }}>
            <p className="alert alert-danger mt-3">
              <b>Attenzione!</b>
              <br></br>
              <span>{error}</span>
            </p>
          </div>
        )}
        <div className="row">
          <h2 className={"col-6 " + (darkMode ? "testolight" : "testodark")}>
            Magazzino
          </h2>
          <p className="col-6" style={{ textAlign: "right" }}>
            <button
              type="button"
              className={
                "btn btn-outline-info " +
                (darkMode ? "nav2button" : "nav2buttonl")
              }
              onClick={() => {
                navigate("/store/new");
              }}
            >
              <i className="bi bi-plus"></i>
              {" Aggiungi"}
            </button>
          </p>
        </div>
        <div className=" text flex-column" style={{}}>
          <div className="row flex-wrap align-items-center">
            <div
              className={
                "col-12 text-center pt-3  pb-3 " +
                (darkMode ? "sfondo3" : "sfondo1")
              }
            >
              {!(products.length > 0) && (
                <p className={!darkMode ? "testolight" : "testodark"}>
                  Non ci sono prodotti
                </p>
              )}
              {wi > 1199 && <CardProduct indice={-1} key={-1}></CardProduct>}
              {products.length > 0 &&
                products.map((product) => {
                  /*const order = orders.find(
                    //(singleProd) => singleProd.id === element.productId
                    (singleProd) => {
                      return singleProd.id_product === element.id_product;
                    }
                  );*/

                  return (
                    <CardProduct
                      prodotto={product}
                      //key={element.id}
                      key={product.id_product}
                    ></CardProduct>
                  );
                })}
              {/*!orders.length > 0 && <p>Non hai ancora ordinato nulla</p>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProductsPage };
