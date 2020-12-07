import { Link, Route } from "react-router-dom";

import React from "react";
import classNames from "../lib/classNames";

export default function NavLink({ to, children }) {
  return (
    <Route
      path={to}
      children={({ match }) => {
        const classes = classNames(
          {
            "pure-menu-selected": match,
          },
          "pure-menu-item",
        );

        return (
          <li className={classes}>
            <Link to={to} className="pure-menu-link">
              {children}
            </Link>
          </li>
        );
      }}
    />
  );
}
