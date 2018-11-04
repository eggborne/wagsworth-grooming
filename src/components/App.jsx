import React from 'react';
import Header from './Header';
import Footer from './Footer';
import SplashPage from './SplashPage';
import EmployeeIndex from './EmployeeIndex';
import AppointmentIndex from './AppointmentIndex';
import ParentIndex from './ParentIndex';
import PetIndex from './PetIndex';
import NewEntryForm from './NewEntryForm';
import { Switch, Route } from 'react-router-dom';
var moment = require('moment');

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      currentlyAddingEntryType: null,
      masterEmployeeList: [
        {
          firstName: 'Regina',
          lastName: 'Falangy',
          phoneNumber: '360-867-5309',
          petIds: [1, 2],
          upcomingApptIds: [4],
          pastApptIds: [1,4],
          notes: 'Kind of snooty',
          schedule: 'TBD',
          formattedTimeSince: '',
          dateCreated: '2014-02-01'
        },
        {
          firstName: 'Larry',
          lastName: 'Johnson',
          phoneNumber: '360-936-5589',
          petIds: [3],
          upcomingApptIds: [5,6],
          pastApptIds: [2,3],
          notes: 'Fabulous tipper',
          schedule: 'TBD',
          formattedTimeSince: '',
          dateCreated: '1963-07-04'
        }
      ],
      masterParentList: [
        {
          firstName: 'Deborah',
          lastName: 'Watkins',
          phoneNumber: '360-867-5309',
          petIds: [1, 2],
          upcomingApptIds: [4],
          pastApptIds: [1,4],
          notes: 'Kind of snooty',
          formattedTimeSince: '(not user-created)',
          dateCreated: '2018-10-31'
        },
        {
          firstName: 'Marcus',
          lastName: 'Wellington',
          phoneNumber: '360-936-5589',
          petIds: [3],
          upcomingApptIds: [5,6],
          pastApptIds: [2,3],
          notes: 'Fabulous tipper',
          formattedTimeSince: '(not user-created)',
          dateCreated: '2018-06-18'
        }
      ],
      masterPetList: [
        {
          name: 'Megatron',
          sex: 'M',
          breed: ['Chihuahua', 'Pomeranian'],
          weight: 9,
          color: ['Black', 'Brown'],
          dob: 11092008,
          vaccinationDate: 6042018,
          vaccinationClinicId: 0,
          veterinarianId: 0,
          parentId: 1,
          notes: 'A good boy :)',
          formattedTimeSince: '(not user-created)',
          dateCreated: '2016-06-18'
        },
        {
          name: 'Cheddar Cheese',
          sex: 'F',
          breed: ['Beagle'],
          weight: 9,
          color: ['White', 'Gold'],
          dob: 8241980,
          vaccinationDate: 8092018,
          vaccinationClinicId: 1,
          veterinarianId: 1,
          parentId: 1,
          notes: 'Slobbers',
          formattedTimeSince: '(not user-created)',
          dateCreated: moment()
        },
        {
          name: 'Bob',
          sex: 'M',
          breed: ['Pitbull', 'Terrier'],
          weight: 65,
          color: ['White'],
          dob: 12251999,
          vaccinationDate: 10312008,
          vaccinationClinicId: 2,
          veterinarianId: 1,
          parentId: 2,
          notes: 'Sensitive pads',
          formattedTimeSince: '(not user-created)',
          dateCreated: moment()
        }
      ],
      masterAppointmentList: [
        {
          date: 10312018,
          petId: 1,
          startTime: 1530,
          services: ['Kennel cut #10', 'Nail filing'],
          notes: ['Shat on the table twice'],
          formattedTimeSince: '(not user-created)',
          dateCreated: moment()
        },
        {
          date: 11092017,
          petId: 3,
          startTime: 1000,
          services: ['Flea dip', 'Deluxe ball-washing'],
          notes: ['Fewer fleas than last time :D'],
          formattedTimeSince: '(not user-created)',
          dateCreated: moment()
        }
      ]
    };
    this.handleSubmittingNewEntry = this.handleSubmittingNewEntry.bind(this);
    this.updateTimeSinceEntriesCreated = this.updateTimeSinceEntriesCreated.bind(this);
  }

  handleSubmittingNewEntry(newEntryObj, type) {
    let listName = `master${type[0].toUpperCase() + type.slice(1, type.length)}List`;
    let newList = this.state[listName].slice();
    newEntryObj.formattedTimeSince = moment(newEntryObj.dateCreated).fromNow(true);
    newList.unshift(newEntryObj);
    this.setState({
      [listName]: newList,
    });
  }

  componentDidMount() {
    this.timeSinceEntryCreatedTimer = setInterval(() =>
      this.updateTimeSinceEntriesCreated(), 
    60000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timeSinceEntryCreatedTimer);
  }

  UNSAFE_componentWillMount() {
    // console.log('UNSAFE_componentWillMount');
  }

  UNSAFE_componentWillReceiveProps() {
    // console.log('UNSAFE_componentWillReceiveProps');
  }

  shouldComponentUpdate() {
    // console.log('shouldComponentUpdate');
    return true;
  }

  UNSAFE_componentWillUpdate() {
    // console.log('UNSAFE_componentWillUpdate');
  }

  componentDidUpdate() {
    // console.log('componentDidUpdate');
  }

  updateTimeSinceEntriesCreated() {
    let parsedPath = window.location.hash.split('#/').pop();
    if (['employees','parents','pets','appointments'].indexOf(parsedPath) > -1) {
      let listShowing = `master${parsedPath[0].toUpperCase()}${parsedPath.slice(1, -1)}List`;
      let updatedList = this.state[listShowing].slice();
      updatedList.forEach((entry) => {
        entry.formattedTimeSince = moment(entry.dateCreated).fromNow(true);
      });
      this.setState({
        [listShowing]: updatedList
      });
    }
  }

  render() {
    let shorterDimension = null;
    if (window.innerWidth < window.innerHeight) {
      shorterDimension = window.innerWidth;
    } else {
      shorterDimension = window.innerHeight;
    }
    var displayTitle = 'Wagsworth Grooming Co.';
    var heightAdjusted = {
      minHeight: window.innerHeight - (shorterDimension * 0.15)
    };
    return (
      <div style={heightAdjusted} id='main'>
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
        <Header type={displayTitle} />
        <div id='padding-container'>
          <Switch>
            <Route exact path='/' component={SplashPage} />
            <Route path='/parents' render={() => <ParentIndex type={'parent'} parentList={this.state.masterParentList} onNewEntryCreation={this.handleSubmittingNewEntry} />} />
            <Route path='/pets' render={() => <PetIndex petList={this.state.masterPetList} />} />
            <Route path='/appointments' render={() => <AppointmentIndex appointmentList={this.state.masterAppointmentList} />} />
            <Route path='/employees' render={() => <EmployeeIndex employeeList={this.state.masterEmployeeList} />} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;