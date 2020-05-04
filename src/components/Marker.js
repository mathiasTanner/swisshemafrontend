import React from "react";
import PropTypes from "prop-types";
import withWidth from "@material-ui/core/withWidth";

import { connect } from "react-redux";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

const useStyles = makeStyles((theme) => ({
  box: {
    width: "1vw",
    height: "4vh",
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: `${theme.palette.primary.dark} `,
    color: `${theme.palette.secondary.light} `,
    fontSize: theme.typography.pxToRem(10),
  },
  arrow: {
    color: `${theme.palette.primary.dark} `,
  },
}))(Tooltip);

const mapStateToProps = (state, ownProps) => {
  return { language: state.language };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

//TODO: make marker clicable and send to the member's website

const Marker = (props) => {
  const classes = useStyles();

  return (
    <HtmlTooltip
      TransitionComponent={Zoom}
      enterDelay={200}
      leaveDelay={500}
      arrow
      title={
        <React.Fragment>
          <Typography color="inherit" variant="caption">
            {props.location.name}
          </Typography>
        </React.Fragment>
      }
    >
      <Avatar
        src={process.env.REACT_APP_BACKEND_URL + props.location.logo.url}
        alt={props.location.name}
        className={classes.avatar}
      />
    </HtmlTooltip>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withWidth()(Marker));

Marker.propTypes = {
  language: PropTypes.string,
  location: PropTypes.object,
};
