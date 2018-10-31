import React from 'react';
import PropTypes from 'prop-types';

function Appointment(props){
  
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
      <h3>Pet ID: {props.petId}</h3>
      <h3>Time: {props.startTime}</h3>
      <h3>Services:</h3>
      <h4>{props.services[0]}</h4>
      <h4>{props.services[1]}</h4>
      <p><em>Notes: {props.notes}</em></p>
      <hr />
    </div>
  );
}

Appointment.propTypes = {
  petId: PropTypes.number,
  startTime: PropTypes.number,
  services: PropTypes.arrayOf(PropTypes.string),
  notes: PropTypes.arrayOf(PropTypes.string)
};

export default Appointment;