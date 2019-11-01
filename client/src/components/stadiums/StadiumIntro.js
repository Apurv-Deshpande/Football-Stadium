import React from "react";
import StadiumFilter from "./StadiumFilter";
import { Link } from "react-router-dom";
import Jumbotron from "react-bootstrap/Jumbotron";
const StadiumIntro = () => {
  return (
    <Jumbotron>
      <h1 className="text-center"> Welcome to Football Stadiums</h1>
      <p className="text-center lead">Every league stadiums available here</p>

      <div className="row">
        <div className="col-md-3 offset-md-3">
          <Link className="btn btn-primary btn-sm" to="/add-stadium">
            Add new Stadium
          </Link>
        </div>
        <div className="col-md-3">
          <StadiumFilter />
        </div>
      </div>
    </Jumbotron>
  );
};

export default StadiumIntro;
