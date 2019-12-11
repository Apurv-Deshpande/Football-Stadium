import React from "react";
import PropTypes from "prop-types";

import Card from "react-bootstrap/Card";

const StadiumInfo = ({
  stadium: { image, name, description, location, cost }
}) => {
  return (
    <Card bg="bg-light">
      <Card.Img variant="top" src={image} />
      <Card.Title>
        <b>Stadium Name</b>: {name}
      </Card.Title>
      <Card.Text>
        <b>Club name</b>: {description}
      </Card.Text>
      <Card.Text>
        <b>Cost</b>: £{cost}
      </Card.Text>
      <Card.Text>
        <b>Location</b>: {location}
      </Card.Text>
    </Card>
  );
};

StadiumInfo.propTypes = {
  stadium: PropTypes.object.isRequired
};

export default StadiumInfo;
