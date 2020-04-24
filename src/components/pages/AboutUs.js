import React, { useEffect, useState } from "react";
import ABOUTUS_QUERY from "../../queries/aboutUs";
import PUBLICATIONS_QUERY from "../../queries/publication/publications";
import PageQuery from "../PageQuery";
import Query from "../Query";
import Publications from "../Publications";

import { connect } from "react-redux";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";

import ReactMarkdown from "react-markdown";
import Paper from "@material-ui/core/Paper";
import Hidden from "@material-ui/core/Hidden";
import Carousel from "react-material-ui-carousel";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import languageDisplay from "../../functions/languageDisplay";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "5px",
    padding: "5px",
    backgroundColor: `${theme.palette.secondary.main} `,
  },
  carousel: {
    minHeight: "40vh",
    minWidth: "100vw",
    flex: 1,
  },
  carouselImg: {
    maxHeight: "40vh",
    maxWidth: "95vw",
  },
  contentPaper: {
    backgroundColor: `${theme.palette.secondary.light} `,
    margin: "5px",
    padding: "15px",
  },
  hemaDef: {
    margin: "5px",
  },
  expansion: {
    backgroundColor: `${theme.palette.primary.dark} `,
    color: `${theme.palette.secondary.light} `,
  },
  summary: {
    textAlign: "center",
  },
  expansionTitle: {
    margin: "auto",
  },
  detail: {},
  langButton: {
    margin: "5px",
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
  },
  title: {
    padding: "15px",
    margin: "15px",
    textAlign: "center",
  },
  titleCard: {},
  content: {
    margin: "5px",
    paddingLeft: "2vw",
    paddingRight: "2vw",
  },
  publications: {
    textAlign: "center",
  },
  subheader: {
    color: `${theme.palette.primary.dark} `,
  },
}));

const mapStateToProps = (state, ownProps) => {
  return { language: state.language };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

const AboutUs = (props) => {
  const classes = useStyles();
  const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));
  const [lang, setLang] = useState();
  const langArray = [
    { code: "FR", name: "Français" },
    { code: "DE", name: "Deutsch" },
    { code: "EN", name: "English" },
    { code: "IT", name: "Italiano" },
    { code: "RO", name: "Rumantsch" },
  ];

  useEffect(() => {
    setLang(props.language);
  }, [props.language]);

  return (
    <PageQuery query={ABOUTUS_QUERY}>
      {({ data: { aboutUs } }) => {
        return (
          <Paper className={classes.root}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Hidden xsDown>
                <Grid item id="carousel" className="carousel">
                  <Carousel animation="slide">
                    {aboutUs.Slider.map((item, i) => {
                      const imgUrl =
                        process.env.REACT_APP_BACKEND_URL + item.url;
                      return (
                        <div key={i}>
                          <img
                            src={imgUrl}
                            alt={item.name}
                            className={classes.carouselImg}
                          />
                        </div>
                      );
                    })}
                  </Carousel>
                </Grid>
              </Hidden>
              <Paper className={classes.contentPaper}>
                <Grid item id="langButton" className={classes.langButton}>
                  <Grid
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="center"
                    spacing={isMobile ? 1 : 2}
                  >
                    {langArray.map((item, i) => {
                      return (
                        <Grid item key={i}>
                          <Button
                            variant="outlined"
                            classes={{ root: classes.button }}
                            onClick={() => setLang(item.code)}
                          >
                            {isMobile ? item.code : item.name}
                          </Button>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>

                <Grid item id="title" className={classes.title}>
                  <Typography variant={isMobile ? "h6" : "h4"}>
                    {languageDisplay(aboutUs.Title, lang)}
                  </Typography>
                </Grid>

                <Grid item id="hemaDef" className={classes.hemaDef}>
                  <ExpansionPanel classes={{ root: classes.expansion }}>
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="hema-content"
                      id="panel1a-header"
                      classes={{ root: classes.summary }}
                    >
                      <Typography
                        variant="h6"
                        className={classes.expansionTitle}
                      >
                        {languageDisplay(aboutUs.HEMATitle, lang)}
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.detail}>
                      <Typography
                        variant={"body1"}
                        component={ReactMarkdown}
                        source={
                          languageDisplay(aboutUs.HEMA, lang).props.children
                        }
                      />
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </Grid>
                <Grid item id="content" className={classes.content}>
                  <Typography
                    variant={"body1"}
                    component={ReactMarkdown}
                    source={
                      languageDisplay(aboutUs.content, lang).props.children
                    }
                  />
                </Grid>
                <Grid item id="publications" className={classes.publications}>
                  <Grid container justify="center">
                    <Query query={PUBLICATIONS_QUERY}>
                      {({ data: { publications } }) => {
                        return <Publications publications={publications} />;
                      }}
                    </Query>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Paper>
        );
      }}
    </PageQuery>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutUs);
