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
      language {
        code
        name
      }
      menuitems {
        name
        FR
        EN
        DE
        submenu {
          name
          FR
          EN
          DE
        }
      }
    }
  }
`;

export default HEADER_QUERY;
