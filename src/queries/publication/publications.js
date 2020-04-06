import gql from "graphql-tag";

const PUBLICATIONS_QUERY = gql`
  query Publications {
    publications {
      id
      title {
        FR
        DE
        EN
      }
      content {
        FR
        DE
        EN
      }
      image {
        url
        hash
        sha256
      }
      published_at
    }
  }
`;

export default PUBLICATIONS_QUERY;
