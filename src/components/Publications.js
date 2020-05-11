import React, { useState } from "react";

import { connect } from "react-redux";

import { Link } from "@reach/router";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";

import ReactMarkdown from "react-markdown";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

import languageDisplay from "../functions/languageDisplay";

const useStyles = makeStyles((theme) => ({
  subheader: {
    color: `${theme.palette.primary.dark} `,
    margin: "20px",
    [theme.breakpoints.down("xs")]: {
      margin: "0px",
    },
  },
  expansion: {
    width: "60vw",
    margin: "5px",
    padding: "15px",
    backgroundColor: `${theme.palette.primary.dark} `,
    color: `${theme.palette.secondary.light} `,
    [theme.breakpoints.down("xs")]: {
      width: "90vw",
      margin: "0px",
      padding: "0px",
    },
  },
  expansionDetail: {
    [theme.breakpoints.down("xs")]: {
      margin: "0px",
      padding: "0px",
    },
  },
  heading: {
    textAlign: "center",
    margin: "auto",
  },
  image: {
    height: "100%",
    width: "100%",
    margin: "auto",
  },
  button: {
    color: `${theme.palette.primary.dark} `,
    backgroundColor: `${theme.palette.secondary.light} `,
  },
}));

const mapStateToProps = (state, ownProps) => {
  return { language: state.language };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

const Publications = (props) => {
  const classes = useStyles();
  const isMobile = useMediaQuery(useTheme().breakpoints.down("xs"));

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Typography variant="h5" className={classes.subheader}>
        News
      </Typography>
      {props.publications.map((publication, i) => {
        return (
          <ExpansionPanel
            classes={{ root: classes.expansion }}
            expanded={expanded === i}
            onChange={handleChange(i)}
            key={i}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel-content"
              id="panel-header"
            >
              <Typography variant="button" className={classes.heading}>
                {languageDisplay(publication.title, props.language)}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails
              id={"expansion-detail-" + i}
              className={classes.expansionDetail}
            >
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item>
                  <img
                    src={
                      process.env.REACT_APP_BACKEND_URL + publication.image.url
                    }
                    alt={publication.image.name}
                    className={classes.image}
                  />
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    component={ReactMarkdown}
                    source={
                      languageDisplay(publication.content, props.language).props
                        .children
                    }
                  />
                </Grid>
              </Grid>
            </ExpansionPanelDetails>
            {publication.categories.filter(
              (category) => category.name === "event"
            ).length > 0 ? (
              <ExpansionPanelActions>
                <Button
                  size={isMobile ? "small" : "medium"}
                  component={Link}
                  to={"/" + publication.event.pagename}
                  variant="contained"
                  className={classes.button}
                >
                  {languageDisplay(publication.title, props.language)}
                </Button>
              </ExpansionPanelActions>
            ) : (
              ""
            )}
          </ExpansionPanel>
        );
      })}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Publications);
