import { useState } from "react";

function QuantitySelector({ initialQuantity, setUpperQuantity, prodQuantity }) {
  const [quantity, setQuantity] = useState(initialQuantity);

  //console.log("num max" + prodQuantity);

  //gestisce l'on blur nel caso di testo vuoto!
  const cambiaquantita = (event) => {
    console.log(event.target.value);
    event.target.value = event.target.value * 1;

    if (isNaN(event.target.value)) {
      event.target.value = 1;
      console.log("NON numero");
    }
    if (event.target.value < 1) {
      event.target.value = 1;
    }
    event.target.value = +event.target.value;

    //setQuantity(event.target.value * 1);
    changeQuantity(event.target.value, true);
  };

  //gestisce tutti gli altri casi!
  function changeQuantity(many, manual) {
    //if (many === "");

    if (many !== "") {
      var pippo = many * 1;

      if (pippo < 1) {
        setQuantity(1);
        setUpperQuantity(1);
      }

      if (pippo >= 1 && pippo <= prodQuantity) {
        setQuantity(pippo);
        setUpperQuantity(pippo);
      } else {
        if (pippo > quantity) {
          setQuantity(prodQuantity);
          setUpperQuantity(prodQuantity);
        }
      }
    } else {
      setQuantity("");
      setUpperQuantity("");
    }
  }

  return (
    <div className="input-group mb-3 justify-content-center">
      <div className="input-group-prepend">
        <button
          className="btn btn-danger"
          type="button"
          id="button-addon1"
          onClick={() => {
            changeQuantity(quantity - 1, false);
          }}
        >
          <i className="bi bi-dash"></i>
        </button>
      </div>
      <input
        type="number"
        className="form-control text-center"
        placeholder="Quantity..."
        aria-describedby="button-addon1"
        value={quantity}
        onChange={(event) => {
          changeQuantity(event.target.value, true);
        }}
        onBlur={(event) => {
          cambiaquantita(event);
        }}
        style={
          {
            /*width: "100px", flex: "none" */
          }
        }
      />
      <div className="input-group-append">
        <button
          className="btn btn-info"
          type="button"
          id="button-addon2"
          onClick={() => {
            changeQuantity(quantity + 1, false);
          }}
        >
          <i className="bi bi-plus"></i>
        </button>
      </div>
    </div>
  );
}

export default QuantitySelector;
