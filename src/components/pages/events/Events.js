import React from "react";

import { connect } from "react-redux";
import { Link } from "@reach/router";

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

const Events = (props) => {
  return (
    <div>
      <p>Events</p>
      <Link to="/swissgathring">Swiss Gathring</Link>
      <Link to="/bearcup">Bear Cup</Link>
      <Link to="/instructorcamp">Instructor Boot Camp</Link>
      <Link to="/calendar">Calendar</Link>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);
