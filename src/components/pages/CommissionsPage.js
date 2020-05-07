import React, { useState } from "react";
import PageQuery from "../PageQuery";
import COMMISSIONSPAGE_QUERY from "../../queries/commissionsPage";
import PUBLICATIONS_QUERY from "../../queries/publication/publications";
import MobileCommissionDisplay from "../MobileCommissionDisplay";
import Commission from "../Commission";

import { connect } from "react-redux";
import { fetchPublications } from "../../actions";
import PropTypes from "prop-types";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import withWidth from "@material-ui/core/withWidth";

import ReactMarkdown from "react-markdown";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import languageDisplay from "../../functions/languageDisplay";
import Query from "../PageQuery";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "15px",
    padding: "15px",
    [theme.breakpoints.down("xs")]: {
      margin: "0px",
      marginBottom: "15px",
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
    [theme.breakpoints.down("xs")]: {
      margin: "0px",
    },
  },
  appBar: {
    backgroundColor: `${theme.palette.primary.dark} `,
    color: `${theme.palette.secondary.light} `,
    [theme.breakpoints.down("xs")]: {
      margin: "0px",
      width: "100vw",
    },
  },
  commissionTabs: {
    margin: "15px",
    width: "90vw",
    [theme.breakpoints.down("xs")]: {
      margin: "0px",
      maxWidth: "100vw",
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

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box style={{ width: "90vw" }}>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const CommissionsPage = (props) => {
  const classes = useStyles();
  const isMobile = useMediaQuery(useTheme().breakpoints.down("xs"));

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <span>
      <Query query={PUBLICATIONS_QUERY}>
        {({ data: { publications } }) => {
          props.storePublications(publications);
          return null;
        }}
      </Query>
      <PageQuery query={COMMISSIONSPAGE_QUERY}>
        {({ data: { commissionPage } }) => {
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
                    {languageDisplay(
                      commissionPage.intro.title,
                      props.language
                    )}
                  </Typography>
                </Grid>
                <Grid item id="intro" className={classes.content}>
                  <Typography
                    className={classes.content}
                    variant={"body1"}
                    component={ReactMarkdown}
                    source={
                      languageDisplay(
                        commissionPage.intro.paragraph,
                        props.language
                      ).props.children
                    }
                  />
                </Grid>
                <Grid
                  item
                  title="commissionTabs"
                  className={classes.commissionTabs}
                >
                  {isMobile ? (
                    <MobileCommissionDisplay
                      commissions={commissionPage.commissions}
                    />
                  ) : (
                    <span>
                      <AppBar position="static" className={classes.appBar}>
                        <Tabs
                          value={value}
                          onChange={handleChange}
                          aria-label="commissions tabs"
                          centered={!isMobile}
                        >
                          {commissionPage.commissions.map((commission, i) => {
                            return (
                              <Tab
                                key={i}
                                label={languageDisplay(
                                  commission.intro.title,
                                  props.language
                                )}
                                wrapped
                                {...a11yProps(i)}
                              />
                            );
                          })}
                        </Tabs>
                      </AppBar>
                      {commissionPage.commissions.map((commission, i) => {
                        return (
                          <TabPanel value={value} index={i} key={i}>
                            <Commission
                              commissionName={commission.name}
                              id="commission"
                            />
                          </TabPanel>
                        );
                      })}
                    </span>
                  )}
                </Grid>
              </Grid>
            </Paper>
          );
        }}
      </PageQuery>
    </span>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withWidth()(CommissionsPage));
