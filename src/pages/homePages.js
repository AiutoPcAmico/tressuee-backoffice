import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../theme/DarkModeContext";
import { useContext } from "react";
import CaroselloFooter from "../components/caroselloFooter";

function HomePages({ setSelezionato }) {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  //ottimo pagina prescelta?
  //Cancella poure XD. Yes, a questo punto io proverei

  return (
    <div>
      <div
        className="homePage-bgimg p-0 homePage-structure "
        style={{ height: "40vh", display: "flex" }}
      >
        <div
          className="homePage-structure d-flex align-content-center flex-wrap justify-content-center"
          style={{ height: "100%", width: "100%" }}
        >
          <p
            className={"mx-auto " + (darkMode ? "testolight" : "testodark")}
            style={{ width: "900%", textAlign: "center" }}
          >
            Benvenuti nella HomePage!
          </p>
          <button
            type="button"
            className={
              "btn btn-outline-info mx-auto " +
              (darkMode ? "nav2buttonl" : "nav2button")
            }
            style={{ width: "200px" }}
            onClick={() => {
              setSelezionato("Chi Siamo");
              navigate("/about");
            }}
          >
            Scopri la nostra mission!
          </button>
        </div>
      </div>

      {/*<img src={bannerimg} className="img-fluid" alt="..."></img>*/}
      <div style={{ width: "90vw" }} className="mx-auto">
        <CaroselloFooter></CaroselloFooter>
      </div>
    </div>
  );
}

export { HomePages };
