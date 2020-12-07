import React, { Fragment } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import CreateCustomer from "./customers/Create";
import CustomerList from "./customers/List";
import Invoicelist from "./invoices/List";
import Nav from "./Nav";
import RGB from "./RGB";
import { connect } from "react-redux";

export function Home({ authenticated }) {
  if (!authenticated) {
    return <Redirect to={{ pathname: "/login" }} />;
  }
  return (
    <div>
      {authenticated && (
        <Fragment>
          <Nav />
          <Switch>
            <Route exact path="/" component={RGB} />
            <Route path="/customers/new" component={CreateCustomer} />
            <Route path="/customers" component={CustomerList} />
            <Route path="/invoices" component={Invoicelist} />

            <Route
              children={({ staticContext }) => {
                if (staticContext) {
                  staticContext.status = 404;
                }
                return <h1>Sorry, can't find that!</h1>;
              }}
            />
          </Switch>
        </Fragment>
      )}
    </div>
  );
}

export default connect((state) => ({
  authenticated: !!state.session.user,
}))(Home);
