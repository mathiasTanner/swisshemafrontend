import React, { useState } from "react";
import Query from "../../Query";
import FORM_QUERY from "../../../queries/forms/form";
import Forms from "../../Forms";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";

import { connect } from "react-redux";

import Paper from "@material-ui/core/Paper";
import ReactMarkdown from "react-markdown";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Moment from "react-moment";
import AddToCalendar from "@culturehq/add-to-calendar";
import "@culturehq/add-to-calendar/dist/styles.css";
import Button from "@material-ui/core/Button";
import GoogleMapReact from "google-map-react";
import { mapsKey, mapCenter } from "../../../GoogleApi";
import Marker from "../../Marker";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import languageDisplay from "../../../functions/languageDisplay";

import {
  scheduleLabel,
  presentationsLabel,
  registrationLabel,
  priceLabel,
  closeLabel,
} from "../../../JSONdata/label";

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
  logo: {
    maxHeight: "50vh",
  },
  title: {
    padding: "15px",
    margin: "auto",
    marginTop: "15px",
    marginBottom: "15px",
    width: "100%",
    textAlign: "center",
    color: `${theme.palette.primary.dark} `,
  },
  header: {
    color: `${theme.palette.primary.dark} `,
    margin: "auto",
    width: "80%",
  },
  heading: {
    textAlign: "center",
    margin: "auto",
  },
  content: {
    margin: "auto",
    paddingLeft: "2vw",
    paddingRight: "2vw",
    width: "80%",
    [theme.breakpoints.down("xs")]: {
      margin: "0px",
      width: "100%",
    },
  },
  dates: {
    marginTop: "10px",
    marginBottom: "10px",
    color: `${theme.palette.secondary.contrastText} `,
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
  map: {
    margin: "2vh",
    height: "60vh",
    width: "90vw",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "80vw",
    },
  },
  address: {
    margin: "15px",
    width: "80%",
  },
  schedule: {
    textAlign: "center",
  },
  scheduleImg: {
    maxHeight: "40vh",
    maxWidth: "90vw",
  },
  presentationimage: {
    maxHeight: "40vh",
    maxWidth: "60vw",
  },
  authorIntro: {
    maxWidth: "40vw",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "90vw",
    },
  },
  presentationintro: {
    marginBottom: "3vh",
  },
  presentation: {
    margin: "10px",
    marginBottom: "5vh",
    [theme.breakpoints.down("xs")]: {
      margin: "0px",
    },
  },
  divider: {
    margin: "5vh",
  },
}));

