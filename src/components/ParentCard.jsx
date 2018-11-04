import React from 'react';
import PropTypes from 'prop-types';
var moment = require('moment');

function ParentCard(props) {
  let timeInfo = displayTimeCreatedInfo(props.dateCreated);
  return (
    <div>
      <style jsx>{`
        div {
          padding: 2.5%;
          background-color: var(--lightBg);
        }
        div:nth-child(2n) {
          background-color: var(--darkBg);
        }
        small {
          font-family: sans-serif;
          font-size: 0.75rem;
        }
      `}</style>
      <h3>{props.firstName} {props.lastName}</h3>
      <h3>{props.phoneNumber}</h3>
      <h3>Pet IDs: {displayAssociatedEntries(props.petIds)}</h3>
      <h3>Upcoming Appt IDs: {displayAssociatedEntries(props.upcomingApptIds)}</h3>
      <h3>Past Appt IDs: {displayAssociatedEntries(props.pastApptIds)}</h3>
      <p>Notes: <em>{props.notes}</em></p>
      <small>Created {timeInfo.dateCreated}</small><br />
      <small>({timeInfo.timeSinceCreated})</small>
    </div>
  );
}

function displayAssociatedEntries(propArr) {
  let arr = [];
  propArr.forEach((id) => {
    arr.push(id);
  });
  return arr.join(' / ');
}

function displayTimeCreatedInfo(dateCreated) {
  return {
    dateCreated: moment(dateCreated).format('MMMM Do YYYY'),
    timeSinceCreated: moment(dateCreated).from(moment(), false)
  };
}

ParentCard.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  address: PropTypes.string,
  email: PropTypes.string,
  phoneNumber: PropTypes.string,
  petIds: PropTypes.arrayOf(PropTypes.number),
  upcomingApptIds: PropTypes.arrayOf(PropTypes.number),
  pastApptIds: PropTypes.arrayOf(PropTypes.number),
  notes: PropTypes.string,
  formattedTimeSince: PropTypes.string,
  dateCreated: PropTypes.string
};

export default ParentCard;