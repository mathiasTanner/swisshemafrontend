import gql from "graphql-tag";

//query Form($id: ID!)
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
      questions(sort: "number") {
        name
        number
        form {
          name
        }
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
        min_date
        max_date
        min_time
        max_time
      }
    }
  }
`;

export default FORM_QUERY;
