import * as actionTypes from './actionTypes';

export const updateColor = (color, value) => {
  return {
    type: actionTypes.SLIDE,
    color,
    value
  }
}