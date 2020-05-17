import React from "react";
import { useQuery } from "@apollo/react-hooks";
import Skeleton from "@material-ui/lab/Skeleton";

const PageQuery = ({ children, query, id, name }) => {
  const { data, loading, error } = useQuery(query, {
    variables: { id: id, name: name },
  });

  if (loading)
    return (
      <div>
        <Skeleton variant="text" />
        <Skeleton variant="rect" width={"90vw"} height={"40vh"} />
        <Skeleton variant="text" />
        <Skeleton variant="rect" width={"90vw"} height={"60vh"} />
      </div>
    );
  if (error) return <p>Error: {JSON.stringify(error)}</p>;

  return children({ data });
};

export default PageQuery;
