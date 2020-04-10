import React from "react";

import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

const Evenment = (props) => {
  return <div>{props.name}</div>;
};

export default connect(mapStateToProps, mapDispatchToProps)(Evenment);
