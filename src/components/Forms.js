import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { FormHelperText } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import languageDisplay from "../functions/languageDisplay";
import { mailSent, mandatory, send, uploadLabel } from "../JSONdata/label";
import { DropzoneArea } from "material-ui-dropzone";
import emailjs from "emailjs-com";

//TODO: make file upload via either graphql or axios
//TODO: Finish switches for all form question type

const useStyles = makeStyles((theme) => ({
  question: {
    margin: "15px",
    width: "75%",
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
}));

const mapStateToProps = (state, ownProps) => {
  return { language: state.language };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

const Forms = (props) => {
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

  const handleClose = () => {
    props.close();
    setCOnfirmationVisible(false);
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
      let textTable = [];
      let attachment = null;
      if (props.form.name === "Contact Form") {
        props.form.questions.map((question) => {
          if (question.type === "email") {
            email = question.answer;
          } else if (question.type === "text") {
            subject = question.answer;
          } else {
            text = question.answer;
          }
        });
      } else if (props.form.name === "Media Form") {
        for (const question of props.form.questions) {
          if (question.type === "email") {
            email = question.answer;
          } else if (question.name.includes("author")) {
            subject = "Media sharing by " + question.answer;
          } else if (question.type === "upload") {
            attachment = question.answer;
          } else {
            text = text + question.name + ": " + question.answer + "\n\r";
            textTable.push(question.name + ": " + question.answer);
          }
        }
      }

      textTable.map((item) => console.log(item));

      let template_params = {
        from_mail: email,
        reply_to: email,
        message_html: textTable.map((item) => <p>{JSON.stringify(item)}</p>),
      };

      //ATTACHMENT DOESN'T WIORK; CORRECT THIS

      let service_id = "default_service";
      let template_id = "media_submission";
      let user_id = "user_2VENXOXhX0s1pWnHfkTfh";
      emailjs.send(service_id, template_id, template_params, user_id).then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
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

      case "select":
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

      case "upload":
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

  const renderInput = (question, i) => {
    switch (question.type) {
      case "text":
        return (
          <div>
            <TextField
              id={"text" + i}
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
            <TextField
              id="long_text"
              defaultValue=""
              label={languageDisplay(question, props.language)}
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

      case "select":
        return (
          <div>
            <FormControl variant="outlined" className={classes.selectQuestion}>
              <InputLabel id="select-label">
                {languageDisplay(question, props.language)}
                {question.mandatory ? "*" : null}
              </InputLabel>
              <Select
                labelId="select-label"
                id="select-outlined"
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
        {!confirmationVisible ? (
          props.form.questions.map((question, i) => {
            return (
              <div key={i} className={classes.question}>
                {renderInput(question, i)}
              </div>
            );
          })
        ) : (
          <Typography variant="body1">
            {languageDisplay(mailSent, props.language)}
          </Typography>
        )}
      </Grid>
      <Grid item id="button-area">
        <Grid container direction="row" justify="flex-end">
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
                className={classes.button}
              >
                {languageDisplay(send, props.language)}
              </Button>
            </div>
          ) : null}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Forms);
