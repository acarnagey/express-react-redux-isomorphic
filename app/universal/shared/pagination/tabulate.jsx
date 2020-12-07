import React, { Component } from "react";

import { connect } from "react-redux";

export default function tabulate(name, fetch) {
  return (Table) => {
    class Tabulated extends Component {
      componentDidMount() {
        const { stale, fetch } = this.props;
        if (stale) {
          fetch();
        }
      }

      componentWillReceiveProps(nextProps) {
        const { stale, fetch } = nextProps;
        if (stale) {
          fetch();
        }
      }

      render() {
        return <Table results={this.props.results} />;
      }
    }

    // 1st contains selector function that injects the reducer props
    return connect((state) => state[name])(
      // 2nd injects the fetch action
      connect(undefined, (dispatch, ownProps) => {
        return {
          fetch: () => dispatch(fetch(ownProps.page, ownProps.pageSize)),
        };
      })(Tabulated),
    );

    // not passing the page so is always going to retrieve first page
    // return connect((state) => state[name], { fetch })(Tabulated);
  };
}
