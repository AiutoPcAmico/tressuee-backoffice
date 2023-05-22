import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import sessionInfo from "./sessionInfo";

const persistConfig = {
  key: "backOffice",
  storage,
};

const reducers = combineReducers({
  sessionInfo: sessionInfo,
});

const persistedReducer = persistReducer(persistConfig, reducers);

// Logger with default options
const store = configureStore({
  reducer: persistedReducer,
  middleware: [logger],
});

const persistedStore = persistStore(store);

export { store, persistedStore };
