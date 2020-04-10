import React from "react";
//import { BrowserRouter as Router } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Theme from "./Theme.js";
import CssBaseline from "@material-ui/core/CssBaseline";
import HEADER_QUERY from "./queries/header";
import Query from "./components/Query";
import Header from "./components/Header";
import { ApolloProvider } from "react-apollo";
import client from "./utils/apolloClient";
import { Provider } from "react-redux";
import Store from "./Store";
import { Router } from "@reach/router";
import AboutUs from "./components/pages/AboutUs.js";
import Members from "./components/pages/Members.js";
import Events from "./components/pages/events/Events.js";
import Evenment from "./components/pages/events/Evenment.js";
import Calendar from "./components/pages/events/Calendar.js";

function App() {
  //Feeds header and Footer elements to the respective components from the API
  return (
    <ApolloProvider client={client}>
      <Provider store={Store}>
        <MuiThemeProvider theme={Theme}>
          <div className="App" data-testid="app">
            <CssBaseline />

            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Query query={HEADER_QUERY} id={null}>
                  {({ data: { header } }) => {
                    return <Header header={header} />;
                  }}
                </Query>
              </Grid>
              <Grid item xs={12}>
                <Router>
                  <AboutUs path="/aboutus" />
                  <Members path="/members" />
                  <Events path="/events" />
                  <Evenment path="/swissgathering" name="Swiss Gathring" />
                  <Evenment path="/bearcup" name="Bear Cup" />
                  <Evenment path="/instructorcamp" name="Intructor Boot Camp" />
                  <Calendar path="/calendar" />
                  <AboutUs path="/" />
                </Router>
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
          </div>
        </MuiThemeProvider>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
