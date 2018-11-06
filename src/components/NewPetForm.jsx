import React from 'react';
import PropTypes from 'prop-types';
var moment = require('moment');

function NewPetForm(props) {

  let _name = null;
  let _sex = null;
  let _breed = null;
  let _weight = null;
  let _color = null;
  let _dob = null;
  let _vaccinationDate = null;
  let _vaccinationClinic = null;
  let _veterinarian = null;
  let _notes = null;
  
  function handlePetFormSubmission(event) {
    event.preventDefault();
    console.log(`NewPetForm submitting ${props.type} ${{
      name: _name.value,
      sex: _sex.value,
      breed: _breed.value,
      weight: _weight.value,
      color: _color.value,
      dob: _dob.value,
      notes: _notes.value,
      vaccinationDate: _vaccinationDate.value,
      vaccinationClinic: _vaccinationClinic.value,
      veterinarian: _veterinarian.value,
      dateCreated: moment().format()
    }}`);
    props.onFormSubmission({
      name: _name.value,
      sex: _sex.value,
      breed: _breed.value,
      weight: _weight.value,
      color: _color.value,
      dob: _dob.value,
      vaccinationDate: _vaccinationDate.value,
      vaccinationClinic: _vaccinationClinic.value,
      veterinarian: _veterinarian.value,
      dateCreated: moment().format()
    },props.type);
  }

  return (
    <div>
      <style jsx>{`
      div {
        margin-top: 2.5%;
        padding: 2.5%;
        box-sizing: border-box;
        background:#ded;
        text-align: center;
        border-radius: 0.5rem
      }
      form {
        width: 100%;
      }
      input {
        width: 40%;
        margin: 1%;
        padding: 1%;
        margin-bottom: 5%;
      }
    `}</style>
      <h3>New {props.type[0].toUpperCase()}{props.type.slice(1,props.type.length-1)}</h3>
      <form onSubmit={handlePetFormSubmission}>
        <input
          ref={(input) => {_name = input;}}
          type='text'
          id='name'
          placeholder='Name' />
        <input
          ref={(input) => {_breed = input;}}
          type='text'
          id='breed'
          placeholder='Breed' />
        <br />Sex: <select
          ref={(input) => {_sex = input;}}
          type='text'
          id='sex'>
          <option value=''>Sex</option>
          <option value='Female'>Female</option>
          <option value='Male'>Male</option>
        </select>
        <br />Color: <select
          ref={(input) => {_color = input;}}
          type='text'
          id='color'>
          <option value=''>Color</option>
          <option value='White'>White</option>
          <option value='Black'>Black</option>
          <option value='Brown'>Brown</option>
          <option value='Grey'>Grey</option>
        </select>
        <input
          ref={(input) => {_weight = input;}}
          type='number'
          id='weight'
          placeholder='Weight' />
        <input
          ref={(input) => {_dob = input;}}
          type='text'
          id='dob'
          placeholder='Date of Birth' />
        <input
          ref={(input) => {_vaccinationDate = input;}}
          type='number'
          id='vaccination-date'
          placeholder='Vaccination Date' />
        <input
          ref={(input) => {_vaccinationClinic = input;}}
          type='text'
          id='vaccination-clinic-id'
          placeholder='Vaccination Clinic' />
        <input
          ref={(input) => {_veterinarian = input;}}
          type='text'
          id='veterinary-clinic'
          placeholder='Veterinary Clinic' />
        <textarea
          ref={(input) => {_notes = input;}}
          type='text'
          id='notes'
          placeholder='Notes' />
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

NewPetForm.propTypes = {
  type: PropTypes.string,
  onFormSubmission: PropTypes.func,
};

export default NewPetForm;