import { combineReducers } from "redux";
import { PublicationsReducer } from "./PublicationsReducer";
import { LanguageReducer } from "./LanguageReducer";

export default combineReducers({
  publications: PublicationsReducer,
  language: LanguageReducer
});
