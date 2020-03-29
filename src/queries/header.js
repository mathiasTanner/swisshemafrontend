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
      AboutUs {
        EN
        FR
        DE
      }
      Members {
        EN
        FR
        DE
      }
      International {
        EN
        FR
        DE
      }
      Events {
        EN
        FR
        DE
        SwissGathering {
          EN
          FR
          DE
        }
        BearCup {
          EN
          FR
          DE
        }
        InstrBootCamp {
          EN
          FR
          DE
        }
        Calendar {
          EN
          FR
          DE
        }
      }
      Comissions {
        EN
        FR
        DE
      }
      Language {
        EN
        FR
        DE
      }
    }
  }
`;

export default HEADER_QUERY;
