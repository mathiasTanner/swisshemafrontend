import gql from "graphql-tag";

const FOOTER_QUERY = gql`
  query Footer {
    footer {
      mailing_list
      facebook
      label {
        EN
        FR
        DE
      }
      forms {
        id
      }
    }
  }
`;

export default FOOTER_QUERY;
