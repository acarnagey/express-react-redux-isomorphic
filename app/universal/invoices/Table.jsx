import * as actions from "./actions";

import React from "react";
import { format } from "date-fns";
import { tabulate } from "../shared/pagination";

export function Table({ results }) {
  return (
    <table className="pure-table">
      <thead>
        <tr>
          <th>Email Address</th>
          <th>Total</th>
          <th>Bill Date</th>
        </tr>
      </thead>
      <tbody>
        {results.map((r) => {
          return (
            <tr key={r.id}>
              <td>{r.customer.email}</td>
              <td>{r.total}</td>
              <td>{format(new Date(r.created_at), "EEEE, MMM do yyyy")}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default tabulate("invoices", actions.list)(Table);
