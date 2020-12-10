import { applyMiddleware, compose, createStore } from "redux";

// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import reducer from "./reducer";
import rootSaga from "./sagas";

let store = null;
const sagaMiddleware = createSagaMiddleware();

export default function create(server = false) {
  if (!store) {
    const composeEnhancers =
      (typeof window !== "undefined" &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
      compose;
    store = createStore(
      reducer,
      server ? undefined : window.__PRELOADED_STATE__,
      composeEnhancers(applyMiddleware(sagaMiddleware)),
    );
  }
  sagaMiddleware.run(rootSaga);

  return store;
}
