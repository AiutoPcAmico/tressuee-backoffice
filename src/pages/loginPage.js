import { useContext, useState } from "react";
import "./loginPage.css";
import { DarkModeContext } from "../theme/DarkModeContext";
import { LoginCardComponent } from "../components/login/loginCardComponent";
import { LoginCardFooter } from "../components/login/loginCardFooter";
import { RegisterCardComponent } from "../components/login/registerCardComponent";
import image from "../img/logo.png";
import { MessageDialog } from "../components/messageDialog";

function LoginPage() {
  const [pageOpened, setPageOpened] = useState("login");
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div>
      <div
        className=" wrapper-login fadeInDown mx-auto justify-content "
        style={{
          animationName: "fadeInDown",
          animationFillMode: "both",
          animationDuration: "1s",
        }}
      >
        <div
          id="formContent"
          className={darkMode ? "sfondocard1" : "sfondocard3"}
          style={{
            width: "90%",
            maxWidth: "450px",
            position: "relative",

            boxShadow: "rgba(0, 0, 0, 0.3) 0px 30px 60px 0px",
            textAlign: "center",
          }}
        >
          <div
            className="fadeIn first"
            style={{
              opacity: 0,
              animationTimingFunction: "ease-in",
              animationIterationCount: 1,
              animationDirection: "normal",
              animationPlayState: "running",
              animationName: "fadeIn",
              animationFillMode: "forwards",
              animationDuration: "1s",
              animationelay: "0.4s",
            }}
          >
            <img
              src={image}
              id={"logoTreessue"}
              alt=""
              name="logo.png"
              style={{ width: "30%" }}
            />
          </div>
          {pageOpened === "login" && <LoginCardComponent></LoginCardComponent>}
          {pageOpened === "registrati" && (
            <RegisterCardComponent></RegisterCardComponent>
          )}

          {/*pageOpened === "login" && (
            <LoginCardFooter
              linkMessage={"Registrati"}
              message={"Non seri ancora registrato? "}
              clickedRedirect={() => {
                setPageOpened("registrati");
              }}
            ></LoginCardFooter>
            )*/}

          {/*pageOpened === "registrati" && (
            <LoginCardFooter
              linkMessage={"Torna al Login"}
              message={"Sei già Iscritto? "}
              clickedRedirect={() => {
                setPageOpened("login");
              }}
            ></LoginCardFooter>
            )*/}
        </div>
      </div>
      {
        <div>
          <MessageDialog
            ConfirmButtonText={"Accedi"}
            CancelButtonText={""}
            CancelButtonVisible={false}
            titleModal={"Registrazione completata!✔️"}
            text={
              "Benvenuto nella community Treessue!\nL'iscrizione al portale è avvenuta con infoo.\n\nProcedi ora al login con le credenziali appena generate."
            }
            onConfirm={() => {
              setPageOpened("login");
            }}
          />
        </div>
      }
    </div>
  );
}

export { LoginPage };
