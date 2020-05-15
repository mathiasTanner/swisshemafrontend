import React from "react";
import Query from "../../Query";
import FORM_QUERY from "../../../queries/forms/form";
import Forms from "../../Forms";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";

import { connect } from "react-redux";

import ReactMarkdown from "react-markdown";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MaterialTable from "material-table";
import Moment from "react-moment";
import AddToCalendar from "@culturehq/add-to-calendar";
import "@culturehq/add-to-calendar/dist/styles.css";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Link from "@material-ui/core/Link";

import languageDisplay from "../../../functions/languageDisplay";

import { search } from "../../../JSONdata/label";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "auto",
    textAlign: "center",
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
    },
  },
  table: {
    width: "80%",
  },
  expansion: {
    margin: "auto",

    padding: "15px",
    [theme.breakpoints.down("xs")]: {
      margin: "0px",
      maxWidth: "90vw",
    },
  },
  expanded: {
    margin: "auto",

    padding: "15px",
    [theme.breakpoints.down("xs")]: {
      margin: "0px",
      maxWidth: "90vw",
    },
  },
}));

const mapStateToProps = (state, ownProps) => {
  return { language: state.language };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

const Calendar = (props) => {
  const classes = useStyles();
  const isMobile = useMediaQuery(useTheme().breakpoints.down("xs"));

  const eventList = [];

  for (const event of props.calendarPage.calendar_events) {
    eventList.push({
      name: event.name,
      details: event.details,
      type: event.type,
      start: event.start,
      end: event.end,
      startDate: new Date(event.start).toDateString(),
      endDate: new Date(event.end).toDateString(),
      location: event.location,
      link: event.link.link,
    });
  }

  const columns = {
    EN: [
      {
        title: "Date",
        field: "date",
        customSort: (a, b) => {
          var dateA = a.start;
          var dateB = b.start;
          if (dateA < dateB) {
            return -1;
          }
          if (dateA > dateB) {
            return 1;
          }
          return 0;
        },
        defaultSort: "asc",
        render: (rowData) =>
          rowData.startDate === rowData.endDate ? (
            <Moment parse="YYYY-MM-DD" format="DD.MM.YYYY">
              {rowData.start}
            </Moment>
          ) : (
            <div>
              <Moment parse="YYYY-MM-DD" format="DD.MM.YYYY">
                {rowData.start}
              </Moment>
              -
              <Moment parse="YYYY-MM-DD" format="DD.MM.YYYY">
                {rowData.end}
              </Moment>
            </div>
          ),
      },
      {
        title: "Name",
        field: "name",
        searchable: true,
        sorting: true,
        render: (rowData) => (
          <Link href={rowData.link} target="_blank" rel="noreferrer">
            {rowData.name}
          </Link>
        ),
      },
      {
        title: "Location",
        field: "location",
        searchable: false,
        sorting: false,
      },
      {
        title: "Type",
        field: "type",
        searchable: true,
        sorting: true,
        render: (rowData) =>
          rowData.type === "Tournament"
            ? "Tournament"
            : rowData.type === "Workshop"
            ? "Workshop"
            : "Sparring",
      },
      {
        field: "calendar",
        searchable: false,
        sorting: false,
        render: (rowData) =>
          isMobile ? null : (
            <AddToCalendar
              event={{
                name: rowData.name,
                details: languageDisplay(rowData.details, props.language).props
                  .children,
                location: rowData.location,
                startsAt: rowData.start,
                endsAt: rowData.end,
              }}
            />
          ),
      },
    ],
    FR: [
      {
        title: "Date",
        field: "date",
        customSort: (a, b) => {
          var dateA = a.start;
          var dateB = b.start;
          if (dateA < dateB) {
            return -1;
          }
          if (dateA > dateB) {
            return 1;
          }
          return 0;
        },
        defaultSort: "asc",
        render: (rowData) =>
          rowData.startDate === rowData.endDate ? (
            <Moment parse="YYYY-MM-DD" format="DD.MM.YYYY">
              {rowData.start}
            </Moment>
          ) : (
            <div>
              <Moment parse="YYYY-MM-DD" format="DD.MM.YYYY">
                {rowData.start}
              </Moment>
              -
              <Moment parse="YYYY-MM-DD" format="DD.MM.YYYY">
                {rowData.end}
              </Moment>
            </div>
          ),
      },
      {
        title: "Nom",
        field: "name",
        searchable: true,
        sorting: true,
        render: (rowData) => (
          <Link href={rowData.link} target="_blank" rel="noreferrer">
            {rowData.name}
          </Link>
        ),
      },
      {
        title: "Lieu",
        field: "location",
        searchable: false,
        sorting: false,
      },
      {
        title: "Type",
        field: "type",
        searchable: true,
        sorting: true,
        render: (rowData) =>
          rowData.type === "Tournament"
            ? "Tournoi"
            : rowData.type === "Workshop"
            ? "Workshop"
            : "Sparring",
      },
      {
        field: "calendrier",
        searchable: false,
        sorting: false,
        render: (rowData) =>
          isMobile ? null : (
            <AddToCalendar
              event={{
                name: "Happy Hour",
                details: "Let's go after work",
                location: "Boston, MA",
                startsAt: "2018-12-06T17:00:00-05:00",
                endsAt: "2018-12-06T18:00:00-05:00",
              }}
            />
          ),
      },
    ],
    DE: [
      {
        title: "Datum",
        field: "date",
        customSort: (a, b) => {
          var dateA = a.start;
          var dateB = b.start;
          if (dateA < dateB) {
            return -1;
          }
          if (dateA > dateB) {
            return 1;
          }
          return 0;
        },
        defaultSort: "asc",
        render: (rowData) =>
          rowData.startDate === rowData.endDate ? (
            <Moment parse="YYYY-MM-DD" format="DD.MM.YYYY">
              {rowData.start}
            </Moment>
          ) : (
            <div>
              <Moment parse="YYYY-MM-DD" format="DD.MM.YYYY">
                {rowData.start}
              </Moment>
              -
              <Moment parse="YYYY-MM-DD" format="DD.MM.YYYY">
                {rowData.end}
              </Moment>
            </div>
          ),
      },
      {
        title: "Name",
        field: "name",
        searchable: true,
        sorting: true,
        render: (rowData) => (
          <Link href={rowData.link} target="_blank" rel="noreferrer">
            {rowData.name}
          </Link>
        ),
      },
      {
        title: "Standort",
        field: "location",
        searchable: false,
        sorting: false,
      },
      {
        title: "Art",
        field: "type",
        searchable: true,
        sorting: true,
        render: (rowData) =>
          rowData.type === "Tournament"
            ? "Turnier"
            : rowData.type === "Workshop"
            ? "Workshop"
            : "Sparring",
      },
      {
        field: "calendar",
        searchable: false,
        sorting: false,
        render: (rowData) =>
          isMobile ? null : (
            <AddToCalendar
              event={{
                name: "Happy Hour",
                details: "Let's go after work",
                location: "Boston, MA",
                startsAt: "2018-12-06T17:00:00-05:00",
                endsAt: "2018-12-06T18:00:00-05:00",
              }}
            />
          ),
      },
    ],
    IT: [
      {
        title: "Data",
        field: "date",
        customSort: (a, b) => {
          var dateA = a.start;
          var dateB = b.start;
          if (dateA < dateB) {
            return -1;
          }
          if (dateA > dateB) {
            return 1;
          }
          return 0;
        },
        defaultSort: "asc",
        render: (rowData) =>
          rowData.startDate === rowData.endDate ? (
            <Moment parse="YYYY-MM-DD" format="DD.MM.YYYY">
              {rowData.start}
            </Moment>
          ) : (
            <div>
              <Moment parse="YYYY-MM-DD" format="DD.MM.YYYY">
                {rowData.start}
              </Moment>
              -
              <Moment parse="YYYY-MM-DD" format="DD.MM.YYYY">
                {rowData.end}
              </Moment>
            </div>
          ),
      },
      {
        title: "Nome",
        field: "name",
        searchable: true,
        sorting: true,
        render: (rowData) => (
          <Link href={rowData.link} target="_blank" rel="noreferrer">
            {rowData.name}
          </Link>
        ),
      },
      {
        title: "Posizione",
        field: "location",
        searchable: false,
        sorting: false,
      },
      {
        title: "Genere",
        field: "type",
        searchable: true,
        sorting: true,
        render: (rowData) =>
          rowData.type === "Tournament"
            ? "Torneo"
            : rowData.type === "Workshop"
            ? "Workshop"
            : "Sparring",
      },
      {
        field: "calendar",
        searchable: false,
        sorting: false,
        render: (rowData) =>
          isMobile ? null : (
            <AddToCalendar
              event={{
                name: "Happy Hour",
                details: "Let's go after work",
                location: "Boston, MA",
                startsAt: "2018-12-06T17:00:00-05:00",
                endsAt: "2018-12-06T18:00:00-05:00",
              }}
            />
          ),
      },
    ],
    RO: [
      {
        title: "Data",
        field: "date",
        customSort: (a, b) => {
          var dateA = a.start;
          var dateB = b.start;
          if (dateA < dateB) {
            return -1;
          }
          if (dateA > dateB) {
            return 1;
          }
          return 0;
        },
        defaultSort: "asc",
        render: (rowData) =>
          rowData.startDate === rowData.endDate ? (
            <Moment parse="YYYY-MM-DD" format="DD.MM.YYYY">
              {rowData.start}
            </Moment>
          ) : (
            <div>
              <Moment parse="YYYY-MM-DD" format="DD.MM.YYYY">
                {rowData.start}
              </Moment>
              -
              <Moment parse="YYYY-MM-DD" format="DD.MM.YYYY">
                {rowData.end}
              </Moment>
            </div>
          ),
      },
      {
        title: "Num",
        field: "name",
        searchable: true,
        sorting: true,
        render: (rowData) => (
          <Link href={rowData.link} target="_blank" rel="noreferrer">
            {rowData.name}
          </Link>
        ),
      },
      {
        title: "Liug",
        field: "location",
        searchable: false,
        sorting: false,
      },
      {
        title: "Type",
        field: "type",
        searchable: true,
        sorting: true,
        render: (rowData) =>
          rowData.type === "Tournament"
            ? "Tournament"
            : rowData.type === "Workshop"
            ? "Workshop"
            : "Sparring",
      },
      {
        field: "Calender",
        searchable: false,
        sorting: false,
        render: (rowData) =>
          isMobile ? null : (
            <AddToCalendar
              event={{
                name: "Happy Hour",
                details: "Let's go after work",
                location: "Boston, MA",
                startsAt: "2018-12-06T17:00:00-05:00",
                endsAt: "2018-12-06T18:00:00-05:00",
              }}
            />
          ),
      },
    ],
  };

  return (
    <>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        id="gridContainer"
        className={classes.root}
      >
        <Grid item id="title" className={classes.title}>
          <Typography
            variant={isMobile ? "h6" : "h4"}
            className={classes.header}
          >
            {languageDisplay(props.calendarPage.intro.title, props.language)}
          </Typography>
        </Grid>
        <Grid item id="intro" className={classes.content}>
          <Typography
            className={classes.content}
            variant={"body1"}
            component={ReactMarkdown}
            source={
              languageDisplay(
                props.calendarPage.intro.paragraph,
                props.language
              ).props.children
            }
          />
        </Grid>
        <Grid item id="calendar-table" className={classes.table}>
          <MaterialTable
            title="memberlist"
            columns={languageDisplay(columns, props.language).props.children}
            data={eventList}
            options={{
              paging: false,
              searchText: "",
              showTitle: false,
            }}
            localization={{
              toolbar: {
                searchPlaceholder: languageDisplay(search, props.language).props
                  .children,
              },
              body: {
                deleteTooltip: "Delete",
              },
            }}
          />
        </Grid>
        <Grid item id="conact-form" className={classes.root}>
          <ExpansionPanel classes={{ expanded: classes.expanded }} square>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="button" className={classes.heading}>
                {languageDisplay(
                  props.calendarPage.labels.find(
                    ({ identifier }) => identifier === "contact"
                  ),
                  props.language
                )}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Query query={FORM_QUERY} id={props.calendarPage.form.id}>
                {({ data: { form } }) => {
                  return <Forms form={form} />;
                }}
              </Query>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
      </Grid>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
