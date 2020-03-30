import gql from "graphql-tag";

const HEADER_QUERY = gql`
  query Header {
    header {
      logo {
        url
      }
      Title
      Subtitle {
        EN
        FR
        DE
      }
      Language
    }
  }
`;

export default HEADER_QUERY;
