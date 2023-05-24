import { useContext } from "react";
import { DarkModeContext } from "../theme/DarkModeContext";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function NavigationButton({
  setSelezionato,
  selezionato,
  buttonText,
  goToPage,
  ruoli,
}) {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const roleUser = useSelector((state) => state.sessionInfo.user.role);

  const positionRole = ruoli.indexOf(roleUser); //sost?

  let roleok;
  console.log({ positionRole, roleUser, ruoli });

  if (positionRole !== -1) roleok = true;
  else roleok = false;

  return (
    <span>
      {roleok && (
        <li className="nav-item nav-link">
          <button
            type="button"
            className={
              selezionato === buttonText
                ? "btn btn-outline-info " +
                  (darkMode ? "nav2buttonselectedl" : "nav2buttonselected")
                : "btn btn-outline-info " +
                  (darkMode ? "nav2buttonl" : "nav2button")
            }
            onClick={() => {
              setSelezionato(buttonText);
              navigate(goToPage);
            }}
          >
            {buttonText}
          </button>
        </li>
      )}
    </span>
  );
}

export { NavigationButton };
