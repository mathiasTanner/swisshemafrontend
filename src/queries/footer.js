import gql from "graphql-tag";

const FOOTER_QUERY = gql`
  query Footer {
    footer {
      id
      newsletterMessage {
        EN
        FR
        DE
      }
      newsletterDisclaimer {
        EN
        FR
        DE
      }
      facebook
      contactLabel {
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
