import React from 'react';
import PropTypes from 'prop-types';
import CardFooter from './CardFooter';
import moment from 'moment';

function PetCard(props) {
  if (!props.entryObject.id) {
    return (
      <div id='no-result-message'>NOTHING FOUND :(</div>
    );
  } else {
    let obj = props.entryObject;
    let parentLink = props.printAssociatedEntryLink('parents', obj.parent);
    // let parentLink = 'lastName';
    let appointmentLinkArray = [];
    obj.appointments.map((appt, i) => {
      if (appointmentLinkArray[i] !== appt) {
        appointmentLinkArray.push(props.printAssociatedEntryLink('appointments', appt, obj));
      }
    });
    return (
      <div className='card'>
        <div className='card-title'>
          <div>{obj.name}</div><a href='./#/parents'>{parentLink}</a>
        </div>
        <div className='card-contents'>
          <h3>Breed: {obj.breed.join(' / ')}</h3>
          <h3>Sex: {obj.sex}</h3>
          <h3>Weight: {obj.weight} | Color: {obj.color.join(' / ')}</h3>
          <h3>DOB: {moment(obj.dob).format('MMM DD, YYYY')}</h3>
          <div className='list-info-area'>
            <div className='list-head'><i className='material-icons info-icon'>local_hospital</i> <div>Vet info</div></div>
            <div className='list-body'>
              <div className='data-grid'>
                <div>Vet clinic</div><div>{obj.veterinarian}</div>
                <div>Vaccination clinic</div><div>{obj.vaccinationClinic}</div>
                <div>Due date</div><div>{moment(obj.vaccinationDate).format('MMM DD, YYYY')}</div>
              </div>
            </div>
          </div>
          <div className='list-info-area'>
            <div className='list-head'><i className='material-icons info-icon'>event</i> <div>Appointments</div></div>
            <div className='list-body'>
              <ul>
                {obj.appointments.map((appt, i) =>
                  <li key={i}><big><a href={'./#/appointments'}>{appointmentLinkArray[i]}</a></big></li>
                )}
              </ul>
            </div>
          </div>
          <div className='list-info-area'>
            <div className='list-head'><i className='material-icons info-icon'>notes</i> <div>Notes</div></div>
            <div className='list-body'>
              <ul className='square-ul'>
                {obj.notes.map((note, i) =>
                  <li key={i}>{note}</li>
                )}
              </ul>
            </div>
          </div>
        </div>
        <CardFooter creationDate={obj.dateCreated}
          entryId={obj.id} />
      </div>
    );
  }
}

PetCard.propTypes = {
  entryObject: PropTypes.object,
  printAssociatedEntryLink: PropTypes.func
};

export default PetCard;