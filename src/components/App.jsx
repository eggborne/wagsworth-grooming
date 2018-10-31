import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Intro from './Intro';
import AppointmentList from './AppointmentList';
import ParentList from './ParentList';
import PetList from './PetList';
import NewParentForm from './NewParentForm';
import { Switch, Route } from 'react-router-dom';
// const headerLegends = [
//   'Wagsworth Grooming Co.',
//   'Appointments',
//   'Parents',
//   'Pets'
// ];
function App(){
  var fontStyles = {
    fontFamily: 'Playfair Display, serif',
    fontSize: '1rem'
  };
  var displayTitle = 'Wagsworth Admin';
  return (
    <div style={fontStyles}>
      <style jsx>{`
        #padding-container {
          padding: 2%;
        }
      `}</style>
      <Header legend={displayTitle}/>
      <div id="padding-container">
        <Switch>
          <Route exact path='/' component={Intro} />
          <Route path='/pets' component={PetList} />
          <Route path='/parents' component={ParentList} />
          <Route path='/appointments' component={AppointmentList} />
          <Route path='/newparent' component={NewParentForm} />
        </Switch>
      </div>
      <Footer legend={'footer'}/>
    </div>
  );
}

export default App;