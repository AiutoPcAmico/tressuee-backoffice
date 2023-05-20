import { useEffect, useState } from "react";
import CardProdotto from "../components/cardProdotto.js";
import base_images from "../img/base_image_temp.json";
import { retrieveAllProducts } from "../api/indexTreessueApi.js";

function ListProducts() {
  const [listProduct, setListProduct] = useState(null);
  const [error, setError] = useState("Caricamento in corso,\nAttendere prego!");

  async function retrieveInfoDebug() {
    var array = [];
    //await della chiamata axios
    array = [
      {
        id: 1,
        name: "Fazzoletti 10",
        category: "fazzoletti",
        description: "Una descrizione per fazzoletti da 10",
        unitPrice: 10,
        isActive: true,
        image: base_images.fazzoletti,
      },
      {
        id: 2,
        name: "Fazzoletti 200",
        category: "fazzoletti",
        description: "Pacchetto da 200",
        unitPrice: 30,
        isActive: true,
        image: base_images.fazzoletti,
      },
      {
        id: 3,
        name: "Torre ricarica",
        category: "ricaricatore",
        description: "Una bellissima torre da ricarica",
        unitPrice: 89.2,
        isActive: true,
        image: base_images.ricaricatore,
      },
      {
        id: 4,
        name: "scatoletta",
        category: "scatoletta",
        description:
          "Una bellissima scatoletta per contenere i tuoi fazzoletti!",
        unitPrice: 21.2,
        isActive: true,
        image: base_images.scatolina,
      },
    ];
    return array;
  }

  useEffect(() => {
    /*retrieveInfoDebug().then((element) => {
      setListProduct(element);
    });*/

    retrieveAllProducts().then((element) => {
      if (element.isError) {
        setError(element.messageError);
      } else {
        setError("");
        setListProduct(element.data);
        //console.log(element);
      }
    });
  }, []);

  return (
    <div>
      <div className="sfondo1 mt-2">lista dei filtri!</div>

      {(error !== "") && (listProduct!==null && listProduct.length>0) && (
        <div
          className="alert alert-danger mx-auto mt-4"
          role="alert"
          style={{ width: "300px", textAlign: "center" }}
        >
          <b>Attenzione!</b>
          <p>{error}</p>
        </div>
      )}

      <div className="d-flex flex-wrap justify-content-center">
        {listProduct!==null && !(listProduct.length > 0) && <p>al momento prodotti non disponibili</p>}
        {listProduct !== null &&
          listProduct.map((p, i) => {
            return (
              <CardProdotto
                singleProduct={p}
                indice={i}
                key={p.id_product}
                //debug key={p.id}
              ></CardProdotto>
            );
          })}
      </div>
    </div>
  );
}

export { ListProducts };
