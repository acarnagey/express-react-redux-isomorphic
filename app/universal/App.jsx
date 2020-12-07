import { Route, Switch } from "react-router-dom";

import Home from "./Home";
import Login from "./session/Login";
import React from "react";

export default function App() {
  return (
    <div style={{ pading: "1rem" }}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route component={Home} />Î
      </Switch>
    </div>
  );
}
