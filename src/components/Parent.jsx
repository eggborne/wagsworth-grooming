import React from 'react';
import PropTypes from 'prop-types';

function Parent(props) {
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
      <h3>{props.firstNames[0]} &amp; {props.firstNames[1]} {props.lastName}</h3>
      <h3>{props.phoneNumbers[0]}</h3>
      <h3>Pets: {props.petIds[0]}, {props.petIds[1]}</h3>
      <h3>Next Appt: {props.nextApptId}</h3>
      <h3>Last Appt: {props.pastApptIds[0]}</h3>
      <p>Notes: <em>{props.notes}</em></p>
      <hr />
    </div>
  );
}

Parent.propTypes = {
  firstNames: PropTypes.arrayOf(PropTypes.string),
  lastName: PropTypes.string,
  address: PropTypes.string,
  email: PropTypes.string,
  phoneNumbers: PropTypes.arrayOf(PropTypes.string),
  petIds: PropTypes.arrayOf(PropTypes.number),
  nextApptId: PropTypes.number,
  pastApptIds: PropTypes.arrayOf(PropTypes.number),
  notes: PropTypes.string
};

export default Parent;