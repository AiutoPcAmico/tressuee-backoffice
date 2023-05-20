import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { DarkModeProvider } from "./theme/DarkModeContext";
import { BrowserRouter } from "react-router-dom";
import { store, persistedStore } from "./stores/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <DarkModeProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </DarkModeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
