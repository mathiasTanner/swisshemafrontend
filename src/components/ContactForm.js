import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { FormHelperText } from "@material-ui/core";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  question: {
    margin: "15px",
    width: "75%",
  },
  description: {
    width: "80%",
    margin: "15px",
  },
}));

const mapStateToProps = (state, ownProps) => {
  return { language: state.language };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

const Form = (props) => {
  const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));
  const classes = useStyles();
  const [disabled, setDisabled] = useState(true);
  const [confirmationVisible, setCOnfirmationVisible] = useState(false);
  const [validator, setValidator] = useState({
    mail: {
      complete: false,
      wrongInput: false,
    },
    text: {
      complete: false,
      wrongInput: true,
    },
    long_text: {
      complete: false,
      wrongInput: true,
    },
  });
  const finalMsg = {
    FR: "Votre mail a été envoyé avec succès",
    EN: "Your mail was sent successfully",
    DE: "Ihre Mail wurde erfolgreich gesendet",
  };

  useEffect(() => {
    if (!props.form.questions[0].hasOwnProperty("answer")) {
      props.form.questions.map((q) => (q["answer"] = ""));
    }
  }, [props.form.questions]);

  const submitForm = () => {
    if (props.form.type === "contact") {
      let email;
      let subject;
      let text;

      props.form.questions.map((question) => {
        if (question.type === "email") {
          email = question.answer;
        } else if (question.type === "text") {
          subject = question.answer;
        } else {
          text = question.answer;
        }
        return null;
      });

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "swiss.federation.hema@gmail.com",
          from: email,
          replyTo: email,
          cc: "mathias.tanner.ge@gmail.com",
          subject: subject,
          text: text,
        }),
      };
      fetch("https://admin.tannerdev.tech/email", requestOptions)
        .then((response) => response.json())
        .then((data) => setCOnfirmationVisible(true));
    }
  };

  const fieldValidator = (question) => {
    switch (question.type) {
      case "email":
        let testedMail = question.answer;
        if (
          testedMail.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{1,})$/i) &&
          question.answer !== ""
        ) {
          setValidator({
            ...validator,
            mail: { complete: true, wrongInput: false },
          });
        } else {
          if (testedMail === "" && question.mandatory) {
            setValidator({
              ...validator,
              mail: { wrongInput: false, complete: false },
            });
          } else if (testedMail === "" && !question.mandatory) {
            setValidator({
              ...validator,
              mail: { wrongInput: false, complete: true },
            });
          } else {
            setValidator({
              ...validator,
              mail: { complete: true, wrongInput: true },
            });
          }
        }

        break;

      case "text":
        if (question.answer === "" && question.mandatory) {
          setValidator({
            ...validator,
            text: { complete: false, wrongInput: false },
          });
        } else {
          setValidator({
            ...validator,
            text: { complete: true, wrongInput: false },
          });
        }
        break;

      case "long_text":
        if (question.answer === "" && question.mandatory) {
          setValidator({
            ...validator,
            long_text: { complete: false, wrongInput: false },
          });
        } else {
          setValidator({
            ...validator,
            long_text: { complete: true, wrongInput: false },
          });
        }
        break;

      default:
        break;
    }

    if (
      validator.text.complete &&
      validator.mail.complete &&
      validator.long_text.complete
    ) {
      if (
        validator.text.wrongInput ||
        validator.mail.wrongInput ||
        validator.long_text.wrongInput
      ) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    } else {
      setDisabled(true);
    }
  };

  const renderInput = (question) => {
    switch (question.type) {
      case "text":
        return (
          <div>
            <TextField
              id="text"
              defaultValue=""
              label={
                props.language === "FR"
                  ? question.FR
                  : props.language === "EN"
                  ? question.EN
                  : question.DE
              }
              required={question.mandatory}
              onChange={(event) => {
                question.answer = event.target.value;
                fieldValidator(question);
              }}
              onBlur={() => {
                fieldValidator(question);
              }}
              variant="outlined"
              fullWidth
            />
          </div>
        );

      case "long_text":
        return (
          <div>
            <TextField
              id="long_text"
              defaultValue=""
              label={
                props.language === "FR"
                  ? question.FR
                  : props.language === "EN"
                  ? question.EN
                  : question.DE
              }
              required={question.mandatory}
              multiline
              rows="6"
              onChange={(event) => {
                question.answer = event.target.value;
                fieldValidator(question);
              }}
              onBlur={() => {
                fieldValidator(question);
              }}
              variant="outlined"
              fullWidth
            />
          </div>
        );

      case "email":
        return (
          <div>
            <TextField
              id="email"
              error={validator.mail.wrongInput}
              defaultValue=""
              label={
                props.language === "FR"
                  ? question.FR
                  : props.language === "EN"
                  ? question.EN
                  : question.DE
              }
              required={question.mandatory}
              onChange={(event) => {
                question.answer = event.target.value;
                fieldValidator(question);
              }}
              onBlur={() => {
                fieldValidator(question);
              }}
              variant="outlined"
              helperText={
                validator.mail.wrongInput
                  ? props.language === "FR"
                    ? "veuillez entrer un mail correct"
                    : props.language === "EN"
                    ? "please enter correct email"
                    : "Bitte geben Sie ein korrektes email ein"
                  : null
              }
              fullWidth
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog
      fullScreen={isMobile}
      open={props.open}
      onClose={props.close}
      aria-labelledby="responsive-contact-title"
      classes={{
        paper: classes.contactDialog,
      }}
    >
      <DialogTitle id="responsive-contact-title">
        {props.language === "EN"
          ? props.contactLabel.EN
          : props.language === "FR"
          ? props.contactLabel.FR
          : props.contactLabel.DE}
      </DialogTitle>
      <DialogContent>
        {!confirmationVisible ? (
          <Typography variant="h6" className={classes.description}>
            {props.language === "FR"
              ? props.form.Description.FR
              : props.language === "EN"
              ? props.form.Description.EN
              : props.form.Description.DE}
          </Typography>
        ) : null}
        {!confirmationVisible ? (
          props.form.questions.map((question, i) => {
            return (
              <div key={i} className={classes.question}>
                {renderInput(question)}
              </div>
            );
          })
        ) : (
          <DialogContentText>
            {props.language === "FR"
              ? finalMsg.FR
              : props.language === "EN"
              ? finalMsg.EN
              : finalMsg.DE}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        {!confirmationVisible ? (
          <div>
            {disabled ? (
              <FormHelperText>
                *{" "}
                {props.language === "FR"
                  ? "Obligatoire"
                  : props.language === "EN"
                  ? "Mandatory"
                  : "Obligatorisch"}
              </FormHelperText>
            ) : null}
            <Button
              color="primary"
              variant="contained"
              disabled={disabled}
              onClick={submitForm}
            >
              {props.language === "FR"
                ? "Envoyer"
                : props.language === "EN"
                ? "Send"
                : "Senden"}
            </Button>
          </div>
        ) : null}

        <Button color="primary" onClick={props.close}>
          {props.language === "FR"
            ? "Fermer"
            : props.language === "EN"
            ? "Close"
            : "Schliessen"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
