import React from 'react';
import PropTypes from 'prop-types';
var moment = require('moment');

function AppointmentCard(props){
  let obj = props.entryObject;
  let timeInfo = displayTimeCreatedInfo(obj.dateCreated);
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
        small {
          font-family: sans-serif;
          font-size: 0.75rem;
        }
        a {
          color: blue;
        }
      `}</style>
      <h3>Employee: <a href={'./#/employees'}>{props.printAssociatedEntryLink('employees',obj.employee)}</a></h3>
      <h3>Pet ID: {obj.petId}</h3>
      <h3>Date: {obj.date}</h3>
      <h3>Time: {obj.startTime}</h3>
      <h3>Services:</h3>
      <ul>
        {obj.services.map((service, index) =>
          <li key={index}>{service}</li>
        )}
      </ul>
      <p>Notes: <em>{obj.notes}</em></p>
      <small>Created {timeInfo.dateCreated}</small><br />
      <small>({timeInfo.timeSinceCreated})</small><br />
      <small>Unique ID: {obj.id}</small>
    </div>
  );
}

function displayTimeCreatedInfo(dateCreated) {
  return {
    dateCreated: moment(dateCreated).format('MMMM Do YYYY'),
    timeSinceCreated: moment(dateCreated).from(moment(), false)
  };
}

AppointmentCard.propTypes = {
  entryObject: PropTypes.object,
  printAssociatedEntryLink: PropTypes.func
};

export default AppointmentCard;