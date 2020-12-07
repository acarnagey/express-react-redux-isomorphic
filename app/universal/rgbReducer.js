import * as actionTypes from "./actionTypes";

import reduce from "./reduce";

const initialState = {
  r: 244,
  g: 158,
  b: 66,
};

const updateColor = (state, action) => {
  return {
    ...state,
    [action.color]: action.value,
  };
};

export default reduce(initialState, {
  [actionTypes.SLIDE]: updateColor,
});
