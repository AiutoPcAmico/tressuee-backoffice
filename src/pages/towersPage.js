import { DarkModeContext } from "../theme/DarkModeContext";
import { useContext, useEffect, useState } from "react";
import base_images from "../img/base_image_temp.json";
import { retrieveAllTowers } from "../api/indexTreessueApi";
import CardTower from "../components/cardTower";
import {useWindowDimensions}from "../utils/useWindowDimensions.js"
import { InnerCard } from "../components/innerCard";
import { useNavigate } from "react-router-dom";


const TowersPage = ({ totalOrders }) => {
  const { darkMode } = useContext(DarkModeContext);
  const [towers, setTowers] = useState([]); //lista tutti prodotti
  const [error, setError] = useState();
  const { wi } = useWindowDimensions();
  const navigate = useNavigate();
  //console.log(wi)

  useEffect(() => {
    retrieveAllTowers().then((element) => {
      //console.log(element);
      if (element.isError) {
        setError(element.messageError);
      } else {
        setError("");
        console.log(element.data);
        setTowers(element.data);
      }
    });
  }, []);

  return (
    <div>
      <div className="detailsPage">
        <div className="row">
        <h2 className={"col-6 "+(darkMode ? "testolight" : "testodark")}>Torri</h2>
        <p className="col-6" style={{ textAlign: "right" }}>
            <button
                type="button"
                className={
                  "btn btn-outline-info " +
                  (darkMode ? "nav2button" : "nav2buttonl")
                }
                onClick={()=>{navigate("/towers/new")}}
                
              >
                <i className="bi bi-plus"></i>
                {" nuova"}
              </button></p>
              </div>
        <div className=" text flex-column" style={{}}>
          <div className="row flex-wrap align-items-center pb-3">
            <div
              className={
                "col-12 text-center pt-3 " + (darkMode ? "sfondo3" : "sfondo1")
              }
            >
              {!(towers.length > 0) && (
                <p className={!darkMode ? "testolight" : "testodark"}>
                  Non ci sono torri
                </p>
              )}
              {(wi>1199) && 
            
            <CardTower indice={-1} key={-1}></CardTower>
         }
              {towers.length > 0 &&
                towers.map((tower,i) => {
                  /*const order = orders.find(
                    //(singleProd) => singleProd.id === element.productId
                    (singleProd) => {
                      return singleProd.id_product === element.id_product;
                    }
                  );*/

                  return (
                    <CardTower
                      torre={tower}
                      indice={i}
                      //key={element.id}
                      key={tower.id_tower}
                    ></CardTower>
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

export { TowersPage };
