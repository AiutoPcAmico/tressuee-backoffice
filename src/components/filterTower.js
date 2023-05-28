import { DarkModeContext } from "../theme/DarkModeContext";
import { useContext, useEffect, useState } from "react";
import { useWindowDimensions } from "../utils/useWindowDimensions";

function FilterTower({ filtri, setFiltri }) {
  const { darkMode } = useContext(DarkModeContext);
  const { wi } = useWindowDimensions();
  const [buttonState, setButtonState] = useState(false);

  //console.log(filtri);

  useEffect(() => {
    if (wi >= 992 && buttonState === false) {
      document.getElementById("buttoncollapse").click();
    }
  }, [wi, buttonState]);

  return (
    <div>
      {
        <button
          id="buttoncollapse"
          className={
            "btn btn-outline-info " + (darkMode ? "nav2button" : "nav2buttonl")
          }
          type="button"
          style={{ display: wi >= 992 ? "none" : "block" }}
          data-toggle="collapse"
          data-target="#collapsefilter"
          aria-expanded="false"
          aria-controls="collapsefilter"
          onClick={() => {
            setButtonState(!buttonState);
          }}
        >
          <i className="bi bi-list"></i>
        </button>
      }
      {
        <div
          className={
            "collapse card mb-1 " + (darkMode ? "sfondocard1" : "sfondocard3")
          }
          style={{ width: "100%" }}
          id="collapsefilter"
        >
          {
            <div className="d-flex flex-wrap justify-content-center row m-0">
              <div
                className={
                  "card col-sm-3 col-md-2 col-lg-1 p-0 innercardorders"
                }
                onClick={() => {
                  if (filtri.fcodice === "cre") {
                    setFiltri({
                      finfo: null,
                      findirizzo: null,
                      fdesc: null,
                      fattiva: filtri.fattiva,
                      fcodice: "dec",
                    });
                  } else {
                    setFiltri({
                      finfo: null,
                      findirizzo: null,
                      fdesc: null,
                      fattiva: filtri.fattiva,
                      fcodice: "cre",
                    });
                  }
                }}
              >
                <b>Codice</b>

                {filtri.fcodice === "cre" && (
                  <i
                    style={{
                      color: darkMode
                        ? "rgba(0,0,0,0.5)"
                        : "rgba(255,255,255,0.5)",
                    }}
                    className="bi bi-arrow-up-short"
                  ></i>
                )}
                {filtri.fcodice === "dec" && (
                  <i
                    style={{
                      color: darkMode
                        ? "rgba(0,0,0,0.5)"
                        : "rgba(255,255,255,0.5)",
                    }}
                    className="bi bi-arrow-down-short"
                  ></i>
                )}
              </div>
              <div
                className="card col-sm-4 col-md-3 col-lg-3 col-xl-2 p-0 innercardorders"
                onClick={() => {
                  if (filtri.finfo === "cre") {
                    setFiltri({
                      finfo: "dec",
                      findirizzo: null,
                      fdesc: null,
                      fattiva: filtri.fattiva,
                      fcodice: null,
                    });
                  } else {
                    setFiltri({
                      finfo: "cre",
                      findirizzo: null,
                      fdesc: null,
                      fattiva: filtri.fattiva,
                      fcodice: null,
                    });
                  }
                }}
              >
                <div
                  className="card-body p-1 row"
                  style={{ maxHeight: "50vh" }}
                >
                  <p className="card-title col-12 ">
                    <b>Info</b>
                    {filtri.finfo === "cre" && (
                      <i
                        style={{
                          color: darkMode
                            ? "rgba(0,0,0,0.5)"
                            : "rgba(255,255,255,0.5)",
                        }}
                        className="bi bi-arrow-up-short"
                      ></i>
                    )}
                    {filtri.finfo === "dec" && (
                      <i
                        style={{
                          color: darkMode
                            ? "rgba(0,0,0,0.5)"
                            : "rgba(255,255,255,0.5)",
                        }}
                        className="bi bi-arrow-down-short"
                      ></i>
                    )}
                  </p>
                </div>
              </div>
              <div
                className={
                  "card col-sm-4 col-md-3 col-lg-2 p-0 innercardorders"
                }
                onClick={() => {
                  if (filtri.findirizzo === "cre") {
                    setFiltri({
                      finfo: null,
                      findirizzo: "dec",
                      fdesc: null,
                      fattiva: filtri.fattiva,
                      fcodice: null,
                    });
                  } else {
                    setFiltri({
                      finfo: null,
                      findirizzo: "cre",
                      fdesc: null,
                      fattiva: filtri.fattiva,
                      fcodice: null,
                    });
                  }
                }}
              >
                <div
                  className="card-body p-1 row"
                  style={{ maxHeight: "50vh" }}
                >
                  <p className="card-title col-12 ">
                    <b>Indirizzo</b>

                    {filtri.findirizzo === "cre" && (
                      <i
                        style={{
                          color: darkMode
                            ? "rgba(0,0,0,0.5)"
                            : "rgba(255,255,255,0.5)",
                        }}
                        className="bi bi-arrow-up-short"
                      ></i>
                    )}
                    {filtri.findirizzo === "dec" && (
                      <i
                        style={{
                          color: darkMode
                            ? "rgba(0,0,0,0.5)"
                            : "rgba(255,255,255,0.5)",
                        }}
                        className="bi bi-arrow-down-short"
                      ></i>
                    )}
                  </p>
                </div>
              </div>
              <div
                className={
                  "card col-sm-4 col-md-3 col-lg-3 col-xl-2 p-0 innercardorders"
                }
                onClick={() => {
                  if (filtri.fdesc === "cre") {
                    setFiltri({
                      finfo: null,
                      findirizzo: null,
                      fdesc: "dec",
                      fattiva: filtri.fattiva,
                      fcodice: null,
                    });
                  } else {
                    setFiltri({
                      finfo: null,
                      findirizzo: null,
                      fdesc: "cre",
                      fattiva: filtri.fattiva,
                      fcodice: null,
                    });
                  }
                }}
              >
                <div
                  className="card-body p-1 row "
                  style={{ maxHeight: "50vh" }}
                >
                  <p className="card-title col-12 ">
                    <b>descrizione</b>

                    {filtri.fdesc === "cre" && (
                      <i
                        style={{
                          color: darkMode
                            ? "rgba(0,0,0,0.5)"
                            : "rgba(255,255,255,0.5)",
                        }}
                        className="bi bi-arrow-up-short"
                      ></i>
                    )}
                    {filtri.fdesc === "dec" && (
                      <i
                        style={{
                          color: darkMode
                            ? "rgba(0,0,0,0.5)"
                            : "rgba(255,255,255,0.5)",
                        }}
                        className="bi bi-arrow-down-short"
                      ></i>
                    )}
                  </p>
                </div>
              </div>

              {
                <div
                  className={
                    "card col-sm-7 col-md-5 col-lg-2 col-xl-5 p-0 innercardorders"
                  }
                >
                  <select
                    className="custom-select col-6 col-lg-8 mx-auto my-auto"
                    onChange={(el) => {
                      setFiltri({
                        ...filtri,
                        fattiva: el.target.value,
                      });
                    }}
                  >
                    <option value={"tutte"}>Tutte</option>
                    <option value={"pubbliche"}>Pubbliche</option>
                    <option value={"private"}>Private</option>
                  </select>
                </div>
              }
            </div>
          }
        </div>
      }
      {/*modal */}
      {/*<DialogOrderDetail ordine={torre}></DialogOrderDetail>*/}
    </div>
  );
}

export default FilterTower;
