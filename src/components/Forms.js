import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import axios from "axios";

//import { useMediaQuery } from "@material-ui/core";
import { makeStyles /*, useTheme*/ } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { FormHelperText } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import JoditEditor from "jodit-react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import languageDisplay from "../functions/languageDisplay";
import {
  mailSent,
  mandatory,
  send,
  uploadLabel,
  closeLabel,
} from "../JSONdata/label";
import { DropzoneArea } from "material-ui-dropzone";

//TODO: make file upload via either graphql or axios
//TODO: Finish switches for all form question type

const useStyles = makeStyles((theme) => ({
  question: {
    width: "75%",
    margin: "auto",
    marginTop: "15px",
    marginBottom: "15px",
  },
  selectQuestion: {
    width: "30%",
  },
  description: {
    width: "80%",
    margin: "15px",
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
    margin: "5px",
  },
  input: {
    display: "none",
  },
}));

const mapStateToProps = (state, ownProps) => {
  return { language: state.language };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

const Forms = (props) => {
  //const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));
  const classes = useStyles();
  const [disabled, setDisabled] = useState(true);
  const [mailErrorMsgVisible, setMailErrorMsgVisible] = useState(false);
  const [confirmationVisible, setCOnfirmationVisible] = useState(false);

  const [dynamicValidator, setDynamicValidator] = useState(null);
  const [open, setOpen] = useState(false);

  const editor = useRef(null);
  const config = {
    readonly: false,
  };

  const handleClose = () => {
    if (confirmationVisible) {
      clearQuestionnary();
      setOpen(false);
    }
  };
  const handleOpen = (success) => {
    setCOnfirmationVisible(success);
    setOpen(success);
  };

  const clearQuestionnary = () => {
    props.form.questions.map((q) => (q["answer"] = ""));
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
      let text = "";
      //let attachments = null;
      if (props.form.name === "Contact Form") {
        for (const question of props.form.questions) {
          if (question.type === "email") {
            email = question.answer;
          } else if (question.type === "text") {
            subject = question.answer;
          } else {
            text = question.answer;
          }
        }
      } else {
        for (const question of props.form.questions) {
          if (question.type === "email") {
            email = question.answer;
            subject = props.form.name + ": by " + question.answer;
          } else {
            text =
              text + "<p>" + question.name + ": " + question.answer + "</p>";
          }
        }
      }

      //TODO: ATTACHMENT DOESN?T WORK WITHOUT GOING THROUGH THE NODE SERVER
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
            // attachments: [
            //   {
            //     ...attachments[0],
            //     contentType: attachments[0].type,
            //   },
            // ],
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .then(
          (response) => {
            handleOpen(true);
          },
          (error) => {
            handleOpen(false);
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
              [question.name]: { complete: false, wrongInput: true },
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

      case "select":
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

      case "upload":
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

  const renderInput = (question, i) => {
    switch (question.type) {
      case "text":
        return (
          <div>
            <TextField
              id={"text" + i}
              //defaultValue=""
              value={question.hasOwnProperty("answer") ? question.answer : ""}
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
              id={"long_text" + i}
              ref={editor}
              value={question.hasOwnProperty("answer") ? question.answer : ""}
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
              id={"email" + i}
              type="email"
              error={mailErrorMsgVisible}
              value={question.hasOwnProperty("answer") ? question.answer : ""}
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

      case "select":
        return (
          <div>
            <FormControl variant="outlined" className={classes.selectQuestion}>
              <InputLabel id={"select-label" + i}>
                {languageDisplay(question, props.language)}
                {question.mandatory ? "*" : null}
              </InputLabel>
              <Select
                labelId={"select-label" + i}
                id={"select-outlined" + i}
                value={question.answer || question.options[0].value}
                onChange={(event) => {
                  question.answer = event.target.value;
                  fieldValidator(question);
                }}
                onBlur={() => {
                  fieldValidator(question);
                }}
                label={languageDisplay(question, props.language)}
              >
                <MenuItem value={""} key={i} disabled>
                  {languageDisplay(question, props.language)}
                </MenuItem>
                {question.options.map((option, i) => {
                  return (
                    <MenuItem value={option.value} key={i}>
                      {languageDisplay(option, props.language)}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        );
      case "upload":
        return (
          <div>
            <DropzoneArea
              id={"dropzone" + i}
              onChange={(files) => {
                question.answer = files;
                fieldValidator(question);
              }}
              maxFileSize={5000000}
              dropzoneText={
                languageDisplay(uploadLabel, props.language).props.children
              }
              filesLimit={1}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Grid container direction="column">
      <Grid item id="questions">
        {props.form.questions.map((question, i) => {
          return (
            <div key={i} className={classes.question}>
              {renderInput(question, i)}
            </div>
          );
        })}
      </Grid>
      <Grid item id="button-area">
        <Grid container direction="row" justify="flex-end">
          {disabled ? (
            <FormHelperText>
              * {languageDisplay(mandatory, props.language)}
            </FormHelperText>
          ) : null}

          <Button
            color="primary"
            variant="contained"
            disabled={disabled}
            onClick={submitForm}
            className={classes.button}
          >
            {languageDisplay(send, props.language)}
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {confirmationVisible
              ? languageDisplay(mailSent, props.language)
              : null}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            {languageDisplay(closeLabel, props.language)}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Forms);
