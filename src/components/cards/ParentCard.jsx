import React from 'react';
import PropTypes from 'prop-types';
var moment = require('moment');

function ParentCard(props) {
  if (!props.entryObject.id) {
    return (
      <div id='no-result-message'>NOTHING FOUND :(</div>
    );
  } else {
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
            <li key={index}><big><a href={'./#/pets'}>{props.printAssociatedEntryLink('pets', pet)}</a></big></li>
          )}
        </ul>
        <h3>Appointments: </h3>
        <ul>
          {obj.appointments.map((appt, index) =>
            <li key={index}><a href={'./#/appointments'}>{props.printAssociatedEntryLink('appointments',appt)}</a></li>
          )}
        </ul>
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