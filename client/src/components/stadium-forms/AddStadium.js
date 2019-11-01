import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addStadium } from "../../actions/stadium";

const AddStadium = ({ addStadium }) => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    cost: "",
    location: ""
  });

  const { name, image, club, cost, location } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addStadium(formData);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Create Stadium Information</h1>
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
            placeholder="Stadium"
            name="club"
            value={club}
            onChange={e => onChange(e)}
          />
          <small className="form-text">Club of the stadium</small>
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="Stadium Cost"
            name="cost"
            value={cost}
            onChange={e => onChange(e)}
          />
          <small className="form-text">Name of the stadium</small>
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
          Stadiums
        </Link>
      </form>
    </Fragment>
  );
};

AddStadium.propTypes = {
  addStadium: PropTypes.func.isRequired
};

export default connect(
  null,
  { addStadium }
)(withRouter(AddStadium));
