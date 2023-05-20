import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../theme/DarkModeContext";
import { useContext } from "react";

function CardProdotto({ singleProduct, indice }) {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  function navigateToDetails(id) {
    navigate("/shop/productDetails/" + id);
  }

  return (
    <div
      className={
        "card m-2 " +
        (indice % 2 === 0
          ? darkMode
            ? "sfondocard1"
            : "sfondocard2"
          : darkMode
          ? "sfondocard2"
          : "sfondocard1")
      }
      style={{ width: "18rem" }}
      onClick={() => {
        //navigateToDetails(singleProduct.id);
        navigateToDetails(singleProduct.id_product);
      }}
    >
      <img
        src={require(`../img/${singleProduct.image}`)}
        className="card-img-top mx-auto mt-1"
        alt={`${singleProduct.category} icon`}
        style={{ width: "150px" }}
      />

      <div className="card-body">
        <h5 className="card-title">
          {/*singleProduct.name*/}
          {singleProduct.prod_name}
        </h5>
        <p className="card-text">
          {/*(Math.round(singleProduct.unitPrice * 100) / 100).toFixed(2)*/}{" "}
          {/*€*/}
          {(Math.round(singleProduct.unit_price * 100) / 100).toFixed(2)} €
        </p>
        <p className="card-text">Affrettati! La spedizione è gratuita!</p>

        <button
          className="btn btn-outline-info nav2button"
          onClick={() => {
            //navigateToDetails(singleProduct.id);
            navigateToDetails(singleProduct.id_product);
          }}
        >
          Visualizza i dettagli!
        </button>
      </div>
    </div>
  );
}

export default CardProdotto;
