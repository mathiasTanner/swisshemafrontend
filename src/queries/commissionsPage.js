import gql from "graphql-tag";

const COMMISSIONSPAGE_QUERY = gql`
  query CommissionPage {
    commissionPage {
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
      commissions {
        name
        intro {
          title {
            FR
            DE
            EN
            IT
            RO
          }
        }
      }
    }
  }
`;

export default COMMISSIONSPAGE_QUERY;
