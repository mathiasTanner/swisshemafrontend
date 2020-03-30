import gql from "graphql-tag";

const MENUITEMS_QUERY = gql`
  query MenuItems {
    menuItem {
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
      Commissions {
        EN
        FR
        DE
      }
    }
  }
`;

export default HEADER_QUERY;
