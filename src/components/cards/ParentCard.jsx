import React from 'react';
import PropTypes from 'prop-types';
import CardFooter from './CardFooter';

function ParentCard(props) {
  if (!props.entryObject.id) {
    return (
      <div id='no-result-message'>NOTHING FOUND :(</div>
    );
  } else {
    let obj = props.entryObject;
    return (
      <div style={props.style.div}>
        <style jsx>{`
      // div:nth-child(2n) {
      //   background-color: var(--darkBg);
      // }
      big {
        font-weight: bold;
      }
      .smaller {
        color: var(--dark);
        font-size: 1rem;
      }
      a: {
        color: blue
      }
      a:visited {
        color: blue;
      }
      h4 {
        color: var(--dark);
      }
    `}</style>
        <div className='card-title'>
          <div>{obj.lastName}</div><div className='smaller'>{obj.firstNames.join(' & ')}</div>
        </div>
        <div className='card-panel-row'>
          <div className='info-area'>
            <i className='material-icons panel-icon'>phone</i>
            <ul className='panel-ul'>
              {obj.phoneNumbers.map((number, i) =>
                <li key={i}>{number}</li>)}
            </ul>
          </div>
          <div className='info-area'>
            <i className='material-icons panel-icon'>home</i>
            <ul className='panel-ul'>
              <li key={'01'}>{obj.address[0]}</li>
              <li key={'02'}>{obj.address[1]}, {obj.address[2]}</li>
              <li key={'03'}>{obj.address[3]}</li>
            </ul>
          </div>
        </div>
        <div className='list-info-area'>
          <div className='list-head'><i className='material-icons info-icon'>pets</i> <div>Pets</div></div>
          <div className='list-body'>
            <ul>
              {obj.petIds.map((pet, index) =>
                <li key={index}><big><a href={'./#/pets'}>{props.printAssociatedEntryLink('pets', pet)}</a></big></li>
              )}
            </ul>
          </div>
        </div>
        <div className='list-info-area'>
          <div className='list-head'><i className='material-icons info-icon'>event</i> <div>Appointments</div></div>
          <div className='list-body'>
            <ul>
              {obj.appointments.map((appt, index) =>
                <li key={index}><big><a href={'./#/appointments'}>{props.printAssociatedEntryLink('appointments', appt)}</a></big></li>
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



        {/* <h4>Notes:</h4>
        <ul>
          {obj.notes.map((note, index) =>
            <li key={index}>{note}</li>
          )}
        </ul> */}
        <CardFooter creationDate={obj.dateCreated}
          entryId={obj.id} />
      </div>
    );
  }

}

ParentCard.propTypes = {
  style: PropTypes.object,
  entryObject: PropTypes.object,
  printAssociatedEntryLink: PropTypes.func
};

export default ParentCard;