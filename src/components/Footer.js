import React, { useState } from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";

import { connect } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import Link from "@material-ui/core/Link";
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
import Input from "@material-ui/core/Input";

import Query from "./Query";
import FORM_QUERY from "../queries/forms/form";
import ContactForm from "./ContactForm";

import languageDisplay from "../functions/languageDisplay";
import { closeLabel, send } from "../JSONdata/label";

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
  newsbody: {
    marginTop: "10px",
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
  const [openContact, setOpenContact] = useState(false);

  const handleNewsOpen = () => {
    setOpenNews(true);
  };

  const handleNewsClose = () => {
    setOpenNews(false);
  };

  const handleContactOpen = () => {
    setOpenContact(true);
  };

  const handleContactClose = () => {
    setOpenContact(false);
  };

  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <BottomNavigation showLabels className={classes.bottomNavigation}>
        <BottomNavigationAction
          label={languageDisplay(props.footer.contactLabel, props.language)}
          icon={<ContactSupportIcon />}
          className={classes.bottomLabel}
          onClick={handleContactOpen}
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
          {"Newsletter"}
        </DialogTitle>
        <form
          method="post"
          action="https://newsletter.infomaniak.com/external/submit"
          target="_blank"
        >
          <DialogContent>
            <input type="email" name="email" style={{ display: "none" }} />
            <input
              type="hidden"
              name="key"
              value="eyJpdiI6Ik5qTm1kcGlaaTFsdDlHUXRXKzlpem9RYkpTY3p0bTB3MFRJVnJtN0VEZWc9IiwidmFsdWUiOiJxMHpEUVg2ZTZEQlphUVF0WEM0dkVucUh0amR3VUhiV1BtbEF4OUNyc1BjPSIsIm1hYyI6IjRlY2Q3NTE2OWZjOTUxNzgwMjYzNWJiMjA2MzY5N2Q4MzcxZDY5YmE2YzM4NmEyZTYwMWEzMGExOWNlYTEzYmUifQ=="
            />
            <input type="hidden" name="webform_id" value="7359" />
            <div>
              <DialogContentText>
                {languageDisplay(
                  props.footer.newsletterMessage,
                  props.language
                )}
              </DialogContentText>

              <div>
                <div>
                  <Input
                    type="text"
                    name="inf[1]"
                    data-inf-meta="1"
                    data-inf-error="Merci de renseigner une adresse email"
                    required
                    placeholder="Email"
                    variant="outlined"
                  />
                </div>
                <DialogContentText className={classes.newsbody}>
                  {languageDisplay(
                    props.footer.newsletterDisclaimer,
                    props.language
                  )}
                </DialogContentText>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleNewsClose} color="primary">
              {languageDisplay(closeLabel, props.language)}
            </Button>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              onClick={handleNewsClose}
            >
              {languageDisplay(send, props.language)}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {props.footer.forms.map((form, i) => {
        return (
          <Query query={FORM_QUERY} id={form.id} key={i}>
            {({ data: { form } }) => {
              return (
                <ContactForm
                  form={form}
                  open={openContact}
                  close={handleContactClose}
                  contactLabel={props.footer.contactLabel}
                />
              );
            }}
          </Query>
        );
      })}
    </AppBar>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
