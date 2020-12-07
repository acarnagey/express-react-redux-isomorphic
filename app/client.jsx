import "./app.scss";

import App from "./universal/App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";
import createStore from "./universal/createStore";
import { render } from "react-dom";
import { setUser } from "./universal/session/actions";

const store = createStore();

// api.session.info();

const serializedUser = window.localStorage.getItem("user");
if (serializedUser) {
  store.dispatch(setUser(JSON.parse(serializedUser)));
}

// dispatch(): takees a redux action to dispatch to the store
// getState(): returns reducer state
// subscribe(); listen for redux store changes

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("app"),
);
