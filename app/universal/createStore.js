import { applyMiddleware, compose, createStore } from "redux";

// import thunk from "redux-thunk";
// import createSagaMiddleware from "redux-saga";
import { createEpicMiddleware } from "redux-observable";
import reducer from "./reducer";
import rootEpic from "./epics";

// import rootSaga from "./sagas";

let store = null;
const epicMiddleware = createEpicMiddleware();

export default function create(server = false) {
  if (!store) {
    const composeEnhancers =
      (typeof window !== "undefined" &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
      compose;
    store = createStore(
      reducer,
      server ? undefined : window.__PRELOADED_STATE__,
      composeEnhancers(applyMiddleware(epicMiddleware)),
    );
  }
  epicMiddleware.run(rootEpic);

  return store;
}
