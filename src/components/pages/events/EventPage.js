import React from "react";

import PageQuery from "../../PageQuery";
import EVENTPAGE_QUERY from "../../../queries/eventPage";
import Query from "../../Query";
import PUBLICATIONS_BY_CATEGORY_QUERY from "../../../queries/publication/publicationByCategory";
import Publications from "../../Publications";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import withWidth from "@material-ui/core/withWidth";

import { connect } from "react-redux";
import { Link } from "@reach/router";

import ReactMarkdown from "react-markdown";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { fetchPublications } from "../../../actions";

import languageDisplay from "../../../functions/languageDisplay";

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
  title: {
    padding: "15px",
    margin: "15px",
    textAlign: "center",
    color: `${theme.palette.primary.dark} `,
  },
  header: {
    color: `${theme.palette.primary.dark} `,
    margin: "10px",
  },
  content: {
    margin: "5px",
    paddingLeft: "2vw",
    paddingRight: "2vw",
    [theme.breakpoints.down("xs")]: {
      margin: "0px",
    },
  },
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
  publications: {
    textAlign: "center",
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

const EventPage = (props) => {
  const classes = useStyles();
  const isMobile = useMediaQuery(useTheme().breakpoints.down("xs"));

  return (
    <>
      <PageQuery query={EVENTPAGE_QUERY}>
        {({ data: { eventPage } }) => {
          return (
            <Paper className={classes.root} id="paper">
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                id="gridContainer"
              >
                <Grid item id="title" className={classes.title}>
                  <Typography
                    variant={isMobile ? "h6" : "h4"}
                    className={classes.header}
                  >
                    {languageDisplay(eventPage.intro.title, props.language)}
                  </Typography>
                </Grid>
                <Grid item id="intro" className={classes.content}>
                  <Typography
                    className={classes.content}
                    variant={"body1"}
                    component={ReactMarkdown}
                    source={
                      languageDisplay(eventPage.intro.paragraph, props.language)
                        .props.children
                    }
                  />
                </Grid>
                <Grid item id="calendarButton">
                  <Button
                    variant="outlined"
                    component={Link}
                    to={
                      "/" +
                      eventPage.labels.find(
                        ({ identifier }) => identifier === "calendar"
                      ).identifier
                    }
                    target="_blank"
                    rel="noreferrer"
                    className={classes.button}
                  >
                    {languageDisplay(
                      eventPage.labels.find(
                        ({ identifier }) => identifier === "calendar"
                      ),
                      props.language
                    )}
                  </Button>
                </Grid>
                <Grid item id="EventsButtons">
                  <Typography
                    variant={isMobile ? "h6" : "h5"}
                    className={classes.title}
                  >
                    {languageDisplay(
                      eventPage.labels.find(
                        ({ identifier }) =>
                          identifier === "federationEventsTitle"
                      ),
                      props.language
                    )}
                  </Typography>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    id="button-grid-container"
                  >
                    {eventPage.labels.map((label, i) => {
                      return label.identifier === "calendar" ||
                        label.identifier === "federationEventsTitle" ? null : (
                        <Grid item id={"button-grid" + i} key={i}>
                          <Button
                            key={i}
                            variant="outlined"
                            component={Link}
                            to={"/" + label.identifier}
                            target="_blank"
                            rel="noreferrer"
                            className={classes.button}
                          >
                            {languageDisplay(label, props.language)}
                          </Button>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
                <Grid
                  item
                  id="publicationList"
                  className={classes.publications}
                >
                  <Query query={PUBLICATIONS_BY_CATEGORY_QUERY} name={"event"}>
                    {({ data: { categories } }) => {
                      return (
                        <Publications
                          publications={categories[0].publications}
                        />
                      );
                    }}
                  </Query>
                </Grid>
              </Grid>
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
)(withWidth()(EventPage));
