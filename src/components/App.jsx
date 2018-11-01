import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Intro from './Intro';
import AppointmentList from './AppointmentList';
import ParentList from './ParentList';
import PetList from './PetList';
import NewParentForm from './NewParentForm';
import { Switch, Route } from 'react-router-dom';

function App(){
  let shorterDimension = null;
  if (window.screen.availWidth < window.screen.availHeight) {
    shorterDimension = window.screen.availWidth;
  } else {
    shorterDimension = window.screen.availHeight;
  }
  var mainStyles = {
    fontFamily: 'Playfair Display, serif',
    minHeight: window.screen.availHeight - (shorterDimension*0.15),
    position: 'relative'
  };
  var displayTitle = 'Wagsworth Grooming Co.';
  return (
    <div style={mainStyles}>
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