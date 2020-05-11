import gql from "graphql-tag";

const EVENTPAGE_QUERY = gql`
  query EventPage {
    eventPage {
      intro {
        title {
          FR
          DE
          EN
          IT
          RO
        }
        paragraph {
          FR
          DE
          EN
          IT
          RO
        }
      }
      labels {
        identifier
        FR
        DE
        EN
        IT
        RO
      }
      category {
        name
      }
    }
  }
`;

export default EVENTPAGE_QUERY;
