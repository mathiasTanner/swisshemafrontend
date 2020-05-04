import gql from "graphql-tag";

const COUNTRY_BY_CODE_QUERY = gql`
  query Country($code: String!) {
    countries(where: { code: $code }) {
      code
      name {
        FR
        DE
        EN
        IT
        RO
      }
    }
  }
`;

export default COUNTRY_BY_CODE_QUERY;
