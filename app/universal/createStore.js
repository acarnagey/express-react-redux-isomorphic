import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";

let store = null;

export default function create(server = false) {
  if (!store) {
    const composeEnhancers =
      (typeof window !== "undefined" &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
      compose;
    store = createStore(
      reducer,
      server ? undefined : window.__PRELOADED_STATE__,
      composeEnhancers(applyMiddleware(thunk))
    );
  }
  return store;
}
