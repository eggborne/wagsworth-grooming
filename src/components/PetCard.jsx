import React from 'react';
import PropTypes from 'prop-types';
var moment = require('moment');

function PetCard(props) {
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
      `}</style>
      <h1>{obj.name}</h1>
      <h3>Breed: {obj.breed}</h3>
      <h3>Sex: {obj.sex}</h3>
      <h3>Weight: {obj.weight} | Color: {obj.color}</h3>
      <h3>DOB: {obj.dob}</h3>
      <h3>Vax date: {obj.vaccinationDate}</h3>
      <h3>Vax clinic ID: {obj.vaccinationClinic}</h3>
      <h3>Vet clinic ID: {obj.veterinarian}</h3>
      <h3>Parents: <a href={'./#/parents'}>{props.printParentLink('parents',obj.parent)}</a></h3>
      <p><em>Notes: {obj.notes}</em></p>
      <small>Created {timeInfo.dateCreated}</small><br />
      <small>({timeInfo.timeSinceCreated})</small>
    </div>
  );
}

// function displayAssociatedEntries(propArr) {
//   let arr = [];
//   propArr.forEach((id) => {
//     arr.push(id);
//   });
//   return arr.join(' / ');
// }

function displayTimeCreatedInfo(dateCreated) {
  return {
    dateCreated: moment(dateCreated).format('MMMM Do YYYY'),
    timeSinceCreated: moment(dateCreated).from(moment(), false)
  };
}

PetCard.propTypes = {
  entryObject: PropTypes.object,
  printParentLink: PropTypes.func
};

export default PetCard;