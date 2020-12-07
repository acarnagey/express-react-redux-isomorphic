import actionType, * as actionTypes from "./actionTypes";

export default function actions(listId) {
  const t = actionType(listId);

  return {
    resultsUpdated: ({ results, totalCount }) => ({
      type: t(actionTypes.RESULTS_UPDATED),
      results,
      totalCount,
    }),

    previous: () => ({
      type: t(actionTypes.PREV),
    }),
    next: () => {
      const type = t(actionTypes.NEXT);
      return {
        type
      };
    },
    setPage: (page, pageSize = undefined) => {
      const type = t(actionTypes.SET_PAGE);
      return {
        type,
        page,
        pageSize,
      };
    },
  };
}
