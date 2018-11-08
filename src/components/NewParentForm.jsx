import React from 'react';
import PropTypes from 'prop-types';
var moment = require('moment');

function NewParentForm(props) {

  let _firstName = null;
  let _lastName = null;
  let _phoneNumber = null;
  let _email = null;
  let _notes = null;
  
  function handleParentFormSubmission(event) {
    event.preventDefault();
    props.onFormSubmission({
      firstName: _firstName.value,
      lastName: _lastName.value,
      phoneNumber: _phoneNumber.value,
      email: _email.value,
      notes: _notes.value,
      petIds: [],     
      upcomingApptIds: [],     
      pastApptIds: [],     
      dateCreated: moment().format()
    },props.type);
  }
  return (
    <div style={props.style.div}>
      <h3>New {props.type[0].toUpperCase()}{props.type.slice(1,props.type.length-1)}</h3>
      <form style={props.style.form} onSubmit={handleParentFormSubmission}>
        <input style={props.style.input}
          ref={(input) => {_firstName = input;}}
          type='text'
          id='first-name'
          placeholder='First name' />
        <input style={props.style.input}
          ref={(input) => {_lastName = input;}}
          type='text'
          id='last-name'
          placeholder='Last name' />
        <input style={props.style.input}
          ref={(input) => {_phoneNumber = input;}}
          type='number'
          id='phone-number'
          placeholder='Phone number' />
        <input style={props.style.input}
          ref={(input) => {_email = input;}}
          type='text'
          id='email'
          placeholder='Email' />
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

NewParentForm.propTypes = {
  style: PropTypes.object,
  type: PropTypes.string,
  onFormSubmission: PropTypes.func,
};

export default NewParentForm;