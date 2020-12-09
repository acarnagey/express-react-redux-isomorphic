import * as actions from "./actions";

import React, { useEffect, useState } from "react";

import { Redirect } from "react-router-dom";
import api from "../api";
import { connect } from "react-redux";
import { withRouter } from "react-router";

export const Detail = (props) => {
  const [id, setId] = useState(0);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(async () => {
    const customer = (
      await api.customers.findById(Number(props.match.params.id))
    ).data;
    setIsLoading(false);
    setId(customer.id);
    setEmail(customer.email);
    setUserId(customer.user_id);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const { handleSubmit } = props;
    handleSubmit({ id, email, user_id: userId }).then((resp) => {
      if (resp === "SUCCESS") {
        setIsSuccess(true);
      }
    });
  };

  const onDelete = () => {
    const { handleDelete } = props;
    handleDelete(id).then((resp) => {
      if (resp === "SUCCESS") {
        setIsSuccess(true);
      }
    });
  };

  if (isSuccess) {
    return <Redirect to="/customers" />;
  }

  return (
    <div>
      <h1>Customer {props.match.params.id}</h1>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <div>
          <form
            action=""
            className="pure-form pure-form-stacked"
            onSubmit={onSubmit}
          >
            <fieldset>
              <legend>Update Customer</legend>
              <div>Id: {id}</div>
              <div className="pure-control-group">
                <label htmlFor="email">Email</label>
                <input
                  style={{ width: "300px" }}
                  type="text"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>User Id: {userId}</div>
              <button
                type="submit"
                // disabled={pristine || invalid}
                className="pure-button pure-button-primary"
              >
                Update
              </button>
            </fieldset>
          </form>
          <button
            type="button"
            className="pure-button pure-button-secondary"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default withRouter(
  connect(
    (state, ownProps) => {
      return state.customers;
    },
    { handleSubmit: actions.update, handleDelete: actions.deleteById },
    // (dispatch, ownProps) => ({
    //   setPage: (page, pageSize) => dispatch(setPage(page, pageSize)),
    // }),
  )(Detail),
);
