import { combineReducers } from "redux";
import { PublicationsReducer } from "./PublicationsReducer";

export default combineReducers({
  publications: PublicationsReducer
});
