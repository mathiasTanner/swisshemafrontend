import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Theme from "./Theme.js";
import CssBaseline from "@material-ui/core/CssBaseline";
import HEADER_QUERY from "./queries/header";
import MENUITEMS_QUERY from "./queries/menuItems";
import Query from "./components/Query";
import PublicationTest from "./components/PublicationTest";
import Header from "./components/Header";
import { ApolloProvider } from "react-apollo";
import client from "./utils/apolloClient";
import { Provider } from "react-redux";
import Store from "./Store";

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
                  <p>hello there</p>
                  <PublicationTest />
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
