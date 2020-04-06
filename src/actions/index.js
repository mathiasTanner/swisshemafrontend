import { GET_PUBLICATIONS } from "../Types";
import { SWITCH_LANGUAGE } from "../Types";

export const fetchPublications = data => {
  return {
    type: GET_PUBLICATIONS,
    payload: data
  };
};

export const ChangeLanguage = data => {
  return {
    type: SWITCH_LANGUAGE,
    payload: data
  };
};
