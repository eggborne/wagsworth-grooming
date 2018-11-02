import React from 'react';
import Header from './Header';
import Footer from './Footer';
import SplashPage from './SplashPage';
import AppointmentList from './AppointmentList';
import ParentList from './ParentList';
import PetList from './PetList';
import NewEntryControl from './NewEntryControl';
import { Switch, Route } from 'react-router-dom';

function App(){
  let shorterDimension = null;
  if (window.innerWidth < window.innerHeight) {
    shorterDimension = window.innerWidth;
  } else {
    shorterDimension = window.innerHeight;
  }
  var displayTitle = 'Wagsworth Grooming Co.';
  var heightAdjusted = {
    minHeight: window.innerHeight - (shorterDimension*0.15)
  };
  return (
    <div style={heightAdjusted} id="main">
      <style jsx>{`
        #main {
          background-color: var(--darkAccent);
          font-family: Playfair Display; serif;
          position: relative
        }
        #padding-container {
          padding: 2%;
        }
      `}</style>
      <Header legend={displayTitle}/>
      <div id="padding-container">
        <Switch>
          <Route exact path='/' component={SplashPage} />
          <Route path='/pets' component={PetList} />
          <Route path='/parents' component={ParentList} />
          <Route path='/appointments' component={AppointmentList} />
          <Route path='/newentry' component={NewEntryControl} />
        </Switch>
      </div>
      <Footer legend={'footer'}/>
    </div>
  );
}

export default App;