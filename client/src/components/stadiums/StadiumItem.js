import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";

const StadiumItem = ({ stadium: { _id, name, image } }) => {
  return (
    <Card bg="bg-light">
      <Card.Img variant="top" src={image} />
      <Card.Title>{name}</Card.Title>

      <Link to={`/stadium/${_id}`} className="btn btn-primary">
        View Stadium
      </Link>
      <br />
    </Card>
  );
};

StadiumItem.propTypes = {
  stadium: PropTypes.object.isRequired
};

export default StadiumItem;
