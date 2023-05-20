import { DarkModeContext } from "../theme/DarkModeContext";
import { useContext, useEffect, useMemo, useState } from "react";
import base_images from "../img/base_image_temp.json";
import CardOrders from "../components/cardOrders";
import { useSelector } from "react-redux";
import { retrieveAllProducts, retrievePublicTowers } from "../api/indexTreessueApi";
import CardTower from "../components/cardTower";
import CardProduct from "../components/cardProduct";

const tempOrders = [
  {
    id_order: 1,
    name: "Fazzoletti 10",
    category: "fazzoletti",
    description: "Una descrizione per fazzoletti da 10",
    unitPrice: 10,
    isActive: true,
    quantity: 23,
    image: base_images.fazzoletti,
  },
];

const ProductsPage = ({ totalOrders }) => {
  const { darkMode } = useContext(DarkModeContext);
  const [products, setProducts] = useState([]); //lista tutti prodotti
  const [error, setError] = useState();

  useEffect(() => {
    retrieveAllProducts().then((element) => {
      //console.log(element);
      if (element.isError) {
        setError(element.messageError);
      } else {
        setError("");
        console.log(element.data);
        setProducts(element.data);
      }
    });
  }, []);

  return (
    <div>
      <div className="detailsPage">
        <div className="row">
        <h2 className={"col-6 "+(darkMode ? "testolight" : "testodark")}>Magazzino</h2>
        <p className="col-6" style={{ textAlign: "right" }}>
            <button
                type="button"
                className={
                  "btn btn-outline-info " +
                  (darkMode ? "nav2button" : "nav2buttonl")
                }
                //onClick={modifyInfo}
                
              >
                <i className="bi bi-plus"></i>
                {" nuovo"}
              </button></p>
              </div>
        <div className=" text flex-column" style={{}}>
          <div className="row flex-wrap align-items-center pb-3">
            <div
              className={
                "col-12 text-center pt-3 " + (darkMode ? "sfondo3" : "sfondo1")
              }
            >
              {!(products.length > 0) && (
                <p className={!darkMode ? "testolight" : "testodark"}>
                  Non ci sono prodotti
                </p>
              )}
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
