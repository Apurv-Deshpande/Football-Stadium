import React, { Fragment, useEffect } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import StadiumItem from "./StadiumItem";
import StadiumIntro from "./StadiumIntro";
import { getStadiums } from "../../actions/stadium";

const Stadiums = ({
  getStadiums,
  stadium: { stadiums, loading, filtered }
}) => {
  useEffect(() => {
    getStadiums();
  }, [getStadiums]);

  return (
    <div>
      <StadiumIntro />
      <div>
        <Fragment>
          {loading ? (
            <Spinner />
          ) : (
            <Fragment>
              <div className="stadiums">
                {stadiums.length > 0 ? (
                  <Fragment>
                    {filtered !== null
                      ? filtered.map(stadium => (
                          <StadiumItem key={stadium._id} stadium={stadium} />
                        ))
                      : stadiums.map(stadium => (
                          <StadiumItem key={stadium._id} stadium={stadium} />
                        ))}
                  </Fragment>
                ) : (
                  <h4>No stadiums found...</h4>
                )}
              </div>
            </Fragment>
          )}
        </Fragment>
      </div>
    </div>
  );
};

Stadiums.propTypes = {
  getStadiums: PropTypes.func.isRequired,
  stadium: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  stadium: state.stadium
});

export default connect(
  mapStateToProps,
  { getStadiums }
)(Stadiums);
