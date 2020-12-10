import { SubmissionError } from "redux-form";
// import * as actionTypes from "./actionTypes";
import actions from "../shared/pagination/actions";
import api from "../api";

export const { resultsUpdated, setPage } = actions("customers");

export const create = (data) => {
  return async () => {
    try {
      await api.customers.create(data);
      return "SUCCESS";
    } catch (err) {
      if (err.response.status === 422) {
        throw new SubmissionError(err.response.data.errors);
      }
      throw err;
    }
  }
}

export const update = (data) => {
  return async () => {
    try {
      await api.customers.update(data);
      return "SUCCESS";
    } catch (err) {
      if (err.response.status === 422) {
        throw new SubmissionError(err.response.data.errors);
      }
      throw err;
    }
  };
};

export const deleteById = (id) => {
  return async () => {
    await api.customers.deleteById(id);
    return "SUCCESS";
  };
};

export const list = (page = 1, pageSize = 15) => {
  return async (dispatch) => {
    const resp = await api.customers.list(page, pageSize);
    dispatch(resultsUpdated(resp.data));
  };
};
