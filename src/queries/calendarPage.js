import gql from "graphql-tag";

const CALENDARPAGE_QUERY = gql`
  query CalendarPage {
    calendarPage {
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
      }
      calendar_events {
        type
        name
        details {
          FR
          DE
          EN
          IT
          RO
        }
        start
        end
        organizer
        location

        link {
          name
          link
        }
      }
    }
  }
`;

export default CALENDARPAGE_QUERY;
