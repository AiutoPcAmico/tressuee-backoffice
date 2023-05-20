import { DarkModeContext } from "../theme/DarkModeContext";
import { useContext } from "react";
import DialogOrderDetail from "./dialogOrderDetail";
import {InnerCard} from "./innerCard"

function CardProduct({ prodotto }) {
  const { darkMode } = useContext(DarkModeContext);

  //console.log(order);

  return (
    <div>
    <div
      className={"card mb-3 " + (darkMode ? "sfondocard1" : "sfondocard3")}
      style={{ width: "100%" }}
      data-toggle="modal" data-target="#exampleModal"
    >in tutte troncare scritte troppo lunghe
      
      <div className="d-flex flex-wrap justify-content-center row m-0">
        <div
          className={"card col-sm-3 col-md-2 col-lg-1 p-0 innercardorders"}
        >
            <InnerCard title={"Codice"} description={prodotto.id_product}></InnerCard>
        </div>
        <div
          className={"card col-sm-4 col-md-3 col-lg-3 col-xl-2 p-0 innercardorders"}
        >
            <InnerCard title={"Nome"} description={prodotto.prod_name}></InnerCard>
        </div>
        <div
          className={"card col-sm-4 col-md-3 col-lg-2 p-0 innercardorders"}
        >
            <InnerCard title={"Categoria"} description={prodotto.category}></InnerCard>
        </div>
        <div
          className={"card col-sm-4 col-md-3 col-lg-3 col-xl-2 p-0 innercardorders"}
        >
            <InnerCard title={"Descrizione"} description={prodotto.description}></InnerCard>
        </div>
        <div
          className={"card col-sm-4 col-md-3 col-lg-2 p-0 innercardorders"}
        >
            <InnerCard title={"Quantità' differenza tra qty e availab qty?"} description={prodotto.available_quantity}></InnerCard>
        </div>
        <div
          className={"card col-sm-4 col-md-3 col-lg-2 p-0 innercardorders"}
        >
            <InnerCard title={"Prezzo"} description={prodotto.unit_price}></InnerCard>
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
      <DialogOrderDetail ordine={prodotto}></DialogOrderDetail>

    </div>
  );
}

export default CardProduct;
