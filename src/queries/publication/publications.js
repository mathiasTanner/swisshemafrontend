import gql from "graphql-tag";

const PUBLICATIONS_QUERY = gql`
  query Publications {
    publications {
      id
      Title
      Content
      image {
        url
      }
      published_at
    }
  }
`;

export default PUBLICATIONS_QUERY;
