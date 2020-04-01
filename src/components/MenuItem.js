import React from "react";
import Query from "./Query";
import { connect } from "react-redux";

import PublicationListTest from "./PublicationListTest";

import PUBLICATIONS_QUERY from "../queries/publication/publications";

const mapStateToProps = (state, ownProps) => {
  return { language: state.language };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

const MenuItem = props => {
  return (
    <div>
      <Query query={PUBLICATIONS_QUERY} id={null}>
        {({ data: { publications } }) => {
          return <PublicationListTest thispublications={publications} />;
        }}
      </Query>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);
