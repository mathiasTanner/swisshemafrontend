import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import { ChangeLanguage } from "../actions";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import Hidden from "@material-ui/core/Hidden";
import withWidth from "@material-ui/core/withWidth";

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
      maxHeight: 100,
      maxWidth: 100
    }
  },
  formControl: {
    margin: theme.spacing(1),
    height: "25%"
  },
  select: {
    color: "white"
  },

  label: {
    color: "#fff",
    "&:hover": {
      color: "#c6c6c6"
    }
  },
  icon: {
    fill: "#fff",
    "&:hover": {
      color: "#c6c6c6"
    }
  },
  menu: {
    margin: theme.spacing(1)
  }
}));

const useOutlinedInputStyles = makeStyles(theme => ({
  root: {
    "& $notchedOutline": {
      borderColor: "#c6c6c6"
    },
    "&:hover $notchedOutline": {
      borderColor: "#fff"
    },
    "&$focused $notchedOutline": {
      borderColor: "#b20000"
    }
  },
  focused: {},
  notchedOutline: {}
}));

const useLabelInputStyle = makeStyles(theme => ({
  root: {
    color: "white",
    "&$focused": {
      color: "white"
    }
  },

  focused: {}
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

  const outlinedInputClasses = useOutlinedInputStyles();
  const labelInputStyle = useLabelInputStyle();

  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuSpacing, setMenuSpacing] = useState(3);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = event => {
    props.switchLanguage(event.target.value);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuSpacing = () => {
    switch (props.width) {
      case "xl":
        return 3;
      case "lg":
        return 2;
      case "md":
        return 0;
      case "sm":
        return 0;
      case "xs":
        return 0;
      default:
        return 3;
    }
  };

  //TODO: Nav bar avec bouttons de menus
  //TODO: faire menu pour petits écrans
  //TODO: adapter la taille du titre selon la taille de l'écran
  //TODO: Link les menus au router
  return (
    <AppBar color="primary" position="static">
      <Toolbar variant="dense">
        <IconButton edge="start" className={classes.logoButton} color="inherit">
          <img
            src={process.env.REACT_APP_BACKEND_URL + props.header.logo.url}
            alt="logo"
            className={classes.logo}
          ></img>
        </IconButton>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item lg={3} md={2}>
            <Grid container direction="column" justify="center">
              <Hidden mdDown>
                <Grid item>
                  <Typography variant="h5" color="inherit">
                    {props.header.Title}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" color="inherit">
                    {props.language === "FR"
                      ? props.header.Subtitle.FR
                      : props.language === "EN"
                      ? props.header.Subtitle.EN
                      : props.header.Subtitle.DE}
                  </Typography>
                  <Typography variant="body2" color="inherit">
                    {props.width}
                  </Typography>
                </Grid>
              </Hidden>
              <Hidden lgUp>
                <Grid item>
                  <Typography variant="h6" color="inherit">
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
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={handleMenuSpacing()}>
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
                <p>{props.width}</p>
              </Hidden>
            </Grid>
          </Grid>
          <Grid item>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              margin="dense"
            >
              <InputLabel
                ref={inputLabel}
                htmlFor="outlined-age-simple"
                classes={labelInputStyle}
              >
                Language
              </InputLabel>
              <Select
                id="languageSelect"
                value={props.language}
                onChange={handleChange}
                label="language"
                className={classes.select}
                input={
                  <OutlinedInput
                    labelWidth={labelWidth}
                    name="Language"
                    id="outlined-age-simple"
                    classes={outlinedInputClasses}
                  />
                }
                inputProps={{
                  classes: {
                    icon: classes.icon
                  }
                }}
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
              </Select>
            </FormControl>
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
