import React from "react";
import PropTypes from "prop-types";

function Header(props){
  var styles = {
    boxSizing: 'border-box',
    backgroundColor: '#111',
    fontFamily: 'Tangerine, cursive',
    fontSize: '3rem',
    fontWeight: '2',
    color: "#eee",
    width: '100%',
    padding: '1%'
  }
  return (
    <div style={styles}>
    {props.legend}
    </div>
  );
}

Header.propTypes = {
  legend: PropTypes.string
};

export default Header;