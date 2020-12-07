import { Flipper } from "../shared/pagination";
import React from "react";
import Table from "./Table";

export default () => (
  <div className="pure-g">
    <div className="pure-u-1">
      <h1>Manage Invoices</h1>
    </div>
    <div className="pure-u-1">
      <Flipper listId="invoices" />
    </div>
    <div className="pure-u-1">
      <Table />
    </div>
  </div>
);
