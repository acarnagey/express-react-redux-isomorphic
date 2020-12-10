import * as actions from "./actions";

import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

export const Login = (props) => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    invalid: false,
    success: false,
  });

  const update = (field) => (e) =>
    setForm({ username: form.username, password: form.password, [field]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = form;
    props.login(username, password);
  };

  useEffect(() => {
    if (props.user && props.user.token) {
      props.history.push("/");
    }
  }, [props.user, props.history]);

  return (
    <form className="pure-form pure-form-stacked" onSubmit={onSubmit}>
      <fieldset>
        <legend>Sign in</legend>
        {form.invalid && (
          <div style={{ height: "2rem", color: "red" }}>
            Invalid Credentials
          </div>
        )}
        <input
          type="text"
          placeholder="Username"
          onChange={update("username")}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={update("password")}
        />
        <button type="submit" className="pure-button pure-button-primary">
          Sign in
        </button>
      </fieldset>
    </form>
  );
  // }
};

export default withRouter(
  connect((state) => state.session, { login: actions.login })(Login),
);
