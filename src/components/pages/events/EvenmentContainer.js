import React from "react";
import PageQuery from "../../PageQuery";
import EVENT_QUERY from "../../../queries/event";
import Evenement from "./Evenement";

import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

const EvenmentContainer = (props) => {
  return (
    <>
      <PageQuery query={EVENT_QUERY} name={props.eventName}>
        {({ data: { events } }) => {
          return <Evenement event={events[0]} />;
        }}
      </PageQuery>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EvenmentContainer);
