import React from 'react';
import PropTypes from 'prop-types';
var moment = require('moment');

function ParentCard(props) {
  let obj = props.entryObject;
  let timeInfo = displayTimeCreatedInfo(obj.dateCreated);
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
        a {
          color: blue;
        }
      `}</style>
      <h3>{obj.firstName} {obj.lastName}</h3>
      <h3>{obj.phoneNumber}</h3>
      <h3>Pet IDs: {displayAssociatedEntries(obj.petIds)}</h3>
      <h3>Upcoming Appt IDs: {displayAssociatedEntries(obj.upcomingApptIds)}</h3>
      <h3>Past Appt IDs: {displayAssociatedEntries(obj.pastApptIds)}</h3>
      <p>Notes: <em>{obj.notes}</em></p>
      <small>Created {timeInfo.dateCreated}</small><br />
      <small>({timeInfo.timeSinceCreated})</small><br />
      <small>Unique ID: {obj.id}</small>
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
  entryObject: PropTypes.object,
};

export default ParentCard;