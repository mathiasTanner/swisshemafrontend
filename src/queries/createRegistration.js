import gql from "graphql-tag";

const CREATE_REGISTRATION_MUTATION = gql`
  mutation(
    $firstName: String!
    $lastName: String!
    $club: String!
    $mail: String!
    $eventName: String!
    $answers: [ComponentQuestionsAnswerInput]!
    $event: ID!
    $payerInfo: ComponentPaymentsPayerInfoInput!
  ) {
    createRegistration(
      input: {
        data: {
          firstName: $firstName
          lastName: $lastName
          club: $club
          email: $mail
          answers: $answers
          eventName: $eventName
          event: $event
          payerInfo: $payerInfo
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
