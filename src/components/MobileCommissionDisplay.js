import React, { useState } from "react";
import Commission from "./Commission";

import { connect } from "react-redux";
import { fetchPublications } from "../actions";

import { makeStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import languageDisplay from "../functions/languageDisplay";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: `${theme.palette.secondary.light} `,
    color: `${theme.palette.primary.dark} `,
    borderColor: `${theme.palette.primary.dark} `,
    "&:hover": {
      backgroundColor: `${theme.palette.primary.dark} `,
      color: `${theme.palette.secondary.light} `,
      borderColor: `${theme.palette.secondary.light} `,
    },
    margin: "1vw",
  },
  content: {
    margin: "0px",
    maxWidth: "99vw",
  },
  mobileContainer: {
    margin: "0px",
    width: "95vw",
  },
}));

const mapStateToProps = (state, ownProps) => {
  return { language: state.language, publications: state.publcations };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    storePublications: (publcations) => {
      dispatch(fetchPublications(publcations));
    },
  };
};

const MobileCommissionDisplay = (props) => {
  const classes = useStyles();

  const [commissionDisplayed, setCommissionDisplayed] = useState(
    props.commissions[0].name
  );

  const handleClick = (name) => {
    setCommissionDisplayed(name);
    console.log(commissionDisplayed);
  };

  return (
    <Grid
      container
      direction="column"
      id="mobile-grid-container"
      className={classes.mobileContainer}
    >
      <Grid item id="mobile-button-container" className={classes.content}>
        {props.commissions.map((commission, i) => {
          return (
            <Button
              key={i}
              variant="outlined"
              size="small"
              onClick={() => {
                handleClick(commission.name);
              }}
              className={classes.button}
            >
              {languageDisplay(commission.intro.title, props.language)}
            </Button>
          );
        })}
      </Grid>
      <Grid item id="mobile-content-container" className={classes.content}>
        <Commission commissionName={commissionDisplayed} />
      </Grid>
    </Grid>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withWidth()(MobileCommissionDisplay));
