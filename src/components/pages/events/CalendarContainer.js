import React from "react";

import PageQuery from "../../PageQuery";
import CALENDARPAGE_QUERY from "../../../queries/calendarPage";
import Calendar from "./Calendar";

import { makeStyles } from "@material-ui/core/styles";

import withWidth from "@material-ui/core/withWidth";

import { connect } from "react-redux";

import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "15px",
    padding: "15px",
    minHeight: "80vh",
    [theme.breakpoints.down("xs")]: {
      margin: "0px",
      marginBottom: "15px",
    },
  },
}));

const mapStateToProps = (state, ownProps) => {
  return { language: state.language };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

const ClaendarContainer = (props) => {
  const classes = useStyles();

  return (
    <>
      <PageQuery query={CALENDARPAGE_QUERY}>
        {({ data: { calendarPage } }) => {
          return (
            <Paper className={classes.root} id="paper">
              <Calendar calendarPage={calendarPage} />
            </Paper>
          );
        }}
      </PageQuery>
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withWidth()(ClaendarContainer));
