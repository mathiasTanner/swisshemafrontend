import gql from "graphql-tag";

const COMMISSION_BY_NAME_QUERY = gql`
  query Commission($name: String!) {
    commissions(where: { name: $name }) {
      name
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
      articles {
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
      media_elements {
        type
        name {
          FR
          DE
          EN
          IT
          RO
        }
        link {
          link
          name
        }
        media {
          url
          name
        }
        author
        date
        identifier
      }
      mediaZoneIntro {
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
      mediaLabels {
        identifier
        FR
        DE
        EN
        IT
        RO
      }
      form {
        id
      }
    }
  }
`;

export default COMMISSION_BY_NAME_QUERY;