const mapStateToProps = (state, ownProps) => {
  return { language: state.language };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

const Evenement = (props) => {
  const classes = useStyles();
  const isMobile = useMediaQuery(useTheme().breakpoints.down("xs"));
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(props.event);
  let loc = { logo: props.event.image, name: props.event.location };

  return (
    <>
      <Paper className={classes.root}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item id="title" className={classes.title}>
            {props.event.image !== null && !isMobile ? (
              <p>
                <img
                  src={
                    process.env.REACT_APP_BACKEND_URL + props.event.image.url
                  }
                  alt="event logo"
                  className={classes.logo}
                />
              </p>
            ) : null}
            <Typography
              variant={isMobile ? "h6" : "h4"}
              className={classes.header}
            >
              {languageDisplay(props.event.intro.title, props.language)}
            </Typography>
          </Grid>
          <Grid item id="intro" className={classes.content}>
            <Typography
              variant={"body1"}
              component={ReactMarkdown}
              source={
                languageDisplay(props.event.intro.paragraph, props.language)
                  .props.children
              }
            />
          </Grid>
          {props.event.start < new Date() || props.event.start !== null ? (
            <Grid id="eventDate" className={classes.title}>
              <Typography
                variant={isMobile ? "h6" : "h5"}
                className={classes.header}
              >
                {languageDisplay(
                  props.event.labels.find(
                    ({ identifier }) => identifier === "dates"
                  ),
                  props.language
                )}
              </Typography>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={3}
                className={classes.dates}
              >
                <Grid item>
                  <Typography variant="h6">
                    <Moment format="DD/MM/YYYY HH:mm">
                      {props.event.start}
                    </Moment>
                  </Typography>
                </Grid>
                <Grid item>{" - "}</Grid>
                <Grid item>
                  <Typography variant="h6">
                    <Moment format="DD/MM/YYYY HH:mm">{props.event.end}</Moment>
                  </Typography>
                </Grid>
              </Grid>
              {props.event.location !== null ? (
                <AddToCalendar
                  event={{
                    name: props.event.name,
                    details: languageDisplay(
                      props.event.intro.paragraph,
                      props.language
                    ).props.children,
                    location: props.event.location,
                    startsAt: props.event.start,
                    endsAt: props.event.end,
                  }}
                />
              ) : null}
            </Grid>
          ) : null}
          {props.event.registration_start !== null ? (
            <Grid id="registrationDate" className={classes.title}>
              <Typography
                variant={isMobile ? "h6" : "h5"}
                className={classes.header}
              >
                {languageDisplay(
                  props.event.labels.find(
                    ({ identifier }) => identifier === "registrations"
                  ),
                  props.language
                )}
              </Typography>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={3}
                className={classes.dates}
              >
                <Grid item>
                  <Typography variant="h6">
                    <Moment format="DD/MM/YYYY">
                      {props.event.registration_start}
                    </Moment>
                  </Typography>
                </Grid>
                <Grid item>{" - "}</Grid>
                <Grid item>
                  <Typography variant="h6">
                    <Moment format="DD/MM/YYYY">
                      {props.event.registration_end}
                    </Moment>
                  </Typography>
                </Grid>
              </Grid>
              {props.event.price !== null ? (
                <Typography variant="button" component="p">
                  {languageDisplay(priceLabel, props.language).props.children +
                    ": " +
                    props.event.price +
                    " CHF"}
                </Typography>
              ) : null}
              {new Date() > new Date(props.event.registration_start) &&
              new Date() < new Date(props.event.registration_end) ? (
                <Button
                  variant="outlined"
                  onClick={handleClickOpen}
                  classes={{ root: classes.button }}
                >
                  {languageDisplay(registrationLabel, props.language)}
                </Button>
              ) : null}
            </Grid>
          ) : null}
          {props.event.location !== null ? (
            <>
              <Grid item id="map-title" className={classes.title}>
                <Typography
                  variant={isMobile ? "h6" : "h4"}
                  className={classes.header}
                >
                  {languageDisplay(
                    props.event.labels.find(
                      ({ identifier }) => identifier === "locationTitle"
                    ),
                    props.language
                  )}
                </Typography>
              </Grid>
              <Grid item id="address" className={classes.address}>
                <Typography
                  variant={"button"}
                  component={ReactMarkdown}
                  source={props.event.address}
                />
              </Grid>
              <Grid item id="map" className={classes.map}>
                {props.event.latitude !== null &&
                props.event.longitude !== null ? (
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      key: mapsKey,
                    }}
                    defaultCenter={mapCenter}
                    defaultZoom={isMobile ? 6.5 : 8}
                  >
                    <Marker
                      name={props.event.location}
                      location={loc}
                      lat={props.event.latitude}
                      lng={props.event.longitude}
                    />
                  </GoogleMapReact>
                ) : null}
              </Grid>
            </>
          ) : null}
          {props.event.Schedule.length !== 0 ? (
            <>
              <Grid item id="schedule-title" className={classes.title}>
                <Typography
                  variant={isMobile ? "h6" : "h4"}
                  className={classes.header}
                >
                  {languageDisplay(scheduleLabel, props.language)}
                </Typography>
              </Grid>
              <Grid item id="schedule" className={classes.schedule}>
                {props.event.Schedule.map((item, i) => {
                  return (
                    <span key={i}>
                      <img
                        src={process.env.REACT_APP_BACKEND_URL + item.url}
                        alt={item.name}
                        className={classes.scheduleImg}
                      />
                      <br />
                    </span>
                  );
                })}
              </Grid>
            </>
          ) : null}
          {props.event.presentations.length !== 0 ? (
            <>
              <Grid item id="presentation-title" className={classes.title}>
                <Typography
                  variant={isMobile ? "h6" : "h4"}
                  className={classes.header}
                >
                  {languageDisplay(presentationsLabel, props.language)}
                </Typography>
              </Grid>
              <Grid item id="presentations">
                {props.event.presentations.map((presentation, i) => {
                  return (
                    <div key={i} className={classes.presentation}>
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={3}
                        className={classes.presentationintro}
                      >
                        <Grid item>
                          <img
                            src={
                              process.env.REACT_APP_BACKEND_URL +
                              presentation.image.url
                            }
                            className={classes.presentationimage}
                            alt={presentation.image.name}
                          />
                        </Grid>
                        <Grid item>
                          <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="flex-start"
                            spacing={1}
                          >
                            <Grid item>
                              <Typography variant="button">
                                {presentation.Author}
                              </Typography>
                            </Grid>
                            <Grid item className={classes.authorIntro}>
                              <Typography
                                variant={"body1"}
                                component={ReactMarkdown}
                                source={
                                  languageDisplay(
                                    presentation.authorIntro,
                                    props.language
                                  ).props.children
                                }
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <div id={"presentation-div" + i}>
                        <Typography variant="h6" className={classes.content}>
                          {languageDisplay(presentation.title, props.language)}
                        </Typography>
                        <Typography variant="body1" className={classes.content}>
                          {languageDisplay(
                            presentation.content,
                            props.language
                          )}
                        </Typography>
                        {i === props.event.presentations.length - 1 ? null : (
                          <Divider className={classes.divider} />
                        )}
                      </div>
                    </div>
                  );
                })}
              </Grid>
            </>
          ) : null}
        </Grid>
        {
          <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            aria-labelledby="form-title"
            scroll="paper"
          >
            <DialogTitle id="form-title">{props.event.form.name}</DialogTitle>
            <DialogContent>
              <Query query={FORM_QUERY} id={props.event.form.id}>
                {({ data: { form } }) => {
                  return (
                    <Forms
                      form={form}
                      handleClose={handleClose}
                      eventId={props.event.id}
                    />
                  );
                }}
              </Query>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                {languageDisplay(closeLabel, props.language)}
              </Button>
            </DialogActions>
          </Dialog>
        }
      </Paper>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Evenement);
