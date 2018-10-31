import React from 'react';
import PropTypes from 'prop-types';

function Pet(props) {
  return (
    <div>
      <style jsx>{`
        div {
          padding: 2.5%;
        }
        div:nth-child(2n) {
          background-color: #eee;
        }
      `}</style>
      <h2>{props.name}</h2>
      <h3>Breed: {props.breed} | Sex: {props.sex}</h3>
      <h3>Size: {props.size} | Weight: {props.weight}</h3>
      <h3>Color: {props.color}</h3>
      <h3>DOB: {props.dob}</h3>
      <h3>Vax date: {props.vaccinationDate}</h3>
      <h3>Vax clinic ID: {props.vaccinationClinicId}</h3>
      <h3>Vet clinic ID: {props.veterinarianId}</h3>
      <h3>Parent ID: {props.parentId}</h3>
      <p><em>Notes: {props.notes}</em></p>
      <hr />
    </div>
  );
}

Pet.propTypes = {
  name: PropTypes.string,
  sex: PropTypes.string,
  breed: PropTypes.arrayOf(PropTypes.string),
  size: PropTypes.string,
  weight: PropTypes.number,
  color: PropTypes.arrayOf(PropTypes.string),
  dob: PropTypes.number,
  vaccinationDate: PropTypes.number,
  vaccinationClinicId: PropTypes.number,
  veterinarianId: PropTypes.number,
  parentId: PropTypes.number,
  notes: PropTypes.string
};

export default Pet;