import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import cartOperations from "./cartOperations";
import sessionInfo from "./sessionInfo";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  cart: cartOperations,
  sessionInfo: sessionInfo,
  counter: counterSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

// Logger with default options
const store = configureStore({
  reducer: persistedReducer,
  middleware: [logger],
});

const persistedStore = persistStore(store);

export { store, persistedStore };
