import React, { useEffect } from "react";

import { Flipper } from "../shared/pagination";
import { Link } from "react-router-dom";
import Table from "./Table";
import actions from "./actions";
import { connect } from "react-redux";
import qs from "qs";
import { setPage } from "./actions";
// import { updateColor } from "../actions";
import { withRouter } from "react-router";

export function List(props) {
  useEffect(() => {
    // props.updateColor("r", 50);
    const page = qs.parse(props.location.search, { ignoreQueryPrefix: true })
      .page;
    props.setPage(page ? Number(page) : props.page, props.pageSize);
  }, []);
  return (
    <div className="pure-g">
      <div className="pure-u-1">
        <h1>Manage Customers</h1>
        <Link className="pure-button" to="/customers/new">
          + Add Customer
        </Link>
      </div>
      <div className="pure-u-1">
        <Flipper listId="customers" />
      </div>
      <div className="pure-u-1">
        <Table />
      </div>
    </div>
  );
}
// fetch: () => dispatch(fetch(page, ownProps.pageSize)),

export default withRouter(
  connect(
    (state) => state["customers"],
    (dispatch, ownProps) => ({
      setPage: (page, pageSize) => dispatch(setPage(page, pageSize)),
      // updateColor: (color, value) => dispatch(updateColor(color, value)),
    }),
  )(List),
);
