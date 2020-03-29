import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import MenuIcon from "@material-ui/icons/Menu";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  root: {
    height: 100,
    marginTop: 0,
    top: 0,
    backgroundColor: "#ed1a23"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  logo: {
    maxHeight: 100,
    maxWidth: 100
  }
}));

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

const Header = props => {
  const classes = useStyles();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {}, []);

  console.log("header log:");

  console.log(props.header);
  //TODO: Nav bar avec bouttons de menus, selecteur de language (prio 1), query pour les bouttons de menus
  return (
    <AppBar color="primary" position="static">
      <Toolbar variant="dense">
        <IconButton edge="start" className={classes.menuButton} color="inherit">
          <img
            src={process.env.REACT_APP_BACKEND_URL + props.header.logo.url}
            alt="logo"
            className={classes.logo}
          ></img>
        </IconButton>
        <Grid container>
          <Grid item>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="flex-start"
            >
              <Grid item>
                <Typography variant="h4" color="inherit">
                  {props.header.Title}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption" color="inherit">
                  {props.header.Subtitle.FR}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
