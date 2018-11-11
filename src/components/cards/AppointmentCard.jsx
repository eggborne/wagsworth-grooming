import React from 'react';
import PropTypes from 'prop-types';
var moment = require('moment');

function AppointmentCard(props){
  let obj = props.entryObject;
  let timeInfo = displayTimeCreatedInfo(obj.dateCreated);
  return (
    <div style={props.style.div}>
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
      <h2>{moment(obj.date).format('MMM. DD, YYYY')} | {props.convertTime(obj.startTime)}</h2>
      <h3>Employee: <a href={'./#/employees'}>{props.printAssociatedEntryLink('employees',obj.employeeId)}</a></h3>
      <h3>Pet: <a href={'./#/pets'}>{props.printAssociatedEntryLink('pets',obj.petId)}</a></h3>
      <h3>Parent: <a href={'./#/parents'}>{props.printAssociatedEntryLink('parents',obj.parentId)}</a></h3>
      <h3>Services:</h3>
      <ul>
        {obj.services.map((service, index) =>
          <li key={index}>{service}</li>
        )}
      </ul>
      <p>Notes: <em>{obj.notes}</em></p>
      <small style={props.style.small}>Created {timeInfo.dateCreated}</small><br />
      <small style={props.style.small}>({timeInfo.timeSinceCreated})</small><br />
      <small style={props.style.small}>Unique ID: {obj.id}</small>
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
  style: PropTypes.object,
  entryObject: PropTypes.object,
  convertTime: PropTypes.func,
  printAssociatedEntryLink: PropTypes.func
};

export default AppointmentCard;