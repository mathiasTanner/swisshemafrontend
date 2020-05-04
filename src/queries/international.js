import gql from "graphql-tag";

const INTERNATIONAL_QUERY = gql`
  query International {
    international {
      logo {
        url
        name
      }
      ifhemaLink {
        name
        link
      }
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
      ifhemamemberlist {
        name {
          FR
          DE
          EN
          IT
          RO
        }
        element {
          name
          link
          country
        }
      }
      internationalList {
        name {
          FR
          DE
          EN
          IT
          RO
        }
        element {
          name
          link
          country
        }
      }
      otherGroups {
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
      europeList {
        name {
          FR
          DE
          EN
          IT
          RO
        }
        element {
          name
          link
          country
        }
      }
      otherList {
        name {
          FR
          DE
          EN
          IT
          RO
        }
        element {
          name
          link
          country
        }
      }
    }
  }
`;

export default INTERNATIONAL_QUERY;
