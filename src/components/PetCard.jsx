import React from 'react';
import PropTypes from 'prop-types';
var moment = require('moment');

function PetCard(props) {
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
      <h1>{props.name}</h1>
      <h3>Breed: {props.breed}</h3>
      <h3>Sex: {props.sex}</h3>
      <h3>Weight: {props.weight} | Color: {props.color}</h3>
      <h3>DOB: {props.dob}</h3>
      <h3>Vax date: {props.vaccinationDate}</h3>
      <h3>Vax clinic ID: {props.vaccinationClinic}</h3>
      <h3>Vet clinic ID: {props.veterinarian}</h3>
      <h3>Parents: <span onClick={() => props.showParent('parents',props.parentId)}>{props.parentId}</span></h3>
      <p><em>Notes: {props.notes}</em></p>
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

PetCard.propTypes = {
  name: PropTypes.string,
  sex: PropTypes.string,
  breed: PropTypes.string,
  weight: PropTypes.string,
  color: PropTypes.string,
  dob: PropTypes.string,
  vaccinationDate: PropTypes.string,
  vaccinationClinic: PropTypes.string,
  veterinarian: PropTypes.string,
  parentId: PropTypes.string,
  notes: PropTypes.string,
  dateCreated: PropTypes.string,
  showParent: PropTypes.func
};

export default PetCard;