import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import axios from "axios";

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

import JoditEditor from "jodit-react";

import languageDisplay from "../functions/languageDisplay";

import {
  mailSent,
  mandatory,
  send,
  closeLabel,
  mailErrorMsg,
} from "../JSONdata/label";

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
  const [mailErrorMsgVisible, setMailErrorMsgVisible] = useState(false);
  const [dynamicValidator, setDynamicValidator] = useState(null);

  const editor = useRef(null);
  const config = {
    readonly: false,
  };

  const handleClose = () => {
    props.close();
    setCOnfirmationVisible(false);
  };

  useEffect(() => {
    if (!props.form.questions[0].hasOwnProperty("answer")) {
      props.form.questions.map((q) => (q["answer"] = ""));
    }
    if (dynamicValidator === null) {
      let generated = {};
      for (const q of props.form.questions) {
        switch (q.type) {
          case "email":
            generated = {
              ...generated,
              [q.name]: { complete: !q.mandatory, wrongInput: true },
            };
            break;

          default:
            generated = {
              ...generated,
              [q.name]: { complete: !q.mandatory, wrongInput: false },
            };
            break;
        }
      }
      setDynamicValidator(generated);
    }
  }, [props.form.questions, dynamicValidator]);

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

      //TODO: make error message and show qustionnary if error

      axios
        .post(
          `https://admin.tannerdev.tech/email`,
          {
            to: "contact@tannerdev.tech",
            from: email,
            replyTo: email,
            cc: "mathias.tanner.ge@gmail.com",
            subject: subject,
            text: text,
            html: text,
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .then(
          (response) => {
            setCOnfirmationVisible(true);
          },
          (error) => {
            console.log(error);
          }
        );
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
          setDynamicValidator({
            ...dynamicValidator,
            [question.name]: { complete: true, wrongInput: false },
          });
        } else {
          if (testedMail === "" && question.mandatory) {
            setDynamicValidator({
              ...dynamicValidator,
              [question.name]: { complete: false, wrongInput: false },
            });
            setMailErrorMsgVisible(false);
          } else if (testedMail === "" && !question.mandatory) {
            setDynamicValidator({
              ...dynamicValidator,
              [question.name]: { complete: true, wrongInput: false },
            });
            setMailErrorMsgVisible(false);
          } else {
            setDynamicValidator({
              ...dynamicValidator,
              [question.name]: { complete: true, wrongInput: true },
            });
            setMailErrorMsgVisible(true);
          }
        }

        break;

      case "text":
        if (question.answer === "" && question.mandatory) {
          setDynamicValidator({
            ...dynamicValidator,
            [question.name]: { complete: false, wrongInput: false },
          });
        } else {
          setDynamicValidator({
            ...dynamicValidator,
            [question.name]: { complete: true, wrongInput: false },
          });
        }
        break;

      case "long_text":
        if (question.answer === "" && question.mandatory) {
          setDynamicValidator({
            ...dynamicValidator,
            [question.name]: { complete: false, wrongInput: false },
          });
        } else {
          setDynamicValidator({
            ...dynamicValidator,
            [question.name]: { complete: true, wrongInput: false },
          });
        }
        break;

      default:
        break;
    }

    let nbrCorrect = 0;
    let nbrComplete = 0;

    for (const q of props.form.questions) {
      if (dynamicValidator[q.name].complete) nbrComplete++;
      if (!dynamicValidator[q.name].wrongInput) nbrCorrect++;
    }

    if (props.form.questions.length === nbrCorrect) {
      if (props.form.questions.length === nbrComplete) {
        setDisabled(false);
      } else {
        setDisabled(true);
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
              label={languageDisplay(question, props.language)}
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
            <JoditEditor
              ref={editor}
              value={question.answer}
              config={config}
              tabIndex={1}
              onBlur={(newContent) => {
                question.answer = newContent;
                fieldValidator(question);
              }}
              onChange={(newContent) => {}}
            />
          </div>
        );

      case "email":
        return (
          <div>
            <TextField
              id="email"
              error={mailErrorMsgVisible}
              defaultValue=""
              label={languageDisplay(question, props.language)}
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
                mailErrorMsgVisible
                  ? languageDisplay(mailErrorMsg, props.language)
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
      onClose={handleClose}
      aria-labelledby="responsive-contact-title"
      classes={{
        paper: classes.contactDialog,
      }}
    >
      <DialogTitle id="responsive-contact-title">
        {languageDisplay(props.contactLabel, props.language)}
      </DialogTitle>
      <DialogContent>
        {!confirmationVisible ? (
          <Typography variant="h6" className={classes.description}>
            {languageDisplay(props.form.Description, props.language)}
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
            {languageDisplay(mailSent, props.language)}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        {disabled ? (
          <FormHelperText>
            * {languageDisplay(mandatory, props.language)}
          </FormHelperText>
        ) : null}
        {!confirmationVisible ? (
          <div>
            <Button
              color="primary"
              variant="contained"
              disabled={disabled}
              onClick={submitForm}
            >
              {languageDisplay(send, props.language)}
            </Button>
          </div>
        ) : null}

        <Button color="primary" onClick={handleClose}>
          {languageDisplay(closeLabel, props.language)}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
