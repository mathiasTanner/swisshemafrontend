import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import { ChangeLanguage } from "../actions";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import Hidden from "@material-ui/core/Hidden";
import withWidth from "@material-ui/core/withWidth";
import Drawer from "@material-ui/core/Drawer";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  logoButton: {
    marginRight: theme.spacing(2)
  },
  logo: {
    maxHeight: 80,
    maxWidth: 80,
    [theme.breakpoints.down("sm")]: {
      maxHeight: 50,
      maxWidth: 50
    },
    [theme.breakpoints.up("lg")]: {
      maxHeight: 85,
      maxWidth: 85
    }
  },
  select: {
    color: "#fff"
  },
  label: {
    color: "#fff"
  },
  labelFocused: {
    color: "#fff !important"
  },
  icon: {
    fill: "#fff"
  },
  menu: {
    [theme.breakpoints.up("md")]: {
      margin: theme.spacing(0.5)
    },
    [theme.breakpoints.up("xl")]: {
      margin: theme.spacing(3)
    }
  },
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: `${theme.palette.primary.dark} !important`
    },
    "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
      borderColor: "#fff !important"
    }
  },
  cssFocused: {},
  cssHover: {},
  notchedOutline: {
    borderColor: "#c6c6c6 !important"
  }
}));

const mapStateToProps = (state, ownProps) => {
  return { language: state.language };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    switchLanguage: language => {
      dispatch(ChangeLanguage(language));
    }
  };
};

const Header = props => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const toggleDrawer = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerVisible(open);
  };

  const handleChange = event => {
    props.switchLanguage(event.target.value);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //TODO: Nav bar avec bouttons de menus
  //TODO: faire menu pour petits écrans
  //TODO: adapter la taille du titre selon la taille de l'écran
  //TODO: Link les menus au router

  return (
    <AppBar color="primary" position="static">
      <Toolbar variant="dense">
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Grid container direction="row" alignItems="center">
              <Grid item>
                <IconButton
                  edge="start"
                  className={classes.logoButton}
                  color="secondary"
                >
                  <img
                    src={
                      process.env.REACT_APP_BACKEND_URL + props.header.logo.url
                    }
                    alt="logo"
                    className={classes.logo}
                  ></img>
                </IconButton>
                <span>{props.width}</span>
              </Grid>
              <Grid item>
                <Grid container direction="column" justify="center">
                  <Hidden mdDown>
                    <Grid item>
                      <Typography variant="h5" color="inherit">
                        {props.header.Title}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="caption" color="inherit">
                        {props.language === "FR"
                          ? props.header.Subtitle.FR
                          : props.language === "EN"
                          ? props.header.Subtitle.EN
                          : props.header.Subtitle.DE}
                      </Typography>
                    </Grid>
                  </Hidden>
                  <Hidden lgUp>
                    <Grid item>
                      <Typography variant="h6" color="inherit">
                        {props.header.Title}
                      </Typography>
                    </Grid>
                    <Hidden smDown>
                      <Grid item>
                        <Typography variant="caption" color="inherit">
                          {props.language === "FR"
                            ? props.header.Subtitle.FR
                            : props.language === "EN"
                            ? props.header.Subtitle.EN
                            : props.header.Subtitle.DE}
                        </Typography>
                      </Grid>
                    </Hidden>
                  </Hidden>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="row">
              {props.header.menuitems.map((item, i) => {
                let hasSubmenu = item.submenu.length < 1 ? false : true;

                return (
                  <Grid item className={classes.menu}>
                    <Hidden mdDown>
                      {hasSubmenu ? (
                        <div>
                          <Button
                            aria-controls="submenu"
                            aria-haspopup="true"
                            onClick={handleClick}
                            variant="outlined"
                            color="secondary"
                          >
                            {props.language === "FR"
                              ? item.FR
                              : props.language === "EN"
                              ? item.EN
                              : item.DE}
                          </Button>
                          <Menu
                            id="submenu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                          >
                            <MenuItem onClick={handleClose}>
                              {props.language === "FR"
                                ? item.FR
                                : props.language === "EN"
                                ? item.EN
                                : item.DE}
                            </MenuItem>
                            {item.submenu.map((submenu, i) => {
                              return (
                                <MenuItem key={i} onClick={handleClose}>
                                  {props.language === "FR"
                                    ? submenu.FR
                                    : props.language === "EN"
                                    ? submenu.EN
                                    : submenu.DE}
                                </MenuItem>
                              );
                            })}
                          </Menu>
                        </div>
                      ) : (
                        <div>
                          <Button
                            key={i}
                            onClick={() => console.log("click")}
                            variant="outlined"
                            color="secondary"
                          >
                            {props.language === "FR"
                              ? item.FR
                              : props.language === "EN"
                              ? item.EN
                              : item.DE}
                          </Button>
                        </div>
                      )}
                    </Hidden>
                  </Grid>
                );
              })}
              <Hidden lgUp>
                <Hidden smDown>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<MenuIcon />}
                    onClick={toggleDrawer(true)}
                  >
                    {props.language === "FR"
                      ? "Menu"
                      : props.language === "EN"
                      ? "Menu"
                      : "Menü"}
                  </Button>
                </Hidden>
                <Hidden mdUp>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<MenuIcon />}
                    onClick={toggleDrawer(true)}
                  />
                </Hidden>
                <Drawer
                  anchor="left"
                  open={drawerVisible}
                  onClose={toggleDrawer(false)}
                >
                  {props.header.menuitems.map((item, i) => {
                    return (
                      <p>
                        {props.language === "FR"
                          ? item.FR
                          : props.language === "EN"
                          ? item.EN
                          : item.DE}
                      </p>
                    );
                  })}
                </Drawer>
              </Hidden>
            </Grid>
          </Grid>
          <Grid item>
            <Hidden smDown>
              <TextField
                select
                label="Language"
                value={props.language}
                onChange={handleChange}
                SelectProps={{
                  classes: {
                    icon: classes.icon,
                    select: classes.select
                  }
                }}
                InputLabelProps={{
                  classes: {
                    root: classes.label,
                    focused: classes.labelFocused
                  }
                }}
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline
                  }
                }}
                margin="dense"
                variant="outlined"
              >
                <MenuItem value="" disabled>
                  Language
                </MenuItem>
                {props.header.language.map((language, i) => {
                  return (
                    <MenuItem value={language.code} key={i}>
                      {language.name}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Hidden>
            <Hidden mdUp>
              <TextField
                select
                value={props.language}
                onChange={handleChange}
                SelectProps={{
                  classes: {
                    icon: classes.icon,
                    select: classes.select
                  }
                }}
                InputLabelProps={{
                  classes: {
                    root: classes.label,
                    focused: classes.labelFocused
                  }
                }}
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline
                  }
                }}
                margin="dense"
                variant="outlined"
              >
                {props.header.language.map((language, i) => {
                  return (
                    <MenuItem value={language.code} key={i}>
                      {language.code}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Hidden>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withWidth()(Header));
