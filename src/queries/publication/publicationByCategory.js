import gql from "graphql-tag";

const PUBLICATIONS_BY_CATEGORY_QUERY = gql`
  query Category($name: String!) {
    categories(where: { name: $name }) {
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
  }
`;

export default PUBLICATIONS_BY_CATEGORY_QUERY;
