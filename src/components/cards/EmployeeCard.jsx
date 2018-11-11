import React from 'react';
import PropTypes from 'prop-types';
var moment = require('moment');

function EmployeeCard(props) {
  let obj = props.entryObject;
  let timeInfo = displayTimeCreatedInfo(obj.dateCreated);
  return (
    <div style={props.style.div}>
      <style jsx>{`
        div:nth-child(2n) {
          background-color: var(--darkBg);
        }
        a {
          color: blue;
        }
      `}</style>
      <h2>{obj.firstName} {obj.lastName}</h2>
      <h3>{obj.role}</h3>
      <h3>{obj.phoneNumbers}</h3>
      <h3>{obj.email}</h3>
      <h3>Schedule: {obj.schedule}</h3>
      <h3>Upcoming Appt IDs: {displayAssociatedEntries(obj.upcomingApptIds)}</h3>
      <h3>Past Appt IDs: {displayAssociatedEntries(obj.pastApptIds)}</h3>
      <h3>Notes:</h3>
      <ul>
        {obj.notes.map((note, index) =>
          <li key={index}>{note}</li>
        )}
      </ul>
      <small style={props.style.small}>Created {timeInfo.dateCreated}</small><br />
      <small style={props.style.small}>({timeInfo.timeSinceCreated})</small><br />
      <small style={props.style.small}>Unique ID: {obj.id}</small>
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

EmployeeCard.propTypes = {
  style: PropTypes.object,
  entryObject: PropTypes.object,
  printAssociatedEntryLink: PropTypes.func
};

export default EmployeeCard;