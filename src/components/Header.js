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

const useStyles = makeStyles(theme => ({
  root: {
    height: 100,
    marginTop: 0,
    top: 0
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  logo: {
    maxHeight: 100,
    maxWidth: 100
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
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
  }
}));

const useOutlinedInputStyles = makeStyles(theme => ({
  root: {
    "& $notchedOutline": {
      borderColor: "#fff"
    },
    "&:hover $notchedOutline": {
      borderColor: "#b20000"
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

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = event => {
    props.switchLanguage(event.target.value);
  };

  //TODO: Nav bar avec bouttons de menus,  query pour les bouttons de menus
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
        <Grid container direction="row">
          <Grid item xs={3}>
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
                  {props.language === "FR"
                    ? props.header.Subtitle.FR
                    : props.language === "EN"
                    ? props.header.Subtitle.EN
                    : props.header.Subtitle.DE}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <FormControl variant="outlined" className={classes.formControl}>
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
                {props.header.Language.map((language, i) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
