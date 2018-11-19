import React from 'react';
import PropTypes from 'prop-types';
import CardFooter from './CardFooter';
import moment from 'moment';

function AppointmentCard(props) {
  let obj = props.entryObject;
  let employeeLink = props.printAssociatedEntryLink('employees', obj.employeeId);
  let parentLink = props.printAssociatedEntryLink('parents', obj.parentId);
  let petLink = props.printAssociatedEntryLink('pets', obj.petId, obj);
  return (
    <div className='card'>
      <div className='card-title'>
        <div>{moment(obj.date).format('MMM. DD, YYYY')}</div>
        <div>{props.convertTime(obj.startTime)}</div>
      </div>
      <div className='card-contents'>
        <h3>Employee: <a href={'./#/employees'}>{employeeLink}</a></h3>
        <h3>Parent: <a href={'./#/parents'}>{parentLink}</a></h3>
        <h3>Pet: <a href={'./#/pets'}>{petLink}</a></h3>
        <div className='list-info-area'>
          <div className='list-head'><i className='material-icons info-icon'>build</i> <div>Services</div></div>
          <div className='list-body'>
            <ul className='square-ul'>
              {obj.services.map((service, index) =>
                <li key={index}>{service}</li>
              )}
            </ul>
          </div>
        </div>
        <div className='list-info-area'>
          <div className='list-head'><i className='material-icons info-icon'>notes</i> <div>Notes</div></div>
          <div className='list-body'>
            <ul className='square-ul'>
              {obj.notes.map((note, index) =>
                <li key={index}>{note}</li>
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

AppointmentCard.propTypes = {
  entryObject: PropTypes.object,
  convertTime: PropTypes.func,
  printAssociatedEntryLink: PropTypes.func
};

export default AppointmentCard;