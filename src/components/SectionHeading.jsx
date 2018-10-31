import React from 'react';
import PropTypes from 'prop-types';

function SectionHeading(props){
  var headingStyles = {
    borderRadius: '0.5rem',
    boxSizing: 'border-box',
    backgroundColor: '#222',
    fontFamily: 'Tangerine, cursive',
    fontSize: '3rem',
    color: '#eee',
    width: '100%',
    padding: '2%',
  };
  return (
    <div style={headingStyles}>
      <div>{props.legend}</div>
    </div>
  );
}

SectionHeading.propTypes = {
  legend: PropTypes.string
};

export default SectionHeading;