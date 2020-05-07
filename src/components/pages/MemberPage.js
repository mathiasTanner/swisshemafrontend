import React, { useState } from "react";
import PageQuery from "../PageQuery";
import Query from "../Query";
import MEMBERPAGE_QUERY from "../../queries/memberpage";
import FORM_QUERY from "../../queries/forms/form";

import ContactForm from "../ContactForm";

import withWidth from "@material-ui/core/withWidth";

import { connect } from "react-redux";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";

import GoogleMapReact from "google-map-react";
import { mapsKey, mapCenter } from "../../GoogleApi";
import Marker from "../Marker";

import ReactMarkdown from "react-markdown";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HttpIcon from "@material-ui/icons/Http";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Link from "@material-ui/core/Link";
import MaterialTable from "material-table";
import Moment from "react-moment";
import Box from "@material-ui/core/Box";

import languageDisplay from "../../functions/languageDisplay";
import daySelector from "../../functions/daySelector";
import { name, website, search } from "../../JSONdata/label";

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
    maxWidth: "40vw",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "75vw",
    },
    backgroundColor: `${theme.palette.primary.dark} `,
    color: `${theme.palette.secondary.light} `,
  },
  cardTitle: {},
  table: {
    [theme.breakpoints.down("sm")]: {
      minWidth: "650",
    },
  },
  tablecell: {
    color: `${theme.palette.secondary.light} `,
  },
  memberList: {
    width: "90vw",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "80vw",
    },
  },
  trainingcontainer: {
    margin: "15px",
  },
  daycontainer: {
    margin: "15px",
  },
  hourcontainer: {
    margin: "15px",
  },
  elementContainers: {
    margin: "5vh",
    maxWidth: "90vw",
  },
  passiveTable: {
    width: "90vw",
  },
  map: {
    margin: "2vh",
    height: "60vh",
    width: "90vw",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "80vw",
    },
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
  const isMobile = useMediaQuery(useTheme().breakpoints.down("xs"));

  const [openContact, setOpenContact] = useState(false);

  let members = [];
  let passiveMembers = [];
  let locationList = [];

  const columns = {
    EN: [
      {
        title: "Logo",
        field: "logo",
        searchable: false,
        sorting: false,

        render: (rowData) =>
          isMobile ? (
            <Link href={rowData.website} target="_blank" rel="noreferrer">
              <img
                src={process.env.REACT_APP_BACKEND_URL + rowData.logo}
                style={{ maxWidth: "50px", maxHeight: "50px" }}
                alt="logo"
              />
            </Link>
          ) : (
            <img
              src={process.env.REACT_APP_BACKEND_URL + rowData.logo}
              style={{ maxWidth: "50px", maxHeight: "50px" }}
              alt="logo"
            />
          ),
      },
      {
        title: "Name",
        field: "name",
        customSort: (a, b) => {
          var nameA = a.name.toUpperCase();
          var nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        },
        defaultSort: "asc",
      },
      {
        field: "website",
        searchable: false,
        sorting: false,
        render: (rowData) =>
          isMobile ? null : (
            <Button
              variant="outlined"
              component={Link}
              href={rowData.website}
              target="_blank"
              rel="noreferrer"
              classes={{ root: classes.button }}
            >
              Website
            </Button>
          ),
      },
    ],
    FR: [
      {
        title: "Logo",
        field: "logo",
        render: (rowData) =>
          isMobile ? (
            <Link href={rowData.website} target="_blank" rel="noreferrer">
              <img
                src={process.env.REACT_APP_BACKEND_URL + rowData.logo}
                style={{ maxWidth: "50px", maxHeight: "50px" }}
                alt="logo"
              />
            </Link>
          ) : (
            <img
              src={process.env.REACT_APP_BACKEND_URL + rowData.logo}
              style={{ maxWidth: "50px", maxHeight: "50px" }}
              alt="logo"
            />
          ),
      },
      {
        title: "Nom",
        field: "name",
        customSort: (a, b) => {
          var nameA = a.name.toUpperCase();
          var nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        },
        defaultSort: "asc",
      },
      {
        field: "website",
        render: (rowData) =>
          isMobile ? null : (
            <Button
              variant="outlined"
              component={Link}
              href={rowData.website}
              target="_blank"
              rel="noreferrer"
              classes={{ root: classes.button }}
            >
              Site Web
            </Button>
          ),
      },
    ],
    DE: [
      {
        title: "Logo",
        field: "logo",
        render: (rowData) =>
          isMobile ? (
            <Link href={rowData.website} target="_blank" rel="noreferrer">
              <img
                src={process.env.REACT_APP_BACKEND_URL + rowData.logo}
                style={{ maxWidth: "50px", maxHeight: "50px" }}
                alt="logo"
              />
            </Link>
          ) : (
            <img
              src={process.env.REACT_APP_BACKEND_URL + rowData.logo}
              style={{ maxWidth: "50px", maxHeight: "50px" }}
              alt="logo"
            />
          ),
      },
      {
        title: "Name",
        field: "name",
        customSort: (a, b) => {
          var nameA = a.name.toUpperCase();
          var nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        },
        defaultSort: "asc",
      },
      {
        field: "website",
        render: (rowData) =>
          isMobile ? null : (
            <Button
              variant="outlined"
              component={Link}
              href={rowData.website}
              target="_blank"
              rel="noreferrer"
              classes={{ root: classes.button }}
            >
              Website
            </Button>
          ),
      },
    ],
    IT: [
      {
        title: "Logo",
        field: "logo",
        render: (rowData) =>
          isMobile ? (
            <Link href={rowData.website} target="_blank" rel="noreferrer">
              <img
                src={process.env.REACT_APP_BACKEND_URL + rowData.logo}
                style={{ maxWidth: "50px", maxHeight: "50px" }}
                alt="logo"
              />
            </Link>
          ) : (
            <img
              src={process.env.REACT_APP_BACKEND_URL + rowData.logo}
              style={{ maxWidth: "50px", maxHeight: "50px" }}
              alt="logo"
            />
          ),
      },
      {
        title: "Nuomo",
        field: "name",
        customSort: (a, b) => {
          var nameA = a.name.toUpperCase();
          var nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        },
        defaultSort: "asc",
      },
      {
        field: "website",
        render: (rowData) =>
          isMobile ? null : (
            <Button
              variant="outlined"
              component={Link}
              href={rowData.website}
              target="_blank"
              rel="noreferrer"
              classes={{ root: classes.button }}
            >
              Sito web
            </Button>
          ),
      },
    ],
    RO: [
      {
        title: "Simbol",
        field: "logo",
        render: (rowData) =>
          isMobile ? (
            <Link href={rowData.website} target="_blank" rel="noreferrer">
              <img
                src={process.env.REACT_APP_BACKEND_URL + rowData.logo}
                style={{ maxWidth: "50px", maxHeight: "50px" }}
                alt="logo"
              />
            </Link>
          ) : (
            <img
              src={process.env.REACT_APP_BACKEND_URL + rowData.logo}
              style={{ maxWidth: "50px", maxHeight: "50px" }}
              alt="logo"
            />
          ),
      },
      {
        title: "Num",
        field: "name",
        customSort: (a, b) => {
          var nameA = a.name.toUpperCase();
          var nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        },
        defaultSort: "asc",
      },
      {
        field: "website",
        render: (rowData) =>
          isMobile ? null : (
            <Button
              variant="outlined"
              component={Link}
              href={rowData.website}
              target="_blank"
              rel="noreferrer"
              classes={{ root: classes.button }}
            >
              Website
            </Button>
          ),
      },
    ],
  };

  const handleContactOpen = () => {
    setOpenContact(true);
  };

  const handleContactClose = () => {
    setOpenContact(false);
  };

  //TODO: search by canton function: JSON file with all the cantons and their center corrdinate, filter list by cantons, fltered list that render the markers

  return (
    <PageQuery query={MEMBERPAGE_QUERY}>
      {({ data: { memberPage } }) => {
        memberPage.memberlist.map((member) => {
          if (!member.passive) {
            member.location.map((location) => {
              locationList.push({
                name:
                  member.abbreviation === null || member.abbreviation === ""
                    ? member.name
                    : member.abbreviation,
                logo: member.logo,
                canton: location.Canton,
                lat: location.latitude,
                lng: location.longitude,
                website: member.webite,
              });
              return null;
            });
            if (member.abbreviation === null || member.abbreviation === "") {
              members.push({
                name: member.name,
                logo: member.logo.url,
                website: member.website,
                training: member.training,
              });
            } else {
              members.push({
                name: member.abbreviation + " (" + member.name + ")",
                logo: member.logo.url,
                website: member.website,
                training: member.training,
              });
            }
          } else {
            passiveMembers.push({
              name: member.name,
              logo: member.logo === null ? null : member.logo.url,
              website: member.website,
            });
          }

          return null;
        });

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
              <Grid item id="map" className={classes.map}>
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: mapsKey,
                  }}
                  defaultCenter={mapCenter}
                  defaultZoom={isMobile ? 6.5 : 8}
                >
                  {locationList.map((location, i) => {
                    return (
                      <Marker
                        location={location}
                        key={i}
                        lat={location.lat}
                        lng={location.lng}
                      />
                    );
                  })}
                </GoogleMapReact>
              </Grid>
              <Grid item id="memberList" className={classes.memberList}>
                <MaterialTable
                  title="memberlist"
                  columns={
                    languageDisplay(columns, props.language).props.children
                  }
                  data={members}
                  options={{
                    paging: false,
                    searchText: "",
                    showTitle: false,
                  }}
                  localization={{
                    toolbar: {
                      searchPlaceholder: languageDisplay(search, props.language)
                        .props.children,
                    },
                    body: {
                      deleteTooltip: "Delete",
                    },
                  }}
                  detailPanel={(rowData) => {
                    return (
                      <Grid
                        container
                        direction={isMobile ? "column" : "row"}
                        justify="flex-start"
                        alignItems="center"
                      >
                        {rowData.training.map((training, i) => {
                          return (
                            <Grid
                              item
                              key={i}
                              className={classes.trainingcontainer}
                            >
                              <Grid
                                container
                                direction={isMobile ? "column" : "row"}
                                justify="flex-start"
                                alignItems="center"
                              >
                                <Grid item className={classes.daycontainer}>
                                  <Typography variant="subtitle2">
                                    <Box fontWeight="fontWeightBold">
                                      {training.location}:
                                    </Box>
                                  </Typography>
                                </Grid>
                                <Grid item className={classes.timecontainer}>
                                  <Grid container direction="column">
                                    {training.hours.map((hour, i) => {
                                      return (
                                        <Grid item key={i}>
                                          <Typography variant="caption">
                                            <Box fontWeight="fontWeightBold">
                                              {daySelector(
                                                hour.day,
                                                props.language
                                              )}
                                            </Box>
                                          </Typography>
                                          {hour.start !== null ? (
                                            <Typography variant="caption">
                                              <Moment
                                                parse="HH:mm"
                                                format="HH:mm"
                                              >
                                                {hour.start}
                                              </Moment>
                                              -
                                              <Moment
                                                parse="HH:mm"
                                                format="HH:mm"
                                              >
                                                {hour.end}
                                              </Moment>
                                            </Typography>
                                          ) : null}
                                        </Grid>
                                      );
                                    })}
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          );
                        })}
                      </Grid>
                    );
                  }}
                  onRowClick={(event, rowData, togglePanel) => togglePanel()}
                />
              </Grid>
              <Grid
                item
                id="passiveMembers"
                className={classes.elementContainers}
              >
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
                <Table className={classes.passiveTable}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Logo </TableCell>
                      <TableCell>
                        {languageDisplay(name, props.language)}
                      </TableCell>
                      {isMobile ? null : (
                        <TableCell>
                          {languageDisplay(website, props.language)}
                        </TableCell>
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {passiveMembers.map((member, i) => {
                      return (
                        <TableRow key={i}>
                          <TableCell>
                            {member.logo == null ? (
                              "/"
                            ) : (
                              <img
                                src={
                                  process.env.REACT_APP_BACKEND_URL +
                                  member.logo
                                }
                                style={{ maxWidth: "50px", maxHeight: "50px" }}
                                alt="logo"
                              />
                            )}
                          </TableCell>
                          <TableCell>
                            {isMobile ? (
                              member.website === null ||
                              member.website === "" ? (
                                member.name
                              ) : (
                                <Link
                                  href={member.website}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {member.name}
                                </Link>
                              )
                            ) : (
                              member.name
                            )}
                          </TableCell>
                          {isMobile ? null : (
                            <TableCell>
                              {member.website == null ||
                              member.website === "" ? (
                                "/"
                              ) : (
                                <Button
                                  variant="outlined"
                                  component={Link}
                                  href={member.website}
                                  target="_blank"
                                  rel="noreferrer"
                                  classes={{ root: classes.button }}
                                >
                                  {languageDisplay(website, props.language)}
                                </Button>
                              )}
                            </TableCell>
                          )}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Grid>
              <Grid item id="otherGroups" className={classes.elementContainers}>
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
                      size={isMobile ? "medium" : "small"}
                      aria-label="other-table"
                      className="table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell className={classes.tablecell}>
                            {languageDisplay(name, props.language)}
                          </TableCell>
                          <TableCell
                            className={classes.tablecell}
                            align={isMobile ? "left" : "right"}
                          >
                            {languageDisplay(website, props.language)}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {memberPage.groups.map((group, i) => {
                          return (
                            <TableRow key={i}>
                              <TableCell className={classes.tablecell}>
                                {group.name}
                              </TableCell>
                              <TableCell
                                className={classes.tablecell}
                                align={isMobile ? "left" : "right"}
                              >
                                {isMobile ? (
                                  <IconButton
                                    color="secondary"
                                    component={Link}
                                    href={group.link}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <HttpIcon size="medium" />
                                  </IconButton>
                                ) : (
                                  <Link
                                    href={group.link}
                                    color="inherit"
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    {group.link}
                                  </Link>
                                )}
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
