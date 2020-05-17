import gql from "graphql-tag";

const CREATE_REGISTRATION_MUTATION = gql`
  mutation(
    $firstName: String!
    $lastName: String!
    $club: String!
    $mail: String!
    $answers: [ComponentQuestionsAnswerInput]!
    $event: ID!
  ) {
    createRegistration(
      input: {
        data: {
          firstName: $firstName
          lastName: $lastName
          club: $club
          email: $mail
          answers: $answers
          event: $event
        }
      }
    ) {
      registration {
        firstName
        lastName
        club
        email
        answers {
          question
          answer
        }
        event {
          name
        }
      }
    }
  }
`;

export default CREATE_REGISTRATION_MUTATION;
