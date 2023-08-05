import { compose,legacy_createStore,applyMiddleware } from "redux";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";
import {persistReducer,persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";

const middleWares = [process.env.NODE_ENV !== "production" && logger].filter(Boolean)

//TODO: Remove the redux persist and use instead firebase
const persistConfig = {
    key: "root",
    storage,
    blacklist: ["user"]
}

const persistedReducer = persistReducer(persistConfig,rootReducer);

const composeEnhancer = (process.env.NODE_ENV !== "production" && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = legacy_createStore(persistedReducer,undefined,composedEnhancers);

export const persistor = persistStore(store);