import React from 'react';
import PropTypes from 'prop-types';

function NewEmployeeForm(props) {

  let _role = null;
  let _firstName = null;
  let _lastName = null;
  let _phoneNumbers = null;
  let _email = null;
  let _notes = null;
  
  function handleEmployeeFormSubmission(event) {
    event.preventDefault();
    props.onFormSubmission({
      role: _role.value,
      firstName: _firstName.value,
      lastName: _lastName.value,
      phoneNumbers:  `[${_phoneNumbers.value}]`,
      email: _email.value,
      notes:  `[${_notes.value}]`,
      petIds: [],     
      upcomingApptIds: [],     
      pastApptIds: []   
    },props.type);

    window.location.hash = '#/employees';
  }

  return (
    <div style={props.style.div}>
      <h3>New {props.type[0].toUpperCase()}{props.type.slice(1,props.type.length-1)}</h3>
      <form  style={props.style.form} onSubmit={handleEmployeeFormSubmission}>
        <input style={props.style.input}
          ref={(input) => {_role = input;}}
          type='text'
          id='role'
          placeholder='Role' />
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
          ref={(input) => {_phoneNumbers = input;}}
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

NewEmployeeForm.propTypes = {
  style: PropTypes.object,
  type: PropTypes.string,
  onFormSubmission: PropTypes.func
};

export default NewEmployeeForm;