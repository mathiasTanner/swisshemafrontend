import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import CssBaseline from "@material-ui/core/CssBaseline";
import HEADER_QUERY from "./queries/header";
import FOOTER_QUERY from "./queries/footer";

import Query from "./components/Query";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ApolloProvider } from "react-apollo";
import client from "./utils/apolloClient";
import { Provider } from "react-redux";
import Store from "./Store";
import { Router } from "@reach/router";
import AboutUs from "./components/pages/AboutUs.js";
import MemberPage from "./components/pages/MemberPage.js";
import Events from "./components/pages/events/Events.js";
import Evenment from "./components/pages/events/Evenment.js";
import International from "./components/pages/International";
import CommissionsPage from "./components/pages/CommissionsPage";
import Calendar from "./components/pages/events/Calendar.js";

const useStyles = makeStyles((theme) => ({
  App: {
    display: "inline-block",
  },
  header: {},
  content: {
    marginBottom: "6vh",
    [theme.breakpoints.up("xs")]: {
      marginTop: "9vh",
    },

    [theme.breakpoints.up("lg")]: {
      marginTop: "12vh",
    },
    backgroundColor: `${theme.palette.secondary.main} `,
    margin: "auto",
  },
  footer: {},
}));

function App() {
  const classes = useStyles();
  //Feeds header and Footer elements to the respective components from the API
  return (
    <ApolloProvider client={client}>
      <Provider store={Store}>
        <div
          className="App"
          data-testid="app"
          style={{ backgroundColor: "#e2e2e2", height: "100vh" }}
        >
          <CssBaseline />
          <Grid container spacing={0} style={{ backgroundColor: "#e2e2e2" }}>
            <Grid item xs={12} id="header" className={classes.header}>
              <Query query={HEADER_QUERY} id={null}>
                {({ data: { header } }) => {
                  return <Header header={header} />;
                }}
              </Query>
            </Grid>
            <Grid item xs={12} id="content" className={classes.content}>
              <Router>
                <AboutUs path="/aboutus" />
                <MemberPage path="/members" />
                <Events path="/events" />
                <Evenment path="/swissgathering" name="Swiss Gathring" />
                <Evenment path="/bearcup" name="Bear Cup" />
                <Evenment path="/instructorcamp" name="Intructor Boot Camp" />
                <Calendar path="/calendar" />
                <International path="/international" />
                <CommissionsPage path="/commissions" />
                <AboutUs path="/" />
              </Router>
            </Grid>
            <Grid item xs={12} id="footer" className={classes.footer}>
              <Query query={FOOTER_QUERY} id={null}>
                {({ data: { footer } }) => {
                  return <Footer footer={footer} />;
                }}
              </Query>
            </Grid>
          </Grid>
        </div>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
