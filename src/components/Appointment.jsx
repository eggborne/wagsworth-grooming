import React from "react";
import PropTypes from "prop-types";

function Appointment(props){
  return (
    <div id="header">
      <h3>{props.parentFirstName[0]} / {props.parentFirstName[1]} {props.parentLastName}</h3>
      <h3>{props.parentPhone[0]}</h3>
      <h3>{props.petName}</h3>
      <h3>{props.petBreed[0]} / {props.petBreed[1]}</h3>
      <h3>{props.apptTime} {props.apptDate}</h3>
      <p><em>{props.apptService[0]}</em></p>
      <p><em>{props.apptService[1]}</em></p>
    </div>
  );
}

Appointment.propTypes = {
  parentFirstName: PropTypes.arrayOf(PropTypes.string),
  parentLastName: PropTypes.string,
  parentPhone: PropTypes.arrayOf(PropTypes.string),
  petName: PropTypes.string,
  petBreed: PropTypes.arrayOf(PropTypes.string),
  apptTime: PropTypes.string,
  apptDate: PropTypes.string,
  apptService: PropTypes.arrayOf(PropTypes.string),
};

export default Appointment;