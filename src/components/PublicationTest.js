import React from "react";
import Query from "./Query";
import { connect } from "react-redux";
import { fetchPublications } from "../actions";
import PublicationListTest from "./PublicationListTest";

import PUBLICATIONS_QUERY from "../queries/publication/publications";

const mapStateToProps = (state, ownProps) => {
  return { publications: state.publbications };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPublications: publications => {
      dispatch(fetchPublications(publications));
    }
  };
};

const PublicationTest = props => {
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

export default connect(mapStateToProps, mapDispatchToProps)(PublicationTest);
