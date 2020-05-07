import gql from "graphql-tag";

const PUBLICATIONS_QUERY = gql`
  query Publications {
    publications {
      categories {
        name
      }
      title {
        FR
        DE
        EN
        IT
        RO
      }
      content {
        FR
        DE
        EN
        IT
        RO
      }
      image {
        url
        name
      }
      published_at
      event {
        name
        pagename
      }
    }
  }
`;

export default PUBLICATIONS_QUERY;
