import * as actions from "./actions";

import { Link } from "react-router-dom";
import React from "react";
import { tabulate } from "../shared/pagination";

export function Table({ results }) {
  return (
    <table className="pure-table">
      <thead>
        <tr>
          <th>Email Address</th>
        </tr>
      </thead>
      <tbody>
        {results.map((r) => (
          <tr key={r.id}>
            <td>
              <Link to={`/customers/${r.id}`} className="pure-link">
                {r.email}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default tabulate("customers", actions.list)(Table);

// export default connect((state) => state.customers, { fetch: actions.list })(
//   Table,
// );
