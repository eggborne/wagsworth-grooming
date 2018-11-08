import React from 'react';
import PropTypes from 'prop-types';
var moment = require('moment');

function NewAppointmentForm(props) {
  let _employee = null;
  let _date = null;
  let _time = null;
  let _services = null;
  let _notes = null;

  function handleAppointmentFormSubmission(event) {
    event.preventDefault();
    props.onFormSubmission({
      // employee: _employee.value,
      employee: _employee.value,
      date: _date.value,
      time: _time.value,
      services: [_services.value],
      notes: _notes.value,
      dateCreated: moment().format()
    },props.type);
  }

  return (
    <div style={props.style.div}>
      <h3>New {props.type[0].toUpperCase()}{props.type.slice(1,props.type.length-1)}</h3>
      <form  style={props.style.form} onSubmit={handleAppointmentFormSubmission}>
        <input style={props.style.input}
          ref={input => {_employee = input;}}
          type='text'
          id='employee'
          placeholder='Employee' />
        <input style={props.style.input}
          ref={input => {_date = input;}}
          type='number'
          id='date'
          placeholder='Date' />
        <input style={props.style.input}
          ref={input => {_time = input;}}
          type='number'
          id='time'
          placeholder='Time' />
        <input style={props.style.input}
          ref={input => {_services = input;}}
          type='text'
          id='services'
          placeholder='Services' />
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

NewAppointmentForm.propTypes = {
  style: PropTypes.object,
  type: PropTypes.string,
  onFormSubmission: PropTypes.func
};

export default NewAppointmentForm;