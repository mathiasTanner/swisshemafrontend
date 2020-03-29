import { GET_PUBLICATIONS } from "../Types";

export const fetchPublications = data => {
  return {
    type: GET_PUBLICATIONS,
    payload: data
  };
};
