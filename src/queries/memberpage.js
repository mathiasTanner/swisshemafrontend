import gql from "graphql-tag";

const MEMBERPAGE_QUERY = gql`
  query MemberPage {
    memberPage {
      pagetitle {
        EN
        FR
        DE
        IT
        RO
      }
      passiveMemberLabel {
        EN
        FR
        DE
        IT
        RO
      }
      otherGroupLabel {
        EN
        FR
        DE
        IT
        RO
      }
      contactButtonLabel {
        EN
        FR
        DE
        IT
        RO
      }
      trainingLocationText {
        EN
        FR
        DE
        IT
        RO
      }
      otherGroupText {
        EN
        FR
        DE
        IT
        RO
      }
      memberlist {
        name
        abbreviation
        logo {
          url
          name
        }
        location {
          Canton
          latitude
          longitude
        }
        training {
          location
          hours {
            day
            start
            end
          }
        }
        website
        passive
      }
      groups {
        name
        link
      }
      form {
        id
      }
    }
  }
`;

export default MEMBERPAGE_QUERY;
