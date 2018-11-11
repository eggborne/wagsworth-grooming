import React from 'react';
import PropTypes from 'prop-types';

function NewAppointmentForm(props) {
  let _employeeId = null;
  let _petId = null;
  let _date = null;
  let _startTime = null;
  let _services = null;
  let _notes = null;

  let employeeList = Object.values(props.lists.employees);

  function handleAppointmentFormSubmission(event) {
    event.preventDefault();
    let foundId;
    employeeList.forEach((employee) => {
      if (employee.firstName === _employeeId.value.split(' ')[0] && employee.lastName === _employeeId.value.split(' ')[1]) {
        foundId = employee.id;
      }
    });

    props.onFormSubmission({
      employeeId: foundId,
      petId: _petId.value,
      date: _date.value,
      startTime: _startTime.value,
      services: `[${_services.value}]`,
      notes: `[${_notes.value}]`,
    },props.type);

    window.location.hash = '#/appointments';
  }

  return (
    <div style={props.style.div}>
      <h3>New {props.type[0].toUpperCase()}{props.type.slice(1,props.type.length-1)}</h3>
      <form  style={props.style.form} onSubmit={handleAppointmentFormSubmission}>
        <select style={props.style.input}
          ref={input => {_employeeId = input;}}
          type='text'
          id='employeeId'
          placeholder='Employee'>
          {employeeList.map((employee) => 
            <option key={employee.id}>{employee.firstName} {employee.lastName}</option>
          )}
        </select>
        <input style={props.style.input}
          ref={input => {_petId = input;}}
          type='text'
          id='petId'
          placeholder='Pet / Parent' />
        Date<input style={props.style.input}
          ref={input => {_date = input;}}
          type='date'
          id='date'
          placeholder='Date' />
        Time<input style={props.style.input}
          ref={input => {_startTime = input;}}
          type='time'
          id='startTime'
          placeholder='Time' />
        <input style={props.style.input}
          ref={input => {_services = input;}}
          type='text'
          id='services'
          placeholder='Services' />
        <input style={props.style.input}
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
  onFormSubmission: PropTypes.func,
  lists: PropTypes.object
};

export default NewAppointmentForm;