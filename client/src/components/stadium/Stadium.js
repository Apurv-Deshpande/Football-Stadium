import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";

import StadiumInfo from "./StadiumInfo";

import CommentItem from "../comments/CommentItem";
import CommentForm from "../comments/CommentForm";

import { getStadium, deleteStadium } from "../../actions/stadium";

const Stadium = ({
  getStadium,
  deleteStadium,
  stadium: { stadium, loading },
  auth,
  match
}) => {
  useEffect(() => {
    getStadium(match.params.id);
  }, [getStadium, match.params.id]);

  return (
    <Fragment>
      {stadium === null || loading ? (
        <Spinner />
      ) : (
          <Fragment>
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id === stadium.user && (
                <Link to="/edit-stadium" className="btn btn-dark">
                  Edit Stadium
              </Link>
              )}

            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id === stadium.user && (
                <button
                  onClick={e => deleteStadium(stadium._id)}
                  type="button"
                  class="btn btn-danger"
                >
                  <i class="fas fa-times" />
                </button>
              )}

            <StadiumInfo stadium={stadium} />

            {auth.isAuthenticated && auth.loading === false && (
              <CommentForm stadiumId={stadium._id} />
            )}

            {auth.isAuthenticated && auth.loading === false && (
              <div className="comments">
                {stadium.comments.map(comment => (
                  <CommentItem
                    key={comment._id}
                    comment={comment}
                    stadiumId={stadium._id}
                  />
                ))}
              </div>
            )}

          </Fragment>
        )}
    </Fragment>
  );
};

Stadium.propTypes = {
  getStadium: PropTypes.func.isRequired,
  deleteStadium: PropTypes.func.isRequired,
  stadium: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  stadium: state.stadium,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getStadium, deleteStadium }
)(Stadium);
