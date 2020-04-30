import React, { useEffect, useState } from "react";
import PageQuery from "../PageQuery";
import Query from "../Query";
import MEMBERPAGE_QUERY from "../../queries/memberpage";
import FORM_QUERY from "../../queries/forms/form";

import ContactForm from "../ContactForm";

import withWidth from "@material-ui/core/withWidth";

import { connect } from "react-redux";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";

import ReactMarkdown from "react-markdown";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Link from "@material-ui/core/Link";

import languageDisplay from "../../functions/languageDisplay";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "15px",
    padding: "5px",
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
    margin: "5px",
    paddingLeft: "2vw",
    paddingRight: "2vw",
  },
  buttonContainer: {
    textAlign: "left",
    width: "100%",
    margin: "5px",
    paddingLeft: "2vw",
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
  card: {
    minWidth: "80vw",
    backgroundColor: `${theme.palette.primary.dark} `,
    color: `${theme.palette.secondary.light} `,
  },
  cardTitle: {},
  table: {
    color: `${theme.palette.secondary.light} `,
  },
}));

const mapStateToProps = (state, ownProps) => {
  return { language: state.language };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

const MemberPage = (props) => {
  const classes = useStyles();
  const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));

  const [openContact, setOpenContact] = useState(false);
  const handleContactOpen = () => {
    setOpenContact(true);
  };

  const handleContactClose = () => {
    setOpenContact(false);
  };

  return (
    <PageQuery query={MEMBERPAGE_QUERY}>
      {({ data: { memberPage } }) => {
        console.log(memberPage);

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
                  {languageDisplay(memberPage.pagetitle, props.language)}
                </Typography>
              </Grid>
              <Grid item id="content" className={classes.content}>
                <Typography
                  variant={"body1"}
                  component={ReactMarkdown}
                  source={
                    languageDisplay(
                      memberPage.trainingLocationText,
                      props.language
                    ).props.children
                  }
                />
              </Grid>
              <Grid item id="button" className={classes.buttonContainer}>
                <Button
                  variant="outlined"
                  classes={{ root: classes.button }}
                  onClick={handleContactOpen}
                >
                  {languageDisplay(
                    memberPage.contactButtonLabel,
                    props.language
                  )}
                </Button>
              </Grid>
              <Grid item id="map">
                <p>map coming later</p>
              </Grid>
              <Grid item id="memberList">
                <p>memberlist coming later</p>
              </Grid>
              <Grid item id="passiveMembers">
                <Typography
                  variant={isMobile ? "h6" : "h5"}
                  className={classes.header}
                >
                  {languageDisplay(
                    memberPage.passiveMemberLabel,
                    props.language
                  )}
                </Typography>
              </Grid>
              <Grid item id="passiveList">
                passive memberlist comming soon
              </Grid>
              <Grid item id="otherGroups">
                <Card className={classes.card}>
                  <CardContent>
                    <Typography
                      variant={isMobile ? "h6" : "h5"}
                      className={classes.cardTitle}
                    >
                      {languageDisplay(
                        memberPage.otherGroupLabel,
                        props.language
                      )}
                    </Typography>
                    <Typography
                      variant={"body1"}
                      component={ReactMarkdown}
                      source={
                        languageDisplay(
                          memberPage.otherGroupText,
                          props.language
                        ).props.children
                      }
                    />
                    <Table
                      className={classes.table}
                      size="small"
                      aria-label="other-table"
                    >
                      <TableHead className={classes.table}>
                        <TableRow className={classes.table}>
                          <TableCell className={classes.table}>
                            {languageDisplay(
                              {
                                EN: "Name",
                                FR: "Nom",
                                DE: "Name",
                                IT: "Nome",
                                RO: "num",
                              },
                              props.language
                            )}
                          </TableCell>
                          <TableCell className={classes.table}>
                            {languageDisplay(
                              {
                                EN: "Website",
                                FR: "Site web",
                                DE: "Website",
                                IT: "Sito web",
                                RO: "Website",
                              },
                              props.language
                            )}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {memberPage.groups.map((group, i) => {
                          return (
                            <TableRow key={i}>
                              <TableCell className={classes.table}>
                                {group.name}
                              </TableCell>
                              <TableCell className={classes.table}>
                                <Link
                                  href={group.link}
                                  color="inherit"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {group.link}
                                </Link>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <span>{props.width}</span>
            <Query query={FORM_QUERY} id={memberPage.form.id}>
              {({ data: { form } }) => {
                return (
                  <ContactForm
                    form={form}
                    open={openContact}
                    close={handleContactClose}
                    contactLabel={memberPage.contactButtonLabel}
                  />
                );
              }}
            </Query>
          </Paper>
        );
      }}
    </PageQuery>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withWidth()(MemberPage));
