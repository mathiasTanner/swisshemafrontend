import React from "react";
import { connect } from "react-redux";
import { fetchPublications } from "../actions";

const mapStateToProps = (state, ownProps) => {
  return {
    publications: state.publbications,
    language: state.language
  };
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
            <img src={imgUrl} alt=""></img>
            <h1>
              {props.language === "FR"
                ? publication.title.FR
                : props.language === "EN"
                ? publication.title.EN
                : publication.title.DE}
            </h1>
            <p>
              {props.language === "FR"
                ? publication.content.FR
                : props.language === "EN"
                ? publication.content.EN
                : publication.content.DE}
            </p>
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
