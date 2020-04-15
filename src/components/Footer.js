import React, { useState, useEffect } from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";

import { connect } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import Link from "@material-ui/core/Link";
import Toolbar from "@material-ui/core/Toolbar";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import MailIcon from "@material-ui/icons/Mail";
import FacebookIcon from "@material-ui/icons/Facebook";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
  },
  bottomNavigation: {
    backgroundColor: `${theme.palette.primary.main}`,
  },
  bottomLabel: {
    color: `${theme.palette.secondary.light}`,
  },
}));

const mapStateToProps = (state, ownProps) => {
  return { language: state.language };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

const Footer = (props) => {
  const classes = useStyles();
  const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));

  const [openNews, setOpenNews] = useState(false);

  var __html = require("./newform.html");
  var template = { __html: __html };

  const handleNewsOpen = () => {
    setOpenNews(true);
  };

  const handleNewsClose = () => {
    setOpenNews(false);
  };

  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <BottomNavigation showLabels className={classes.bottomNavigation}>
        <BottomNavigationAction
          label={
            props.language === "EN"
              ? props.footer.label[0].EN
              : props.language === "FR"
              ? props.footer.label[0].FR
              : props.footer.label[0].DE
          }
          icon={<ContactSupportIcon />}
          className={classes.bottomLabel}
          onClick={() => console.log("click")}
        />
        <BottomNavigationAction
          label="Newsletter"
          icon={<MailIcon />}
          className={classes.bottomLabel}
          onClick={handleNewsOpen}
        />
        <BottomNavigationAction
          label="Facebook"
          icon={<FacebookIcon />}
          className={classes.bottomLabel}
          component={Link}
          href="https://www.facebook.com/swisshema/"
          target="_blank"
          rel="noopener"
        />
      </BottomNavigation>
      <Dialog
        fullScreen={isMobile}
        open={openNews}
        onClose={handleNewsClose}
        aria-labelledby="responsive-newsletter-title"
      >
        <DialogTitle id="responsive-newsletter-title">
          {"Subscribe to newsletter"}
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleNewsClose} color="primary">
            close
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
