import * as actions from "./actions";

import MockAdapter from "axios-mock-adapter";
import { SubmissionError } from "redux-form";
import { adapter } from "../api";
import configureStore from "redux-mock-store";
import expect from "expect";
import thunk from "redux-thunk";

const mockStore = configureStore([thunk]);
const mockAdapter = new MockAdapter(adapter);

describe("customer actions", () => {
  afterEach(() => {
    mockAdapter.reset();
  });

  describe("list()", () => {
    const data = { totalCount: 0, results: [] };

    beforeEach(() => {
      mockAdapter.onGet("/customers").reply(200, data);
    });

    it("dispatches resultsUpdated", () => {
      const store = mockStore();

      return store.dispatch(actions.list()).then(() => {
        expect(store.getActions()).toContainEqual(actions.resultsUpdated(data));
      });
    });
  });

  describe("create()", () => {
    context("on validation failure", () => {
      beforeEach(() => {
        mockAdapter.onPost("/customers").reply(422, { errors: {} });
      });

      it("throws a SubmissionError", () => {
        const store = mockStore();

        return store.dispatch(actions.create({})).catch((err) => {
          expect(err).toBeInstanceOf(SubmissionError);
        });
      });
    });
  });
});
