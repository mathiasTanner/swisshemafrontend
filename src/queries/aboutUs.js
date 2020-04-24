import gql from "graphql-tag";

const ABOUTUS_QUERY = gql`
  query AboutUs {
    aboutUs {
      Slider {
        name
        url
      }
      Title {
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
      HEMATitle {
        FR
        DE
        EN
        IT
        RO
      }
      HEMA {
        FR
        DE
        EN
        IT
        RO
      }
      buttonLabel {
        FR
        DE
        EN
        IT
        RO
      }
      status {
        language
        document {
          url
        }
      }
      partnerlabel {
        FR
        DE
        EN
        IT
        RO
      }
      partners {
        name
        logo {
          url
          name
        }
        link
      }
    }
  }
`;

export default ABOUTUS_QUERY;
