import React from 'react';
import PropTypes from 'prop-types';
var moment = require('moment');

function CardFooter(props) {
  let timeInfo = displayTimeCreatedInfo(props.creationDate);
  return (
    <div className='card-footer'>
      <div>Created {timeInfo.dateCreated} ({timeInfo.timeSinceCreated})</div><br />
      <div>#{props.entryId}</div>
    </div>
  );
}

function displayTimeCreatedInfo(dateCreated) {
  return {
    dateCreated: moment(dateCreated).format('MM/D/YY'),
    timeSinceCreated: moment(dateCreated).from(moment(), false)
  };
}

CardFooter.propTypes = {
  creationDate: PropTypes.string,
  entryId: PropTypes.string
};

export default CardFooter;