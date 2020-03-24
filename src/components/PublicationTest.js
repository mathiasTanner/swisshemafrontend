import React from "react";
import Query from "./Query";

import PUBLICATIONS_QUERY from "../queries/publication/publications";

const PublicationTest = () => {
  return (
    <div>
      <Query query={PUBLICATIONS_QUERY} id={null}>
        {({ data: { publications } }) => {
          return (
            <div>
              {publications.map((publication, i) => {
                return (
                  <div key={publication.id}>
                    <h1>{publication.Title}</h1>
                    <p>{publication.Content}</p>
                  </div>
                );
              })}
            </div>
          );
        }}
      </Query>
    </div>
  );
};

export default PublicationTest;
