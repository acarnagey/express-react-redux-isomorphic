import React from "react";
import actions from "./actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

export function Flipper({ previous, next, page, pageSize, totalCount }) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;

  return (
    <div className="pure-button-group">
      <button
        className="pure-button"
        disabled={!hasPreviousPage}
        onClick={previous}
      >
        &lt;
      </button>
      <button className="pure-button" disabled={!hasNextPage} onClick={next}>
        &gt;
      </button>
    </div>
  );
}

export default connect(
  (state, ownProps) => state[ownProps.listId],
  (dispatch, ownProps) =>
    bindActionCreators(actions(ownProps.listId), dispatch),
)(Flipper);
