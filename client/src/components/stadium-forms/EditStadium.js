import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentStadium, editStadium } from "../../actions/stadium";

const EditStadium = ({
  stadium: { stadium, loading },
  editStadium,
  getCurrentStadium
}) => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    club: "",
    cost: "",
    location: ""
  });
  useEffect(() => {
    getCurrentStadium();
    setFormData({
      name: loading || !stadium.name ? "" : stadium.name,
      image: loading || !stadium.image ? "" : stadium.image,
      club: loading || !stadium.club ? "" : stadium.club,
      cost: loading || !stadium.cost ? "" : stadium.cost,
      location: loading || !stadium.location ? "" : stadium.location
    });
  }, [loading, getCurrentStadium]);

  const { name, image, club, cost, location } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    editStadium(formData, stadium._id);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Edit Stadium Information</h1>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Stadium name"
            name="name"
            value={name}
            onChange={e => onChange(e)}
          />
          <small className="form-text">Name of the stadium</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Image url"
            name="image"
            value={image}
            onChange={e => onChange(e)}
          />
          <small className="form-text">Image of the stadium</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Stadium club"
            name="club"
            value={club}
            onChange={e => onChange(e)}
          />
          <small className="form-text">Club of the stadium</small>
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="Stadiim Cost"
            name="cost"
            value={cost}
            onChange={e => onChange(e)}
          />
          <small className="form-text">Cost of the stadium</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="stadium location"
            name="location"
            value={location}
            onChange={e => onChange(e)}
          />
          <small className="form-text">Location of the stadium</small>
        </div>

        <input type="submit" className="btn btn-primary my-1" />

        <Link className="btn btn-light my-1" to="/stadiums">
          GO Back
        </Link>
      </form>
    </Fragment>
  );
};

EditStadium.propTypes = {
  stadium: PropTypes.object.isRequired,
  getCurrentStadium: PropTypes.func.isRequired,
  editStadium: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  stadium: state.stadium
});

export default connect(
  mapStateToProps,
  { getCurrentStadium, editStadium }
)(withRouter(EditStadium));
