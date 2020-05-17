import gql from "graphql-tag";

const EVENT_QUERY = gql`
  query Event($name: String!) {
    events(where: { pagename: $name }) {
      id
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
      image {
        url
        name
      }
      start
      end
      registration_start
      registration_end
      price
      pagename
      location
      address
      latitude
      longitude
      Schedule {
        url
        name
      }
      presentations {
        name
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
        Author
        authorIntro {
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
      }
      labels {
        identifier
        FR
        DE
        EN
        IT
        RO
      }
      form {
        id
        name
      }
    }
  }
`;

export default EVENT_QUERY;
