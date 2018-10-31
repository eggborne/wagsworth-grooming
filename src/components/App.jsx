import React from 'react';
import Header from './Header';
import AppointmentList from './AppointmentList';
import ParentList from './ParentList';
import PetList from './PetList';
import NewParentForm from './NewParentForm';
import { Switch, Route } from 'react-router-dom';
const headerLegends = [
  'Wagsworth Grooming Co.',
  'Appointments',
  'Parents',
  'Pets'
];
function App(){
  var fontStyles = {
    fontFamily: 'Playfair Display, serif',
    fontSize: '1rem'
  };
  return (
    <div style={fontStyles}>
      <style jsx>{`
        #padding-container {
          padding: 2%;
        }
      `}</style>
      <Header legend={'Wagsworth Grooming Co.'}/>
      <div id="padding-container">
        <Switch>
          <Route exact path='/' component={PetList} />
          <Route path='/parents' component={ParentList} />
          <Route path='/appointments' component={AppointmentList} />
          <Route path='/newparent' component={NewParentForm} />
        </Switch>
      </div>
    </div>
  );
}

export default App;