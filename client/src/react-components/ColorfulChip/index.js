import React from "react";
import PropTypes from "prop-types";
import { Chip } from "@material-ui/core";
// import shadeColor from "../functions/shadeColor";

function ColorfulChip(props) {
  const { color, label, className } = props;
  return (
    <Chip
      style={{
        color: color,
        // backgroundColor: {blue}
      }}
      label={label}
      className={className ? className : null}
    />
  );
}

ColorfulChip.propTypes = {
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

export default ColorfulChip;