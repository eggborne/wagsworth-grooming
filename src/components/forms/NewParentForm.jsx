import React from 'react';
import PropTypes from 'prop-types';

function NewParentForm(props) {

  let _firstNames = null;
  let _lastName = null;
  let _phoneNumbers = null;
  let _email = null;
  let _notes = null;

  function formatPhoneNumber() {
    let num = _phoneNumbers.value;
    num = num.replace(/\(/gi, '');
    num = num.replace(/\)/gi, '');
    num = num.replace(/-/gi, '');
    let output;
    if (num.length <= 3) {
      output = `(${num})`;
    } else if (num.length <= 6) {
      output = `(${num.slice(0,3)})-${num.slice(3,num.length)}`;
    } else if (num.length <= 10) {
      output = `(${num.slice(0,3)})-${num.slice(3,6)}-${num.slice(6,num.length)}`;
    } else {
      output = `(${num.slice(0,3)})-${num.slice(3,6)}-${num.slice(6,10)}`;
    }
    document.getElementById('phone-numbers').value = output;
  }

  function handleParentFormSubmission(event) {
    event.preventDefault();

    props.onFormSubmission({
      firstNames: `[${_firstNames.value}]`,
      lastName: _lastName.value,
      phoneNumbers: `[${_phoneNumbers.value}]`,
      email: _email.value,
      notes: `[${_notes.value}]`,
      petIds: '[]',
      upcomingApptIds: '[]',
      pastApptIds: '[]'
    }, props.type);

    window.location.hash = '#/parents';
  }
  return (
    <div style={props.style.div}>
      <h3>New {props.type[0].toUpperCase()}{props.type.slice(1, props.type.length - 1)}</h3>
      <form style={props.style.form} onSubmit={handleParentFormSubmission}>
        <input style={props.style.input}
          ref={(input) => { _firstNames = input; }}
          type='text'
          id='first-name'
          placeholder='First name' />
        <input style={props.style.input}
          ref={(input) => { _lastName = input; }}
          type='text'
          id='last-name'
          placeholder='Last name' />
        <input style={props.style.input}
          ref={(input) => { _phoneNumbers = input; }}
          onChange={formatPhoneNumber}
          type='tel'
          id='phone-numbers'
          placeholder='Phone number' />
        <input style={props.style.input}
          ref={(input) => { _email = input; }}
          type='text'
          id='email'
          placeholder='Email' />
        <input style={props.style.input}
          ref={(input) => { _notes = input; }}
          type='text'
          id='notes'
          placeholder='Add Note' />
        <br />
        <button type="submit" style={props.style.createButton}>Create</button>
      </form>
    </div>
  );
}


NewParentForm.propTypes = {
  style: PropTypes.object,
  type: PropTypes.string,
  onFormSubmission: PropTypes.func
};

export default NewParentForm;