import { DarkModeContext } from "../theme/DarkModeContext";
import "./components.css";
import { useContext } from "react";
import images from "../img/base_image_temp.json";

function CaroselloFooter() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div
      id="carouselExampleCaptions"
      className={"carousel slide " + (darkMode ? "sfondo1" : "sfondo2")}
      data-ride="carousel"
      style={{ marginTop: "2em" }}
    >
      <ol className="carousel-indicators">
        <li
          data-target="#carouselExampleCaptions"
          data-slide-to="0"
          className="active"
        ></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="3"></li>
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <h4 style={{ textAlign: "center" }}>La Scatola</h4>

          <img src={images.scatolina} className="d-block w-100" alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <p className="testodark">
              La scatola è eco-friendly e ricaricabile! Mantiene i fazzoletti al
              riparo dall'acqua e ne evita lo stropicciamento. E' senza
              linguetta e completamente customizzabile.
            </p>
          </div>
        </div>
        <div className="carousel-item">
          <h4 style={{ textAlign: "center" }}>La torre</h4>
          <img src={images.ricaricatore} className="d-block w-100" alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <p className="testodark">
              Le torri servono per ricaricare la scatola. La torre 'domestica' è
              pratica e compatta, ha un cestello che contiene 100 fazzoletti.
            </p>
          </div>
        </div>
        <div className="carousel-item">
          <h4 style={{ textAlign: "center" }}>L'intero set!</h4>
          <img src={images.intero} className="d-block w-100" alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <p className="testodark">
              Saranno presenti torri in luoghi pubblici, per non rimanere mai a
              corto di fazzoletti (disponibili sulla mappa del sito).
            </p>
          </div>
        </div>
        <div className="carousel-item">
          <h4 style={{ textAlign: "center" }}>I miei fazzoletti!</h4>
          <img src={images.fazzoletti} className="d-block w-100" alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <p className="testodark">
              I nostri fazzoletti hanno 4 veli, sono fatti completamente da
              materiale riciclato e sono profumatissimi!
            </p>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-target="#carouselExampleCaptions"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-target="#carouselExampleCaptions"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </button>
    </div>
  );
}

export default CaroselloFooter;
