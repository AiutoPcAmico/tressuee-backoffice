import { useContext, useState, useEffect } from "react";
import { DarkModeContext } from "../../theme/DarkModeContext";
import { postLogin } from "../../api/indexTreessueApi";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setSessionDetails, setSessionUser } from "../../stores/sessionInfo";
import { useNavigate } from "react-router-dom";
import { encryptData } from "../../utils/encryptionFunctions";
import { getUserRole, saveUserRoleEncrypted } from "../../utils/roleUtils";

function LoginCardComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [canIDoLogin, setCanIDoLogin] = useState(false);
  const [errorLogin, setErrorLogin] = useState("");
  const { darkMode } = useContext(DarkModeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function doLogin() {
    //chiamata API al login

    await postLogin(username, password).then((data) => {
      if (!data.isError) {
        setErrorLogin("");

        //jwt
        //salvataggio store
        const user = jwtDecode(data.data.result.access_token);
        console.log({ user });
        dispatch(
          setSessionDetails({
            sessionStarted: user.iat,
            sessionExpire: user.exp,
            sessionToken: data.data.result.access_token,
          })
        );
        dispatch(setSessionUser({ user: user.userDetail }));

        const role = getUserRole();
        switch (role) {
          case "admin":
          case "torrista":
          case "ufficio":
            navigate("/towers");
            break;
          case "magazziniere":
            navigate("/store");
            break;

          default:
            navigate("/");
            break;
        }

        //navigate("/");
      } else {
        setErrorLogin(data.messageError + "\nErrore: " + data.status);
      }
    });
  }

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  useEffect(() => {
    var isUsernameValid = isValidEmail(username);
    if (isUsernameValid && username && password) {
      setCanIDoLogin(true);
    } else {
      setCanIDoLogin(false);
    }
  }, [username, password]);

  return (
    <div>
      <div>
        <label
          style={{
            opacity: 0,
            animationTimingFunction: "ease-in",
            animationIterationCount: 1,
            animationDirection: "normal",
            animationPlayState: "running",
            animationName: "fadeIn",
            animationFillMode: "forwards",
            animationDuration: "1s",
          }}
          htmlFor="password"
        >
          Username:
        </label>
        <input
          type="email"
          id="login"
          name="login"
          placeholder="Your email address..."
          className="fadeIn second"
          required={true}
          onChange={(el) => {
            setUsername(el.target.value);
          }}
          style={{
            opacity: 0,
            animationTimingFunction: "ease-in",
            animationIterationCount: 1,
            animationDirection: "normal",
            animationPlayState: "running",
            animationName: "fadeIn",
            animationFillMode: "forwards",
            animationDuration: "1s",
            backgroundColor: " rgb(246, 246, 246)",
            color: "rgb(13, 13, 13)",
            paddingTop: "15px",
            paddingRight: "32px",
            paddingBottom: "15px",
            paddingLeft: "32px",
            textAlign: "center",
            textDecorationLine: "none",
            display: "inline-block",
            fontSize: "16px",
            margin: "5px",
            width: "85%",
            border: "2px solid rgb(246, 246, 246)",
            transitionDuration: "0.5s",
            transitionTimingFunction: "ease-in-out",
            transitionDelay: "0s",
            transitionProperty: "all",
            borderRadius: "5px",
            animationDelay: "0.6s",
          }}
        />

        <label
          style={{
            opacity: 0,
            animationTimingFunction: "ease-in",
            animationIterationCount: 1,
            animationDirection: "normal",
            animationPlayState: "running",
            animationName: "fadeIn",
            animationFillMode: "forwards",
            animationDuration: "1s",
          }}
          htmlFor="password"
        >
          Password:
        </label>

        <input
          type="password"
          id="password"
          name="password"
          placeholder="Your Password..."
          className="fadeIn third"
          required={true}
          onChange={(el) => {
            setPassword(el.target.value);
          }}
          style={{
            opacity: 0,
            animationTimingFunction: "ease-in",
            animationIterationCount: 1,
            animationDirection: "normal",
            animationPlayState: "running",
            animationName: "fadeIn",
            animationFillMode: "forwards",
            animationDuration: "1s",
            backgroundColor: "rgb(246, 246, 246)",
            color: "rgb(13, 13, 13)",
            paddingTop: "15px",
            paddingRight: "32px",
            paddingBottom: "15px",
            paddingLeft: "32px",
            textAlign: "center",
            textDecorationLine: 2,
            textDecorationThickness: "initial",
            textDecorationStyle: "initial",
            textDecorationColor: "initial",
            display: "inline-block",
            fontSize: "16px",
            margin: "5px",
            width: "85%",
            borderWidth: "2px",
            borderStyle: "solid",
            borderColor: "rgb(246, 246, 246)",
            transitionDuration: "0.5s",
            transitionTimingFunction: "ease-in-out",
            transitionDelay: "0s",
            transitionProperty: "all",
            borderRadius: "5px",
            animationDelay: "0.8s",
          }}
        />
        <button
          value="Log In"
          className={
            "fadeIn fourth btn btn-info m-1 " +
            (canIDoLogin ? "sfondo3" : darkMode ? "nav1button" : "nav1buttonl")
          }
          onClick={() => {
            doLogin();
          }}
        >
          Effettua il Login
        </button>

        {errorLogin !== "" && (
          <div className="alert alert-danger">
            <strong>Errore!</strong>
            <br></br>
            {errorLogin}.
          </div>
        )}
      </div>
    </div>
  );
}

export { LoginCardComponent };
