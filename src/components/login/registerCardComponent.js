import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../theme/DarkModeContext";
import { registerUser } from "../../api/indexTreessueApi";

function RegisterCardComponent() {
  const [canIDoRegistration, setCanIDoRegistration] = useState(false);
  const { darkMode } = useContext(DarkModeContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
    nome: "",
    cognome: "",
  });

  function checkIsAllCompleted() {
    var error = false;
    if (
      user.password !== user.passwordConfirm ||
      !user.password ||
      !user.passwordConfirm
    ) {
      setErrorMessage("Le password non corrispondono!\nRiprova");
      error = true;
    }

    if (!isValidEmail(user.username)) {
      setErrorMessage("Email non valida.\nRiprova");
      error = true;
    }

    return !error;
  }

  async function doRegistration() {
    const canIProceed = checkIsAllCompleted();
    console.log({ canIProceed });
    if (canIProceed) {
      //chiamata API al login

      const result = await registerUser(
        user.username,
        user.nome,
        user.cognome,
        user.password
      );
      console.log({ result });
      if (!result.isError) {
        console.log("Ho fatto il login con");
        console.log({ user });
        document.getElementById("togglemodal").click();
      } else {
        setErrorMessage(result.messageError + "\nErrore: " + result.status);
      }
    }
  }

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  useEffect(() => {
    if (
      user.username &&
      user.password &&
      user.passwordConfirm &&
      user.nome &&
      user.cognome
    ) {
      setErrorMessage("");
      setCanIDoRegistration(true);
      console.log("tuttovqalido!");
    } else {
      setCanIDoRegistration(false);
      setErrorMessage("Completa tutti i campi!");
    }
  }, [
    user.username,
    user.cognome,
    user.nome,
    user.password,
    user.passwordConfirm,
  ]);

  return (
    <div
      style={{
        //niente per lui è già allineato :'(
        textAlign: "center",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form className="align-items-center justify-content-center">
        <div className="form-group row mx-auto fadeIn second">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10 ">
            <input
              type="text"
              className="form-control  registerStyle"
              id="staticEmail"
              value={user.username}
              placeholder="Inserisci la tua email"
              required={true}
              onChange={(el) => {
                setUser({ ...user, username: el.target.value });
              }}
            />
          </div>
        </div>

        <div className="form-group row mx-auto fadeIn third">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control  registerStyle"
              id="inputPassword"
              placeholder="Inserisci la password"
              required={true}
              onChange={(el) => {
                setUser({ ...user, password: el.target.value });
              }}
            />
          </div>
        </div>

        <div className="form-group row mx-auto fadeIn fourth">
          <label
            htmlFor="inputPasswordConfirm"
            className="col-sm-2 col-form-label"
          >
            Ripeti
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control  registerStyle"
              id="inputPasswordConfirm"
              required={true}
              placeholder="Conferma la password"
              onChange={(el) => {
                setUser({ ...user, passwordConfirm: el.target.value });
              }}
            />
          </div>
        </div>

        <div className="form-group row mx-auto fadeIn fifth">
          <label htmlFor="inputNome" className="col-sm-2 col-form-label">
            Nome
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control  registerStyle"
              id="inputNome"
              required={true}
              placeholder="Inserisci il tuo Nome"
              onChange={(el) => {
                setUser({ ...user, nome: el.target.value });
              }}
            />
          </div>
        </div>

        <div className="form-group row mx-auto fadeIn sixth">
          <label htmlFor="inputCognome" className="col-sm-2 col-form-label">
            Cognome
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control  registerStyle"
              id="inputCognome"
              required={true}
              placeholder="Inserisci il tuo Cognome"
              onChange={(el) => {
                setUser({ ...user, cognome: el.target.value });
              }}
            />
          </div>
        </div>
      </form>

      <button
        disabled={!canIDoRegistration}
        className={
          "fadeIn fourth btn m-1 " +
          (canIDoRegistration
            ? "sfondo3"
            : darkMode
            ? "nav1button"
            : "nav1buttonl")
        }
        onClick={() => {
          doRegistration();
        }}
      >
        Registrati a Treessue!
      </button>
      <button
        id="togglemodal"
        value="Log In"
        disabled={!canIDoRegistration}
        data-toggle="modal"
        data-target={checkIsAllCompleted ? "#messageDialog" : ""}
        style={{ display: "none" }}
      ></button>
      {errorMessage && (
        <p
          style={{ color: "red", width: "60%" }}
          className="sfondo1 mx-auto mt-2 "
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export { RegisterCardComponent };
