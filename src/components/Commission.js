import React from "react";
import Query from "./Query";
import COMMISSION_BY_NAME_QUERY from "../queries/commissions/commissionByName";

import Publications from "./Publications";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import withWidth from "@material-ui/core/withWidth";

import ReactMarkdown from "react-markdown";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Moment from "react-moment";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import languageDisplay from "../functions/languageDisplay";
import { document, download, show } from "../JSONdata/label";

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
  content: {
    padding: "1vw",
    width: "90vw",
    [theme.breakpoints.down("xs")]: {
      margin: "0px",
      maxWidth: "94vw",
    },
  },
  commissionContent: {
    margin: "5px",

    [theme.breakpoints.down("xs")]: {
      margin: "0px",
    },
  },
  publications: {
    textAlign: "center",
  },
  articleContainer: {
    [theme.breakpoints.down("xs")]: {
      maxWidth: "95vw",
    },
    maxWidth: "90vw",
    margin: "auto",
  },
  mediaArea: {
    margin: "auto",
  },
  table: {
    width: "90vw",
  },
  expansion: {
    margin: "5px",
    padding: "15px",
  },
  heading: {
    textAlign: "center",
    margin: "auto",
  },
  mediaMail: {
    marginLeft: "10px",
  },
}));

const mapStateToProps = (state, ownProps) => {
  return { language: state.language, publications: state.publications };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

//TODO: have video be embedded
//TODO: filter media list by type

const Commission = (props) => {
  const classes = useStyles();
  const isMobile = useMediaQuery(useTheme().breakpoints.down("xs"));

  const filteredPublications = [];

  for (let publication of props.publications) {
    for (const category of publication.categories) {
      if (category.name === props.commissionName) {
        filteredPublications.push(publication);
      }
    }
  }

  const displayType = (type, language) => {
    switch (type) {
      case "youtube":
        return <Typography variant="body1">Youtube</Typography>;
      case "doc":
        return (
          <Typography variant="body1">
            {languageDisplay(document, props.language)}
          </Typography>
        );
      case "video":
        return <Typography variant="body1">Video</Typography>;
      default:
        return null;
    }
  };

  return (
    <Query query={COMMISSION_BY_NAME_QUERY} name={props.commissionName}>
      {({ data: { commissions } }) => {
        const commission = commissions[0];

        return (
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            id="container"
            className={classes.content}
          >
            <Grid item id="commission-intro" className={classes.content}>
              <Typography
                variant={"body1"}
                component={ReactMarkdown}
                source={
                  languageDisplay(commission.intro.paragraph, props.language)
                    .props.children
                }
              />
            </Grid>
            <Grid
              item
              id="commission-content"
              className={classes.commissionContent}
            >
              {commission.articles.length > 0
                ? commission.articles.map((article, i) => {
                    return (
                      <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        id="commission-article-container"
                        className={classes.articleContainer}
                        key={i}
                      >
                        <Grid item id="articleTitle" className={classes.header}>
                          <Typography variant={isMobile ? "h6" : "h5"}>
                            {languageDisplay(article.title, props.language)}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          id="articleContent"
                          className={classes.content}
                        >
                          <Typography
                            variant={"body1"}
                            component={ReactMarkdown}
                            source={
                              languageDisplay(article.paragraph, props.language)
                                .props.children
                            }
                          />
                        </Grid>
                      </Grid>
                    );
                  })
                : null}
            </Grid>

            {commission.name !== "media" || isMobile ? null : (
              <Grid
                item
                id="commission-media-area"
                className={classes.mediaArea}
              >
                <Grid item id="media-zone-intro">
                  <Typography
                    variant={isMobile ? "h6" : "h4"}
                    className={classes.header}
                  >
                    {languageDisplay(
                      commission.mediaZoneIntro.title,
                      props.language
                    )}
                  </Typography>
                  <Typography
                    variant={"body1"}
                    component={ReactMarkdown}
                    source={
                      languageDisplay(
                        commission.mediaZoneIntro.paragraph,
                        props.language
                      ).props.children
                    }
                  />
                </Grid>
                <Grid item id="media-area-table">
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell id="media-table-head-name">
                          {languageDisplay(
                            commission.mediaLabels.find(
                              ({ identifier }) => identifier === "nameLabel"
                            ),
                            props.language
                          )}
                        </TableCell>
                        <TableCell id="media-table-head-author">
                          {languageDisplay(
                            commission.mediaLabels.find(
                              ({ identifier }) => identifier === "authorLabel"
                            ),
                            props.language
                          )}
                        </TableCell>
                        <TableCell id="media-table-head-date">
                          {languageDisplay(
                            commission.mediaLabels.find(
                              ({ identifier }) => identifier === "dateLabel"
                            ),
                            props.language
                          )}
                        </TableCell>
                        <TableCell id="media-table-head-type">
                          {languageDisplay(
                            commission.mediaLabels.find(
                              ({ identifier }) => identifier === "typeLabel"
                            ),
                            props.language
                          )}
                        </TableCell>
                        <TableCell id="media-table-head-link">
                          {languageDisplay(
                            commission.mediaLabels.find(
                              ({ identifier }) => identifier === "linkLabel"
                            ),
                            props.language
                          )}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {commission.media_elements.map((element, i) => {
                        return (
                          <TableRow key={i}>
                            <TableCell id="media-table-name">
                              {languageDisplay(element.name, props.language)}
                            </TableCell>
                            <TableCell id="media-table-author">
                              {element.author}
                            </TableCell>
                            <TableCell id="media-table-date">
                              <Moment format="DD/MM/YYYY">
                                {element.date}
                              </Moment>
                            </TableCell>
                            <TableCell id="media-table-type">
                              {displayType(element.type, props.language)}
                            </TableCell>
                            <TableCell id="media-table-link">
                              {element.type !== "youtube" ? (
                                <Button
                                  variant="outlined"
                                  component={Link}
                                  href={
                                    process.env.REACT_APP_BACKEND_URL +
                                    element.media[0].url
                                  }
                                  className={classes.button}
                                  target="_blank"
                                >
                                  {element.type === "video"
                                    ? languageDisplay(show, props.language)
                                    : languageDisplay(download, props.language)}
                                </Button>
                              ) : (
                                <Button
                                  variant="outlined"
                                  component={Link}
                                  href={element.link.link}
                                  className={classes.button}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  Youtube
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Grid>
                <Grid item id="media-area-formulary">
                  <ExpansionPanel className={classes.expansion} square>
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography variant="button" className={classes.heading}>
                        {languageDisplay(
                          commission.mediaLabels.find(
                            ({ identifier }) => identifier === "formularyTitle"
                          ),
                          props.language
                        )}
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Typography variant="body1">
                        {languageDisplay(
                          commission.mediaLabels.find(
                            ({ identifier }) => identifier === "mediaContact"
                          ),
                          props.language
                        )}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        className={classes.mediaMail}
                      >
                        {languageDisplay(
                          commission.mediaLabels.find(
                            ({ identifier }) => identifier === "mediaMail"
                          ),
                          props.language
                        )}
                      </Typography>
                      {/* <Query query={FORM_QUERY} id={commission.form.id}>
                        {({ data: { form } }) => {
                          return <Forms form={form} />;
                        }}
                      </Query> */}
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </Grid>
              </Grid>
            )}

            <Grid
              item
              id="commission-publications-area"
              className={classes.publications}
            >
              {filteredPublications.length > 0 ? (
                <Publications publications={filteredPublications} />
              ) : null}
            </Grid>
          </Grid>
        );
      }}
    </Query>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withWidth()(Commission));

Commission.propTypes = {
  commissionName: PropTypes.string.isRequired,
};
