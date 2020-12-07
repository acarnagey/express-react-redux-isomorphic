import * as actions from "./actions";

import { Field, reduxForm } from "redux-form";
import React, { Component } from "react";

import FormField from "../shared/FormField";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import email from "email-validator";

export class Create extends Component {
  state = {
    success: false,
  };

  onSubmit = (e) => {
    const { handleSubmit } = this.props;
    handleSubmit(e).then((resp) => {
      if (resp === "SUCCESS") {
        this.setState({ success: true });
      }
    });
  };

  render() {
    const { pristine, invalid } = this.props;
    if (this.state.success) {
      return <Redirect to="/customers" />;
    }
    return (
      <form
        action=""
        className="pure-form pure-form-stacked"
        onSubmit={this.onSubmit}
      >
        <fieldset>
          <legend>Create Customer</legend>
          <Field name="email" component={FormField} label="Email" />
          <button
            type="submit"
            disabled={pristine || invalid}
            className="pure-button pure-button-primary"
          >
            Submit
          </button>
        </fieldset>
      </form>
    );
  }
}
export default connect(undefined, { onSubmit: actions.create })(
  reduxForm({
    form: "createCustomer",
    validate: (values) => {
      const errors = {};

      if (!email.validate(values.email)) {
        errors.email = "Not valid";
      }
      return errors;
    },
  })(Create),
);
