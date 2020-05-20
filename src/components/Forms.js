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
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DateFnsUtils from "@date-io/date-fns";
import Moment from "react-moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import { PayPalButton } from "react-paypal-button-v2";

import languageDisplay from "../functions/languageDisplay";
import {
  mailSent,
  mailNotSent,
  mandatory,
  send,
  uploadLabel,
  closeLabel,
  timeToEarly,
  timeToLate,
  registrationSuccess,
  registrationSuccessMsg,
} from "../JSONdata/label";
import { DropzoneArea } from "material-ui-dropzone";

import { priceLabel } from "../JSONdata/label";

//TODO: make file upload via graphQL
//TODO: make better email for confirmation msg
//TODO: handle errors in case of registration, payment and mail not sent

const useStyles = makeStyles((theme) => ({
  question: {
    width: "75%",
    margin: "auto",
    marginTop: "15px",
    marginBottom: "15px",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  selectQuestion: {
    width: "30%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
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
  timeError: {
    textAlign: "center",
    color: `${theme.palette.primary.main} `,
  },
  formControl: {
    margin: theme.spacing(3),
  },
  paymentDialog: {
    marign: "auto",
    textAlign: "center",
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
  const [mailNotSentVisible, setMailNotSentVisible] = useState(false);
  const [timeToEarlyVisible, setTimeToEarlyVisible] = useState(false);
  const [timeToLateVisible, setTimeToLateVisible] = useState(false);

  const [dynamicValidator, setDynamicValidator] = useState(null);
  const [open, setOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);

  const [dates, setDates] = useState({});
  const [radioValues, setRadioValues] = useState({});
  const [textAnswers, setTextAnswer] = useState({});
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [club, setClub] = useState("");
  const [answers, setAnswers] = useState([]);
  const [paymentConfirmationOpen, setPaymentConfirmationOpen] = useState(false);

  const editor = useRef(null);
  const config = {
    readonly: false,
  };

  const handleClose = () => {
    if (confirmationVisible) {
      clearQuestionnary();
    }
    setOpen(false);
  };

  const handlePaymentClose = () => {
    setPaymentConfirmationOpen(false);
    setPaymentOpen(false);
  };

  const handleFinalConfirmationClose = () => {
    setPaymentConfirmationOpen(false);
    setPaymentOpen(false);
    clearQuestionnary();
    props.close();
  };

  const handleOpen = (success) => {
    setCOnfirmationVisible(success);
    setMailNotSentVisible(!success);
    setOpen(success);
  };

  const clearQuestionnary = () => {
    props.form.questions.map((q) => (q["answer"] = ""));
    for (const q of props.form.questions) {
      setTextAnswer((prevState) => {
        return { ...prevState, [q.name]: "" };
      });
      setRadioValues((prevState) => {
        return { ...prevState, [q.name]: null };
      });
    }
    setDisabled(true);
  };

  useEffect(() => {
    if (!props.form.questions[0].hasOwnProperty("answer")) {
      props.form.questions.map((q) => (q["answer"] = ""));
    }
    if (dynamicValidator === null) {
      let generated = {};
      let myDates = {};
      let myRadio = {};
      let myText = {};
      for (const q of props.form.questions) {
        switch (q.type) {
          case "email":
            myText = {
              ...myText,
              [q.name]: "",
            };
            generated = {
              ...generated,
              [q.name]: { complete: !q.mandatory, wrongInput: true },
            };
            break;
          case "date_time":
            myDates = {
              ...myDates,
              [q.name]: new Date(),
            };
            generated = {
              ...generated,
              [q.name]: { complete: !q.mandatory, wrongInput: false },
            };
            break;
          case "date":
            myDates = {
              ...myDates,
              [q.name]: new Date(),
            };
            generated = {
              ...generated,
              [q.name]: { complete: !q.mandatory, wrongInput: false },
            };
            break;
          case "time":
            myDates = {
              ...myDates,
              [q.name]: new Date(),
            };
            generated = {
              ...generated,
              [q.name]: { complete: !q.mandatory, wrongInput: false },
            };
            break;
          case "radio":
            myRadio = {
              ...myRadio,
              [q.name]: q.options[0],
            };
            generated = {
              ...generated,
              [q.name]: { complete: !q.mandatory, wrongInput: false },
            };
            break;
          default:
            myText = {
              ...myText,
              [q.name]: "",
            };
            generated = {
              ...generated,
              [q.name]: { complete: !q.mandatory, wrongInput: false },
            };
            break;
        }
      }
      setDynamicValidator(generated);
      setDates(myDates);
      setRadioValues(myRadio);
      setTextAnswer(myText);
    }
  }, [props.form.questions, dynamicValidator, dates, radioValues, textAnswers]);

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
    } else {
      for (const q of props.form.questions) {
        if (q.type === "email") {
          setEmail(q.answer);
        } else if (q.name.toUpperCase() === "FIRST NAME") {
          setFirstname(q.answer);
        } else if (q.name.toUpperCase() === "LAST NAME") {
          setLastname(q.answer);
        } else if (q.name.toUpperCase() === "CLUB") {
          setClub(q.answer);
        } else {
          setAnswers((prevState) => {
            return [...prevState, { question: q.name, answer: q.answer }];
          });
        }
      }

      setPaymentOpen(true);
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
          setMailErrorMsgVisible(false);
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

      case "date_time":
        let minDateTime = null;
        let maxDateTime = null;
        if (question.min_date !== null && question.min_time !== null) {
          minDateTime = new Date(
            JSON.stringify(question.min_date) +
              JSON.stringify(question.min_time)
          );
        }
        if (question.min_date !== null && question.min_time === null) {
          minDateTime = new Date(JSON.stringify(question.min_date));
        }
        if (question.max_date !== null && question.max_time !== null) {
          maxDateTime = new Date(
            JSON.stringify(question.max_date) +
              JSON.stringify(question.max_time)
          );
        }
        if (question.max_date !== null && question.max_time === null) {
          maxDateTime = new Date(JSON.stringify(question.max_date));
        }
        if (question.answer === "" && question.mandatory) {
          setDynamicValidator({
            ...dynamicValidator,
            [question.name]: { complete: false, wrongInput: false },
          });
        } else {
          if (question.answer < minDateTime) {
            setDynamicValidator({
              ...dynamicValidator,
              [question.name]: { complete: false, wrongInput: true },
            });
            setTimeToLateVisible(false);
            setTimeToEarlyVisible(true);
          } else if (question.answer > maxDateTime) {
            setDynamicValidator({
              ...dynamicValidator,
              [question.name]: { complete: false, wrongInput: true },
            });
            setTimeToEarlyVisible(false);
            setTimeToLateVisible(true);
          } else {
            setDynamicValidator({
              ...dynamicValidator,
              [question.name]: { complete: true, wrongInput: false },
            });
            setTimeToEarlyVisible(false);
            setTimeToLateVisible(false);
          }
        }
        break;
      case "time":
        let minTime = null;
        let maxTime = null;

        if (question.min_time !== null) {
          minTime = new Date(JSON.stringify(question.min_time));
        }

        if (question.max_time !== null) {
          maxTime = new Date(JSON.stringify(question.max_time));
        }
        if (question.answer === "" && question.mandatory) {
          setDynamicValidator({
            ...dynamicValidator,
            [question.name]: { complete: false, wrongInput: false },
          });
        } else {
          if (question.answer < minTime) {
            setDynamicValidator({
              ...dynamicValidator,
              [question.name]: { complete: false, wrongInput: true },
            });
            setTimeToLateVisible(false);
            setTimeToEarlyVisible(true);
          } else if (question.answer > maxTime) {
            setDynamicValidator({
              ...dynamicValidator,
              [question.name]: { complete: false, wrongInput: true },
            });
            setTimeToEarlyVisible(false);
            setTimeToLateVisible(true);
          } else {
            setDynamicValidator({
              ...dynamicValidator,
              [question.name]: { complete: true, wrongInput: false },
            });
            setTimeToEarlyVisible(false);
            setTimeToLateVisible(false);
          }
        }
        break;

      case "radio":
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
              value={textAnswers[question.name] || ""}
              label={languageDisplay(question, props.language)}
              required={question.mandatory}
              onChange={(event) => {
                event.persist();
                setTextAnswer((prevState) => {
                  return { ...prevState, [question.name]: event.target.value };
                });
                question.answer = event.target.value;
                fieldValidator(question);
              }}
              onBlur={() => {
                fieldValidator(question);
              }}
              onFocus={() => {
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
              value={textAnswers[question.name] || ""}
              config={config}
              tabIndex={1}
              onBlur={(newContent) => {
                setTextAnswer((prevState) => {
                  return { ...prevState, [question.name]: newContent };
                });
                question.answer = newContent;
                fieldValidator(question);
              }}
              onFocus={() => {
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
              value={textAnswers[question.name] || ""}
              label={languageDisplay(question, props.language)}
              required={question.mandatory}
              onChange={(event) => {
                event.persist();
                setTextAnswer((prevState) => {
                  return {
                    ...prevState,
                    [question.name]: event.target.value,
                  };
                });

                question.answer = event.target.value;
                fieldValidator(question);
              }}
              onBlur={() => {
                fieldValidator(question);
              }}
              onFocus={() => {
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
        question.answer = question.options[0].value;
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
                onFocus={() => {
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

      case "date_time":
        let minDateTime = null;
        let maxDateTime = null;
        if (question.min_date !== null && question.min_time !== null) {
          minDateTime = new Date(
            JSON.stringify(question.min_date) +
              JSON.stringify(question.min_time)
          );
        }
        if (question.min_date !== null && question.min_time === null) {
          minDateTime = new Date(JSON.stringify(question.min_date));
        }
        if (question.max_date !== null && question.max_time !== null) {
          maxDateTime = new Date(
            JSON.stringify(question.max_date) +
              JSON.stringify(question.max_time)
          );
        }
        if (question.max_date !== null && question.max_time === null) {
          maxDateTime = new Date(JSON.stringify(question.max_date));
        }

        return (
          <>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDateTimePicker
                id={"datetimepicker" + i}
                inputVariant="outlined"
                ampm={false}
                format="dd/MM/yyyy HH:mm"
                value={
                  question.answer === "" || !question.hasOwnProperty("answer")
                    ? null
                    : dates[question.name]
                }
                onChange={(value) => {
                  question.answer = value;
                  setDates((prevState) => {
                    return { ...prevState, [question.name]: value };
                  });
                  fieldValidator(question);
                }}
                onBlur={() => {
                  fieldValidator(question);
                }}
                onFocus={() => {
                  fieldValidator(question);
                }}
                emptyLabel="DD/MM/YYYY HH:MM"
                helperText={languageDisplay(question, props.language)}
                minDate={
                  minDateTime !== null
                    ? minDateTime
                    : new Date("1900 / 01 / 01")
                }
                maxDate={
                  maxDateTime !== null
                    ? maxDateTime
                    : new Date("2100 / 01 / 01")
                }
              />
            </MuiPickersUtilsProvider>
            {timeToEarlyVisible && question.min_time !== null ? (
              <FormHelperText className={classes.timeError}>
                {languageDisplay(timeToEarly, props.language)}{" "}
                <Moment parse="HH:mm" format="HH:mm">
                  {question.min_time}
                </Moment>
              </FormHelperText>
            ) : null}
            {timeToLateVisible && question.max_time !== null ? (
              <FormHelperText className={classes.timeError}>
                {languageDisplay(timeToLate, props.language)}{" "}
                <Moment parse="HH:mm" format="HH:mm">
                  {question.max_time}
                </Moment>
              </FormHelperText>
            ) : null}
          </>
        );

      case "date":
        let minDate = null;
        let maxDate = null;

        if (question.min_date !== null) {
          minDate = new Date(JSON.stringify(question.min_date));
        }

        if (question.max_date !== null) {
          maxDate = new Date(JSON.stringify(question.max_date));
        }

        return (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              id={"datepicker" + i}
              inputVariant="outlined"
              ampm={false}
              format="dd/MM/yyyy HH:mm"
              value={
                question.answer === "" || !question.hasOwnProperty("answer")
                  ? null
                  : dates[question.name]
              }
              onChange={(value) => {
                question.answer = value;
                setDates((prevState) => {
                  return { ...prevState, [question.name]: value };
                });
                fieldValidator(question);
              }}
              onBlur={() => {
                fieldValidator(question);
              }}
              onFocus={() => {
                fieldValidator(question);
              }}
              emptyLabel="DD/MM/YYYY"
              helperText={languageDisplay(question, props.language)}
              minDate={minDate !== null ? minDate : new Date("1900 / 01 / 01")}
              maxDate={maxDate !== null ? maxDate : new Date("2100 / 01 / 01")}
            />
          </MuiPickersUtilsProvider>
        );

      case "time":
        return (
          <>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardTimePicker
                id={"datetimepicker" + i}
                inputVariant="outlined"
                ampm={false}
                format="HH:mm"
                value={
                  question.answer === "" || !question.hasOwnProperty("answer")
                    ? null
                    : dates[question.name]
                }
                onChange={(value) => {
                  question.answer = value;
                  setDates((prevState) => {
                    return { ...prevState, [question.name]: value };
                  });
                  fieldValidator(question);
                }}
                onBlur={() => {
                  fieldValidator(question);
                }}
                onFocus={() => {
                  fieldValidator(question);
                }}
                emptyLabel="hh:mm"
                helperText={languageDisplay(question, props.language)}
              />
            </MuiPickersUtilsProvider>
            {timeToEarlyVisible && question.min_time !== null ? (
              <FormHelperText className={classes.timeError}>
                {languageDisplay(timeToEarly, props.language)}{" "}
                {question.min_time}
              </FormHelperText>
            ) : null}
            {timeToLateVisible && question.max_time !== null ? (
              <FormHelperText className={classes.timeError}>
                {languageDisplay(timeToLate, props.language)}{" "}
                {question.max_time}
              </FormHelperText>
            ) : null}
          </>
        );

      case "radio":
        question.answer = question.options[0].value;
        return (
          <>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">
                {languageDisplay(question, props.language)}
              </FormLabel>
              <RadioGroup
                name={question.name}
                value={radioValues[question.name] || null}
                onChange={(event) => {
                  event.persist();
                  setRadioValues((prevState) => {
                    return {
                      ...prevState,
                      [question.name]: event.target.value,
                    };
                  });

                  question.answer = event.target.value;
                  fieldValidator(question);
                }}
                onBlur={() => {
                  fieldValidator(question);
                }}
                onFocus={() => {
                  fieldValidator(question);
                }}
              >
                {question.options.map((item, i) => {
                  return (
                    <FormControlLabel
                      key={i}
                      value={item.value}
                      control={<Radio color="primary" />}
                      label={languageDisplay(item, props.language)}
                      labelPlacement="start"
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
          </>
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
      {/*mail sent dialog*/}
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
            {mailNotSentVisible
              ? languageDisplay(mailNotSent, props.language)
              : null}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            {languageDisplay(closeLabel, props.language)}
          </Button>
        </DialogActions>
      </Dialog>
      {/*payment option dialog*/}
      <Dialog
        open={paymentOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="lg"
      >
        <DialogContent className={classes.paymentDialog}>
          <Typography
            variant="h6"
            component="p"
            className={classes.paymentLabel}
          >
            {languageDisplay(priceLabel, props.language).props.children +
              ": " +
              props.price +
              "CHF"}
          </Typography>

          <PayPalButton
            amount={2}
            currency="CHF"
            shippingPreference="NO_SHIPPING"
            onSuccess={(details, data) => {
              let subject =
                "Payment Conirmation: " + firstname + " " + lastname;
              let text =
                "Your payment of " +
                props.price +
                "CHF has been confirmed, contact us in case of problems";

              axios
                .post(
                  `https://admin.tannerdev.tech/registrations`,
                  {
                    firstName: firstname,
                    lastName: lastname,
                    club: club,
                    email: email,
                    answers: answers,
                    event: props.eventId,
                    eventName: props.eventname,
                    payerInfo: {
                      mail: details.payer.email_address,
                      firstName: details.payer.name.given_name,
                      lastName: details.payer.name.surname,
                      payer_id: details.payer.payer_id,
                    },
                  },
                  { headers: { "Content-Type": "application/json" } }
                )
                .then(
                  (response) => {
                    axios
                      .post(
                        `https://admin.tannerdev.tech/email`,
                        {
                          to: email,
                          from: "contact@tannerdev.tech",
                          replyTo: "contact@tannerdev.tech",
                          cc: "mathias.tanner.ge@gmail.com",
                          subject: subject,
                          text: text,
                          html: text,
                        },
                        { headers: { "Content-Type": "application/json" } }
                      )
                      .then(
                        (response) => {
                          setPaymentConfirmationOpen(true);
                        },
                        (error) => {}
                      );
                  },
                  (error) => {}
                );
            }}
            options={{
              clientId:
                "AZVrcPE2fQih5ja4qYt54OQVrd22kfMVa_ayqJlCOmhMTbzs00kcfyG0q1jdf0uts7a5FB4AHYqo35Ub",
              currency: "CHF",
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePaymentClose} color="primary" autoFocus>
            {languageDisplay(closeLabel, props.language)}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={paymentConfirmationOpen}
        onClose={handlePaymentClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {languageDisplay(registrationSuccess, props.language)}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {languageDisplay(registrationSuccessMsg, props.language)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleFinalConfirmationClose}
            color="primary"
            autoFocus
          >
            close
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Forms);
