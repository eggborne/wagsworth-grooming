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
      dateCreated: moment().format(),
      notes: _notes.value
    },props.type);
  }

  return (
    <div style={props.style.div}>
      <h3>New {props.type[0].toUpperCase()}{props.type.slice(1,props.type.length-1)}</h3>
      <form  style={props.style.form} onSubmit={handlePetFormSubmission}>
        <input style={props.style.input}
          ref={(input) => {_name = input;}}
          type='text'
          id='name'
          placeholder='Name' />
        <input style={props.style.input}
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
        <input style={props.style.input}
          ref={(input) => {_weight = input;}}
          type='number'
          id='weight'
          placeholder='Weight' />
        <input style={props.style.input}
          ref={(input) => {_dob = input;}}
          type='text'
          id='dob'
          placeholder='Date of Birth' />
        <input style={props.style.input}
          ref={(input) => {_vaccinationDate = input;}}
          type='number'
          id='vaccination-date'
          placeholder='Vaccination Date' />
        <input style={props.style.input}
          ref={(input) => {_vaccinationClinic = input;}}
          type='text'
          id='vaccination-clinic-id'
          placeholder='Vaccination Clinic' />
        <input style={props.style.input}
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
  style: PropTypes.object,
  type: PropTypes.string,
  onFormSubmission: PropTypes.func,
};

export default NewPetForm;