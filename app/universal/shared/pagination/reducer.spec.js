import paginate, { initialState } from "./reducer";

import actions from "./actions";
import expect from "expect";

const listId = "customers";
const reducer = paginate(listId);
const { previous } = actions(listId);

describe("paginate()", () => {
  context("intially", () => {
    it("returns the intial state", () => {
      expect(reducer()).toEqual(initialState);
    });
  });

  describe("PREV", () => {
    context("when on the first page", () => {
      it("remains on the first page", () => {
        expect(reducer(initialState, previous())).toEqual(initialState);
      });
    });
    context("when on the second page", () => {
      const state = { ...initialState, page: 2 };
      it("decrements the page", () => {
        expect(reducer(state, previous())).toEqual(initialState);
      });
    });
  });
});
