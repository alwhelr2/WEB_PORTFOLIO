import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import rootReducer from "./reducers/rootReducer";
import { rootSaga } from "./sagas/rootSaga";
import { configureStore, Tuple } from "@reduxjs/toolkit";

const sagaMiddleWare = createSagaMiddleware();

const store = configureStore( {
    reducer: rootReducer,
    middleware: () => new Tuple( sagaMiddleWare, logger )
} );

sagaMiddleWare.run( rootSaga );

export default store;