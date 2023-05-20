import { DarkModeContext } from "../theme/DarkModeContext";
import { useContext } from "react";
import DialogOrderDetail from "./dialogOrderDetail";
import { InnerCard } from "./innerCard";

function CardOrders({ order }) {
  const { darkMode } = useContext(DarkModeContext);

  //console.log(order);

  return (
    <div>
    <div
      className={"card mb-3 " + (darkMode ? "sfondocard1" : "sfondocard3")}
      style={{ width: "100%" }}
      data-toggle="modal" data-target="#exampleModal"
    >
      
      <div className="d-flex flex-wrap justify-content-center row m-0">
        <div
          className={"card col-sm-3 col-md-2 col-lg-1 p-0 innercardorders"}
        >
          <InnerCard title={"Codice"} description={order.id_order}></InnerCard>
        </div>
        <div
          className={"card col-sm-4 col-md-3 col-lg-3 col-xl-2 p-0 innercardorders"}
        >
          <InnerCard title={"Corriere"} description={order.courier_name}></InnerCard>
        </div>
        <div
          className={"card col-sm-4 col-md-3 col-lg-2 p-0 innercardorders"}
        >
          <InnerCard title={"Stato"} description={order.order_status}></InnerCard>
        </div>
        <div
          className={"card col-sm-4 col-md-3 col-lg-3 col-xl-2 p-0 innercardorders"}
        >
          <InnerCard title={"Consegna stimata"} description={order.expected_delivery_date}></InnerCard>
        </div>
        <div
          className={"card col-sm-4 col-md-3 col-lg-2 p-0 innercardorders"}
        >
          <InnerCard title={"Data dell'ordine"} description={order.order_date}></InnerCard>
        </div>
        <div
          className={"card col-sm-4 col-md-3 col-lg-2 p-0 innercardorders"}
        >
          <InnerCard title={"Totale"} description={order.price+"€"}></InnerCard>
        </div>
        <div
          className={"card col-sm-3 col-md-2 col-lg-2 col-xl-1 p-0 innercardorders"}
        >
          <div className="card-body p-1 row">
            <p className="card-title col-sm-12 col-6 m-0">
            <button
                type="button"
                className={
                  "btn btn-outline-info " +
                  (darkMode ? "nav2button" : "nav2buttonl")
                }
                //onClick={modifyInfo}
              >
                <i className="bi bi-pencil"></i>
                {" modifica"}
              </button>
            </p>
            <p className="card-text col-sm-12 col-6">
            
              <button
                type="button"
                className={
                  "btn btn-outline-danger " +
                  (darkMode ? "nav2button" : "nav2buttonl")
                }
                //onClick={modifyInfo}
              >
                <i className="bi bi-trash3"></i>
                {" elimina"}
              </button>
            </p>
          </div>
        </div>
      </div>
      
      {/*immagine + dati 
      <div className="m-2" style={{ width: "100%" }}>
        <div className=" text flex-column" style={{}}>
          <div className="row flex-wrap align-items-center pb-3">
            <div
              className="form-group row col-12"
              style={{ backgroundColor: "gray" }}
            >
              <div className="col-12">
                <div
                  className="col-sm-6 col-12"
                  style={{ backgroundColor: "dodgerblue" }}
                >
                  <label
                    htmlFor="telefonoaccount"
                    className=" col-form-label"
                    style={{ backgroundColor: "black" }}
                  >
                    Telefono
                  </label>
                  <div className="" style={{ backgroundColor: "gray" }}>
                    <p id="telefonoaccount">1234567</p>
                  </div>
                </div>
                <div className="col-sm-6" style={{ backgroundColor: "orange" }}>
                  <label
                    htmlFor="telefonoaccount"
                    className=" col-form-label"
                    style={{ backgroundColor: "gray" }}
                  >
                    corr
                  </label>
                  <div className="" style={{ backgroundColor: "dodgerblue" }}>
                    <p id="telefonoaccount">brt</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>*/}



    </div>
    {/*modal */}
      <DialogOrderDetail ordine={order}></DialogOrderDetail>

    </div>
  );
}

export default CardOrders;