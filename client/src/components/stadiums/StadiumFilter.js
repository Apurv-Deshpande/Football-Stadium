import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { filterStadiums, clearFilter } from "../../actions/stadium";

const StadiumFilter = ({ filtered, filterStadiums, clearFilter }) => {
  const text = useRef("");

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onChange = e => {
    if (text.current.value !== "") {
      filterStadiums(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        form-control
        form-control-lg
        ref={text}
        type="text"
        placeholder="Filter Stadiums..."
        onChange={onChange}
      />
    </form>
  );
};

StadiumFilter.propTypes = {
  filterStadiums: PropTypes.func.isRequired,
  filtered: PropTypes.object.isRequired,
  clearFilter: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  filtered: state.filtered
});

export default connect(
  mapStateToProps,
  { filterStadiums, clearFilter }
)(StadiumFilter);
