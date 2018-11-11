import React from 'react';
import PropTypes from 'prop-types';
var moment = require('moment');

function ParentCard(props) {
  let obj = props.entryObject;
  let timeInfo = displayTimeCreatedInfo(obj.dateCreated);
  return (
    <div style={props.style.div}>
      <style jsx>{`
      // div:nth-child(2n) {
      //   background-color: var(--darkBg);
      // }
      big {
        font-weight: bold;
      }
      a: {
        color: blue
      }
      a:visited {
        color: blue;
      }
    `}</style>
      <h2>{obj.lastName}</h2>
      <h3>{obj.firstNames.join(' & ')}</h3>
      <h3>Phone:</h3>
      <ul>
        {obj.phoneNumbers.map((number, i) =>
          <li key={i}>{number}</li>)}
      </ul>
      <h3>Pets:</h3>
      <ul>
        {obj.petIds.map((pet, index) =>
          <li key={index}><big><a href={'./#/pets'}>{props.printAssociatedEntryLink('pets',obj.petIds[index])}</a></big></li>
        )}
      </ul>
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

ParentCard.propTypes = {
  style: PropTypes.object,
  entryObject: PropTypes.object,
  printAssociatedEntryLink: PropTypes.func
};

export default ParentCard;