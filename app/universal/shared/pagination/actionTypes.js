export const RESULTS_UPDATED = "pagination/RESULTS_UPDATED";
export const NEXT = "pagination/NEXT";
export const PREV = "pagination/PREV";
export const SET_PAGE = "pagination/SET_PAGE";

export default function actionType(listId) {
  return (t) => `${t} ${listId}`;
}
