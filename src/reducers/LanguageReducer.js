import { SWITCH_LANGUAGE } from "../Types";

export const LanguageReducer = (state = [], action) => {
  switch (action.type) {
    case SWITCH_LANGUAGE:
      return action.payload;
    default:
      return state;
  }
};
