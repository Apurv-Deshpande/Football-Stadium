import React from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteComment } from "../../actions/stadium";

const CommentItem = ({

  stadiumId,
  comment: { _id, text, name, user, date, }, auth,
  deleteComment
}) => (
    <div className="stadium bg-white p-1 my-1">
      <div>
        <h4>{name}</h4>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="stadium-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>

        {!auth.loading && user === auth.user._id && (
          <button
            onClick={() => deleteComment(stadiumId, _id)}
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-times" />
          </button>
        )}
      </div>
    </div>
  );

CommentItem.propTypes = {
  stadiumId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
