import React from 'react';
import Header from './Header';
import Appointment from './Appointment';

var masterApptList = [
  {
    date: 10312018,
    petId: 1,
    startTime: 1530,
    services: ['Kennel cut #10', 'Nail filing'],
    notes: ['Shat on the table twice']
  },
  {
    date: 11092017,
    petId: 3,
    startTime: 1000,
    services: ['Flea dip', 'Deluxe ball-washing'],
    notes: ['Fewer fleas than last time :D']
  }
];

function AppointmentList() {
  return (
    <div>
      <Header legend={'Appointments'}/>
      {masterApptList.map((appt, index) =>
        <Appointment date={appt.date}
          petId={appt.petId}
          startTime={appt.startTime}
          services={appt.services}
          notes={appt.notes}
          key={index} />
      )}
    </div>
  );
}

export default AppointmentList;