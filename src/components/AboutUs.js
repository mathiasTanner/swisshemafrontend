import React from "react";

import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

const AboutUs = (props) => {
  return (
    <div>
      <p>About us</p>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutUs);
