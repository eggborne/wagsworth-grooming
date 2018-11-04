import React from 'react';
import PropTypes from 'prop-types';
var moment = require('moment');

function NewEntryForm(props) {
  
  let _firstName = null;
  let _lastName = null;
  let _phoneNumber = null;
  let _email = null;
  let _notes = null;
  function handleParentFormSubmission(event) {
    event.preventDefault();
    console.log(_firstName.value);
    console.log(_lastName.value);
    console.log(_phoneNumber.value);
    console.log(_email.value);
    console.log(_notes.value);
    props.onFormSubmission({
      firstName: _firstName.value,
      lastName: _lastName.value,
      phoneNumber: _phoneNumber.value,
      email: _email.value,
      notes: _notes.value,
      petIds: [12],     
      upcomingApptIds: [],     
      pastApptIds: [],     
      key: 255,
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
      <h3>New {props.type[0].toUpperCase()}{props.type.slice(1,props.type.length)}</h3>
      <form onSubmit={handleParentFormSubmission}>
        <input
          ref={(input) => {_firstName = input;}}
          type='text'
          id='first-name'
          placeholder='First name' />
        <input
          ref={(input) => {_lastName = input;}}
          type='text'
          id='last-name'
          placeholder='Last name' />
        <input
          ref={(input) => {_phoneNumber = input;}}
          type='number'
          id='phone-number'
          placeholder='Phone number' />
        <input
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




NewEntryForm.propTypes = {
  type: PropTypes.string,
  onFormSubmission: PropTypes.func,
  newEntryTypeChosen: PropTypes.string,
};

export default NewEntryForm;