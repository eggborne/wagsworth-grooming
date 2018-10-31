import React from 'react';
import Header from './Header';
import AppointmentList from './AppointmentList';
import ParentList from './ParentList';
import PetList from './PetList';

function App(){
  var fontStyles = {
    fontFamily: 'Playfair Display, serif',
    fontSize: '1rem'
  };
  return (
    <div style={fontStyles}>
      <Header legend={'Wagsworth Grooming Co.'}/>
      <br />
      <Header legend={'Appointments'}/>
      <AppointmentList/>
      <br />
      <Header legend={'Parents'}/>
      <ParentList/>
      <Header legend={'Pets'}/>
      <PetList/>
    </div>
  );
}

export default App;