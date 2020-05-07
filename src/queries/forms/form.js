import gql from "graphql-tag";

const FORM_QUERY = gql`
  query Form($id: ID!) {
    form(id: $id) {
      name
      type
      Description {
        FR
        DE
        EN
      }
      questions(sort: "name") {
        name
        type
        mandatory
        EN
        FR
        DE
        options {
          EN
          FR
          DE
          value
        }
      }
    }
  }
`;

export default FORM_QUERY;
