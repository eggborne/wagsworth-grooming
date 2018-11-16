import React from 'react';
import PropTypes from 'prop-types';
var moment = require('moment');

function PetCard(props) {
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
          div:nth-child(2n) {
            background-color: var(--darkBg);
          }
          a {
            color: blue;
          }
        `}</style>
        <h2>{obj.name} <a href='./#/parents'>{props.printAssociatedEntryLink('parents', obj.parent)}</a></h2>
        <h3>Breed:</h3>
        <ul>
          {obj.breed.map((breed, i) =>
            <li key={i}>{breed}</li>
          )}
        </ul>
        <h3>Sex: {obj.sex}</h3>
        <h3>Weight: {obj.weight} | Color: {obj.color}</h3>
        <h3>DOB: {obj.dob}</h3>
        <h3>Vax date: {obj.vaccinationDate}</h3>
        <h3>Vax clinic: {obj.vaccinationClinic}</h3>
        <h3>Vet clinic: {obj.veterinarian}</h3>
        <h3>Appointments: </h3>
        <ul>
          {obj.appointments.map((appt, index) =>
            <li key={index}><big><a href={'./#/appointments'}>{props.printAssociatedEntryLink('appointments', appt)}</a></big></li>
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

PetCard.propTypes = {
  style: PropTypes.object,
  entryObject: PropTypes.object,
  printAssociatedEntryLink: PropTypes.func
};

export default PetCard;