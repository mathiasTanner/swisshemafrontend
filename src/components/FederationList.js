import React from "react";

import Query from "./Query";

import COUNTRY_BY_CODE_QUERY from "../queries/countries/countryByCode";

import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

import languageDisplay from "../functions/languageDisplay";
import { website } from "../JSONdata/label";

const useStyles = makeStyles((theme) => ({
  list: {
    width: "60vw",
    [theme.breakpoints.down("xs")]: {
      width: "80vw",
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
  },
}));

const mapStateToProps = (state, ownProps) => {
  return { language: state.language };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

const FederationList = (props) => {
  const classes = useStyles();

  return (
    <Box>
      <List dense={props.dense} className={classes.list}>
        {props.list.map((element, i) => {
          return (
            <div key={i}>
              <ListItem>
                {element.country !== null || element.country === "" ? (
                  <Query query={COUNTRY_BY_CODE_QUERY} code={element.country}>
                    {({ data: { countries } }) => {
                      return (
                        <Grid
                          container
                          direction="row"
                          justify="space-between"
                          alignItems="center"
                        >
                          <Grid item>
                            <ListItemText
                              primary={element.name}
                              secondary={languageDisplay(
                                countries[0].name,
                                props.language
                              )}
                            />
                          </Grid>
                          <Grid>
                            <Button
                              variant="outlined"
                              size={props.dense ? "small" : "medium"}
                              className={classes.button}
                              color="primary"
                              component={Link}
                              href={element.link}
                              target="_blank"
                            >
                              {languageDisplay(website, props.language)}
                            </Button>
                          </Grid>
                        </Grid>
                      );
                    }}
                  </Query>
                ) : (
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <ListItemText primary={element.name} />
                    </Grid>
                    <Grid>
                      <Button
                        variant="outlined"
                        size={props.dense ? "small" : "medium"}
                        className={classes.button}
                        color="primary"
                        component={Link}
                        href={element.link}
                        target="_blank"
                      >
                        {languageDisplay(website, props.language)}
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </ListItem>

              {i === props.list.length - 1 ? null : <Divider />}
            </div>
          );
        })}
      </List>
    </Box>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FederationList);
