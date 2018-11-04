import React from 'react';
import SectionHeading from './SectionHeading';
import AppointmentCard from './AppointmentCard';
import PropTypes from 'prop-types';

function AppointmentIndex(props) {
  
  return (
    <div>
      <SectionHeading type={'appointment'}/>
      {props.appointmentList.map((appt, index) =>
        <AppointmentCard date={appt.date}
          petId={appt.petId}
          startTime={appt.startTime}
          services={appt.services}
          notes={appt.notes}
          key={index} />
      )}
    </div>
  );

}

AppointmentIndex.propTypes = {
  appointmentList: PropTypes.array
};

export default AppointmentIndex;