import React from 'react';
import PropTypes from 'prop-types';

function AppointmentCard(props){
  
  return (
    <div>
      <style jsx>{`
        div {
          padding: 2.5%;
          background-color: var(--lightBg);
        }
        div:nth-child(2n) {
          background-color: var(--darkBg);
        }
      `}</style>
      <h3>Date: {props.date}</h3>
      <h3>Pet ID: {props.petId}</h3>
      <h3>Time: {props.startTime}</h3>
      <h3>Services:</h3>
      <h4>{props.services[0]}</h4>
      <h4>{props.services[1]}</h4>
      <p><em>Notes: {props.notes}</em></p>
    </div>
  );
}

AppointmentCard.propTypes = {
  date: PropTypes.number,
  petId: PropTypes.number,
  startTime: PropTypes.number,
  services: PropTypes.arrayOf(PropTypes.string),
  notes: PropTypes.arrayOf(PropTypes.string)
};

export default AppointmentCard;