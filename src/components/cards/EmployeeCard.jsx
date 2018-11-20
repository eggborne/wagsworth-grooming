import React from 'react';
import PropTypes from 'prop-types';
import CardFooter from './CardFooter';

function EmployeeCard(props) {
  let obj = props.entryObject;
  let appointmentLinkArray = [];
  obj.appointments.map((appt, i) => {
    if (appointmentLinkArray[i] !== appt) {
      appointmentLinkArray.push(props.printAssociatedEntryLink('appointments', appt, obj));
    }
  });
  return (
    <div>
      <div className='card-title'>
        <div>{obj.firstName} {obj.lastName}</div>
      </div>
      <div className='card-contents'>
        <h3>{obj.role}</h3>
        <p></p>
        <div className='card-panel-row'>
          <div className='info-area'>
            <i className='material-icons panel-icon'>phone</i>
            <ul className='panel-ul'>
              {obj.phoneNumbers.map((number, i) =>
                <li key={i}>{number}</li>)}
            </ul>
            <br />
            <i className='material-icons panel-icon'>email</i>
            <ul className='panel-ul'>
              <li>{obj.email.split('@')[0]}<br />
                @{obj.email.split('@')[1]}</li>
            </ul>
          </div>
          <div className='info-area'>
            <i className='material-icons panel-icon'>home</i>
            {/* <ul className='panel-ul'>
              <li key={'01'}>{obj.address[0]}</li>
              <li key={'02'}>{obj.address[1]}, {obj.address[2]}</li>
              <li key={'03'}>{obj.address[3]}</li>
            </ul> */}
          </div>
        </div>
        <h3>Schedule: {obj.schedule}</h3>
        <div className='list-info-area'>
          <div className='list-head'><i className='material-icons info-icon'>event</i><div>Appointments</div></div>
          <div className='list-body'>
            <ul>
              {obj.appointments.map((appt, i) =>
                <li key={i}><big><a href={'./#/appointments'}>{appointmentLinkArray[i]}</a></big></li>
              )}
            </ul>
          </div>
        </div>
        <h3>Notes:</h3>
        <ul>
          {obj.notes.map((note, index) =>
            <li key={index}>{note}</li>
          )}
        </ul>


      </div>
      <CardFooter creationDate={obj.dateCreated}
        entryId={obj.id} />
    </div>
  );
}

EmployeeCard.propTypes = {
  style: PropTypes.object,
  entryObject: PropTypes.object,
  printAssociatedEntryLink: PropTypes.func
};

export default EmployeeCard;