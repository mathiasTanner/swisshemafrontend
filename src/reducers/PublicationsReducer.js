import { GET_PUBLICATIONS } from "../Types";

export const PublicationsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PUBLICATIONS:
      return action.payload;
    default:
      return state;
  }
};
