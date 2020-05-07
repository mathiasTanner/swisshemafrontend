import React from "react";
import PageQuery from "../PageQuery";
import INTERNATIONAL_QUERY from "../../queries/international";
import FederationList from "../FederationList";

import { connect } from "react-redux";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import withWidth from "@material-ui/core/withWidth";

import ReactMarkdown from "react-markdown";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

import languageDisplay from "../../functions/languageDisplay";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "15px",
    padding: "15px",
    [theme.breakpoints.down("xs")]: {
      margin: "0px",
    },
  },
  title: {
    padding: "15px",
    margin: "15px",
    textAlign: "center",
  },
  header: {
    color: `${theme.palette.primary.dark} `,
    margin: "10px",
  },
  subheader: {
    color: `${theme.palette.primary.dark} `,
    margin: "10px",
    fontStyle: "italic",
  },
  content: {
    margin: "5px",
    paddingLeft: "2vw",
    paddingRight: "2vw",
  },
  logo: {
    margin: "10px",
    [theme.breakpoints.down("xs")]: {
      maxHeight: "90%",
      maxWidth: "90%",
    },
  },
  list: {
    margin: "10px",
  },
}));

const mapStateToProps = (state, ownProps) => {
  return { language: state.language };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

const International = (props) => {
  const classes = useStyles();
  const isMobile = useMediaQuery(useTheme().breakpoints.down("xs"));

  return (
    <PageQuery query={INTERNATIONAL_QUERY}>
      {({ data: { international } }) => {
        return (
          <Paper className={classes.root}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item id="title" className={classes.title}>
                <Typography
                  variant={isMobile ? "h6" : "h4"}
                  className={classes.header}
                >
                  {languageDisplay(international.intro.title, props.language)}
                </Typography>
                <Link
                  href={international.ifhemaLink.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className={classes.logo}
                    src={
                      process.env.REACT_APP_BACKEND_URL + international.logo.url
                    }
                    alt={international.logo.name}
                  />
                </Link>
              </Grid>
              <Grid item id="intro" className={classes.content}>
                <Typography
                  variant={"body1"}
                  component={ReactMarkdown}
                  source={
                    languageDisplay(
                      international.intro.paragraph,
                      props.language
                    ).props.children
                  }
                />
              </Grid>
              <Grid item id="ifhemaTitile" className={classes.title}>
                <Typography
                  variant={isMobile ? "h6" : "h5"}
                  className={classes.header}
                >
                  {languageDisplay(
                    international.ifhemamemberlist.name,
                    props.language
                  )}
                </Typography>
              </Grid>
              <Grid item id="ifhemaList" className={classes.List}>
                <FederationList
                  list={international.ifhemamemberlist.element}
                  dense={isMobile ? true : false}
                />
              </Grid>
              <Grid item id="otherTitle" className={classes.title}>
                <Typography
                  variant={isMobile ? "h6" : "h5"}
                  className={classes.header}
                >
                  {languageDisplay(
                    international.otherGroups.title,
                    props.language
                  )}
                </Typography>
              </Grid>
              <Grid item id="otherintro" className={classes.content}>
                <Typography
                  variant={"body1"}
                  component={ReactMarkdown}
                  source={
                    languageDisplay(
                      international.otherGroups.paragraph,
                      props.language
                    ).props.children
                  }
                />
              </Grid>
              <Grid item id="internationalTitle" className={classes.title}>
                <Typography variant={"body1"} className={classes.subheader}>
                  {languageDisplay(
                    international.internationalList.name,
                    props.language
                  )}
                </Typography>
              </Grid>
              <Grid item id="internationalList" className={classes.List}>
                <FederationList
                  list={international.internationalList.element}
                  dense={isMobile ? true : false}
                />
              </Grid>
              <Grid item id="europeTitle" className={classes.title}>
                <Typography variant={"body1"} className={classes.subheader}>
                  {languageDisplay(
                    international.europeList.name,
                    props.language
                  )}
                </Typography>
              </Grid>
              <Grid item id="europeList" className={classes.List}>
                <FederationList
                  list={international.europeList.element}
                  dense={isMobile ? true : false}
                />
              </Grid>
              <Grid item id="otherTitle" className={classes.title}>
                <Typography variant={"body1"} className={classes.subheader}>
                  {languageDisplay(
                    international.otherList.name,
                    props.language
                  )}
                </Typography>
              </Grid>
              <Grid item id="otherList" className={classes.List}>
                <FederationList
                  list={international.otherList.element}
                  dense={isMobile ? true : false}
                />
              </Grid>
            </Grid>
          </Paper>
        );
      }}
    </PageQuery>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withWidth()(International));
