import React from "react";
import { useQuery } from "@apollo/react-hooks";
import Skeleton from "@material-ui/lab/Skeleton";

const RegistrationMutation = ({
  children,
  query,
  id,
  firstname,
  lastname,
  club,
  mail,
  answers,
  eventName,
  event,
  payerInfo,
}) => {
  const { data, loading, error } = useQuery(query, {
    variables: {
      id: id,
      email: mail,
      firstname: firstname,
      lastname: lastname,
      club: club,
      answers: answers,
      eventName: eventName,
      event: event,
      payerInfo: payerInfo,
    },
  });

  if (loading) return <Skeleton variant="text" animation="wave" />;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;

  return children({ data });
};

export default RegistrationMutation;
