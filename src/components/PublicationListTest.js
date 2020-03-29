import React from "react";
import { connect } from "react-redux";
import { fetchPublications } from "../actions";

const mapStateToProps = (state, ownProps) => {
  return { publications: state.publbications };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPublications: publications => {
      dispatch(fetchPublications(publications));
    }
  };
};

const PublicationListTest = props => {
  if (props.thispublications.length !== 0) {
    console.log(props.thispublications);
    props.getPublications(props.thispublications);
  }

  return (
    <div>
      {props.thispublications.map((publication, i) => {
        const imgUrl =
          process.env.REACT_APP_BACKEND_URL + publication.image.url;
        return (
          <div key={publication.id}>
            <img src={imgUrl}></img>
            <h1>{publication.title.FR}</h1>
            <p>{publication.content.FR}</p>
            <h1>{publication.title.DE}</h1>
            <p>{publication.content.DE}</p>
            <h1>{publication.title.EN}</h1>
            <p>{publication.content.EN}</p>
          </div>
        );
      })}
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PublicationListTest);
