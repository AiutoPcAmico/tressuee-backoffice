import "../pages/pages.css";
import logo from "../img/logo.png";
import pla from "../img/pla_image.jpg";
import { DarkModeContext } from "../theme/DarkModeContext";
import { useContext } from "react";

//ciaooo
function About() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className="aboutPage">
      <h2 className={darkMode ? "testolight" : "testodark"}>
        La nostra storia
      </h2>
      <div className=" text flex-column" style={{}}>
        <div className="row flex-wrap align-items-center pb-3">
          <div
            style={{ width: "49%" }}
            className={
              "col-sm-6 col-12 text-center " +
              (darkMode ? "sfondo2" : "sfondo1")
            }
          >
            <img src={logo} alt="Treessue logo"></img>
          </div>
          <div
            className={
              "col-sm-6 col-12 " + (darkMode ? "testolight" : "testodark")
            }
            style={{ width: "49%" }}
          >
            <p>
              Siamo una piccola Startup innovativa, che voleva rimediare
              all'inquinamento dovuto all'utilizzo dei singoli pacchetti di
              fazzoletti.
            </p>
            <p>
              Quanti pacchetti di fazzoletti utilizziamo all'anno? Quanti
              involucri di plastica sprechiamo e magari non differenziamo?
              Quanto è scomodo ritrovarsi con tutti i fazzoletti stropicciati e,
              in caso di pioggia, inutilizzabili?
            </p>
          </div>
        </div>
        <div className="row flex-wrap align-items-center pb-3">
          <div
            className={
              "col-sm-6 col-12 " + (darkMode ? "testolight" : "testodark")
            }
            style={{ width: "49%" }}
          >
            Tressuee ha come mission la soluzione di questi problemi, proponendo
            un portafazzoletti solido in PLA biodegradabile e un sistema
            innovativo per la suo ricarica! Cosa aspetti: scopri i nostri
            prodotti!
          </div>
          <div
            className={
              "col-sm-6 col-12 text-center " +
              (darkMode ? "sfondo1" : "sfondo2")
            }
            style={{ width: "49%" }}
          >
            <img
              className={darkMode ? "sfondo2" : "sfondo1"}
              src={pla}
              style={{ maxWidth: "99%", maxHeight: "30vh" }}
              alt="plaImage"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export { About };
