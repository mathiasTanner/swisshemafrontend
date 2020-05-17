import React from "react";
import { useQuery } from "@apollo/react-hooks";
import Skeleton from "@material-ui/lab/Skeleton";

const RegistrationMutation = ({
  children,
  query,
  id,
  firstname,
  lastname,
  mail,
  answers,
  eventID,
}) => {
  const { data, loading, error } = useQuery(query, {
    variables: {
      id: id,
      code: code,
      name: name,
      firstname: firstname,
      lastname: lastname,
      answers: answers,
      eventID: eventID,
    },
  });

  if (loading) return <Skeleton variant="text" animation="wave" />;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;

  return children({ data });
};

export default RegistrationMutation;
