import { DarkModeContext } from "../theme/DarkModeContext";
import { useContext, useEffect, useState } from "react";
import CardOrders from "../components/cardOrders";
import { retrieveUserOrders } from "../api/indexTreessueApi";
import { useWindowDimensions } from "../utils/useWindowDimensions.js";
import { useNavigate } from "react-router-dom";

const OrdersPage = ({ totalOrders }) => {
  const { darkMode } = useContext(DarkModeContext);
  const [orders, setOrders] = useState([]); //lista tutti prodotti
  const [error, setError] = useState();
  const { wi } = useWindowDimensions();
  const navigate = useNavigate();

  useEffect(() => {
    retrieveUserOrders().then((element) => {
      //console.log(element);
      if (element.isError) {
        setError(element.messageError);
      } else {
        setError("");
        //console.log(element.data);
        setOrders(element.data);
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
            Ordini
          </h2>
          <p className="col-6" style={{ textAlign: "right" }}>
            <button
              type="button"
              className={
                "btn btn-outline-info " +
                (darkMode ? "nav2button" : "nav2buttonl")
              }
              onClick={() => {
                navigate("/orders/new");
              }}
            >
              <i className="bi bi-plus"></i>
              {" nuovo?"}
            </button>
          </p>
        </div>
        <div className=" text flex-column" style={{}}>
          <div className="row flex-wrap align-items-center">
            <div
              className={
                "col-12 text-center pt-3 pb-1 " +
                (darkMode ? "sfondo3" : "sfondo1")
              }
            >
              {!(orders.length > 0) && (
                <p className={!darkMode ? "testolight" : "testodark"}>
                  Nessun ordine
                </p>
              )}
              {wi > 1199 && <CardOrders indice={-1} key={-1}></CardOrders>}
              {orders.length > 0 &&
                orders.map((order) => {
                  /*const order = orders.find(
                    //(singleProd) => singleProd.id === element.productId
                    (singleProd) => {
                      return singleProd.id_product === element.id_product;
                    }
                  );*/

                  return (
                    <CardOrders
                      order={order}
                      //key={element.id}
                      key={order.id_order}
                    ></CardOrders>
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

export { OrdersPage };
