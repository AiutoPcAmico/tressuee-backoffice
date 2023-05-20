import { useContext } from "react";
import { DarkModeContext } from "../theme/DarkModeContext";
import { useNavigate } from "react-router-dom";

function NavigationButton({
  setSelezionato,
  selezionato,
  buttonText,
  goToPage,
}) {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  return (
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
  );
}

export { NavigationButton };
