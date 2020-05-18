import React from "react";
import { useQuery } from "@apollo/react-hooks";
import Skeleton from "@material-ui/lab/Skeleton";

const Query = ({ children, query, id, code, name }) => {
  const { data, loading, error } = useQuery(query, {
    variables: { id: id, code: code, name: name },
  });

  if (loading) return <Skeleton variant="text" animation="wave" />;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;

  return children({ data });
};

export default Query;
