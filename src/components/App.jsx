import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ListIndex from './ListIndex';
var uuid = require('uuid/v1');
var moment = require('moment');
import { Switch, Route } from 'react-router-dom';

let phonyKeys = [
  uuid(),
  uuid({
    msecs: 100,
    nsecs: 3000
  }),
  uuid({
    msecs: 300,
    nsecs: 2000
  }),
  uuid({
    msecs: 340,
    nsecs: 6000
  }),
  uuid({
    msecs: 400,
    nsecs: 7500
  }),
  uuid({
    msecs: 500,
    nsecs: 3546
  }),
  uuid({
    msecs: 120,
    nsecs: 150
  }),
  uuid({
    msecs: 360,
    nsecs: 758
  }),
];

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      newFormRequested: null,
      lists: {
        employees: {
          [phonyKeys[5]]: {
            id: phonyKeys[5],
            firstName: 'Regina',
            lastName: 'Falangy',
            phoneNumber: '360-867-5309',
            upcomingApptIds: [4],
            pastApptIds: [1, 4],
            notes: 'Kind of snooty',
            schedule: 'TBD',
            formattedTimeSince: '',
            dateCreated: '2014-02-01'
          },
          [phonyKeys[6]]: {
            id: phonyKeys[6],
            firstName: 'Larry',
            lastName: 'Johnson',
            phoneNumber: '360-936-5589',
            upcomingApptIds: [5, 6],
            pastApptIds: [2, 3],
            notes: 'Fabulous tipper',
            schedule: 'TBD',
            formattedTimeSince: '',
            dateCreated: '1963-07-04'
          }
        },
        parents: {
          [phonyKeys[0]]: {
            id: phonyKeys[0],
            firstName: 'Deborah',
            lastName: 'Watkins',
            phoneNumber: '360-867-5309',
            petIds: [1, 2],
            upcomingApptIds: [4],
            pastApptIds: [1, 4],
            notes: 'Kind of snooty',
            formattedTimeSince: '(not user-created)',
            dateCreated: '2018-10-31'
          },
          [phonyKeys[1]]: {
            id: phonyKeys[1],
            firstName: 'Marcus',
            lastName: 'Wellington',
            phoneNumber: '360-936-5589',
            petIds: [3],
            upcomingApptIds: [5, 6],
            pastApptIds: [2, 3],
            notes: 'Fabulous tipper',
            formattedTimeSince: '(not user-created)',
            dateCreated: '2018-06-18'
          }
        },
        pets: {
          [phonyKeys[2]]: {
            id: phonyKeys[2],
            name: 'Megatron',
            sex: 'M',
            breed: 'Chihuahua / Pomeranian',
            weight: 9,
            color: 'Black / Brown',
            dob: moment().subtract(8, 'months').format(),
            vaccinationDate: 6042018,
            vaccinationClinic: 0,
            veterinarian: 0,
            parent: phonyKeys[0],
            notes: 'A good boy :)',
            formattedTimeSince: '(not user-created)',
            dateCreated: '2016-06-18'
          },
          [phonyKeys[3]]: {
            id: phonyKeys[3],
            name: 'Cheddar Cheese',
            sex: 'F',
            breed: 'Beagle',
            weight: 9,
            color: 'White / Gold',
            dob: moment().subtract(5, 'years').subtract(9, 'months').format(),
            vaccinationDate: 8092018,
            vaccinationClinic: 1,
            veterinarian: 1,
            parent: phonyKeys[0],
            notes: 'Slobbers',
            formattedTimeSince: '(not user-created)',
            dateCreated: moment().format()
          },
          [phonyKeys[4]]: {
            id: phonyKeys[4],
            name: 'Bob',
            sex: 'M',
            breed: 'Pitbull / Terrier',
            weight: 65,
            color: 'White',
            dob: moment().subtract(12, 'years').subtract(3, 'months').format(),
            vaccinationDate: 10312008,
            vaccinationClinic: 2,
            veterinarian: 1,
            parent: phonyKeys[1],
            notes: 'Sensitive pads',
            formattedTimeSince: '(not user-created)',
            dateCreated: moment().format()
          }
        },
        appointments: {
          'hgjhgf': {
            id: 'hgjhgf',
            employee: phonyKeys[6],
            date: 10312018,
            petId: 1,
            startTime: 1530,
            services: ['Kennel cut #10', 'Nail filing'],
            notes: ['Shat on the table twice'],
            formattedTimeSince: '(not user-created)',
            dateCreated: moment().format()
          },
          'yeuyeur': {
            id: 'yeuyeur',
            employee: phonyKeys[5],
            date: 11092017,
            petId: 3,
            startTime: 1000,
            services: ['Flea dip', 'Deluxe ball-washing'],
            notes: ['Fewer fleas than last time :D'],
            formattedTimeSince: '(not user-created)',
            dateCreated: moment().format()
          }
        }
      }
    };

    this.printEntryLink = this.printEntryLink.bind(this);
    this.cancelFormRequest = this.cancelFormRequest.bind(this);
    this.handleEntryFormRequest = this.handleEntryFormRequest.bind(this);
    this.cancelFormRequest = this.cancelFormRequest.bind(this);
    this.handleSubmittingNewEntry = this.handleSubmittingNewEntry.bind(this);
  }

  componentDidMount() { }
  componentWillUnmount() { }
  UNSAFE_componentWillMount() { }
  UNSAFE_componentWillReceiveProps() { }
  shouldComponentUpdate() { return true; }
  UNSAFE_componentWillUpdate() { }
  componentDidUpdate() { }

  printEntryLink(type, key) {
    let output;
    if (key) {
      let entryObj = this.state.lists[type][key];
      output = `${entryObj.firstName} ${entryObj.lastName}`;
    } else {
      output = 'Your Mama';
    }
    return output;
  }

  handleEntryFormRequest(type) {
    this.setState({
      newFormRequested: type
    });
  }

  handleSubmittingNewEntry(newEntryObj, type) {
    let origLists = this.state.lists;
    let newLists = Object.assign({}, origLists);
    newEntryObj.id = newEntryObj.id = uuid();
    newLists[type][newEntryObj.id] = newEntryObj;
    this.setState({
      lists: newLists,
      newFormRequested: null
    });
  }

  cancelFormRequest() {
    this.setState({
      newFormRequested: null
    });
  }

  render() {
    let shorterDimension = null;
    if (window.innerWidth < window.innerHeight) {
      shorterDimension = window.innerWidth;
    } else {
      shorterDimension = window.innerHeight;
    }
    const displayTitle = 'Wagsworth Grooming Co.';
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
        <Header displayTitle={displayTitle} />
        <div id='padding-container'>
          <Switch>
            <Route exact path='/' render={() => <ListIndex section={'splashPage'} />} />
            <Route path='/parents' render={() => <ListIndex section={'parents'}
              displayList={this.state.lists['parents']}
              printEntryLink={this.printEntryLink}
              onHandleEntryFormRequest={this.handleEntryFormRequest}
              newFormRequested={this.state.newFormRequested}
              onHandleSubmittingNewEntry={this.handleSubmittingNewEntry} />} />
            <Route path='/pets' render={() => <ListIndex section={'pets'}
              displayList={this.state.lists['pets']}
              printEntryLink={this.printEntryLink}
              onHandleEntryFormRequest={this.handleEntryFormRequest}
              newFormRequested={this.state.newFormRequested}
              onHandleSubmittingNewEntry={this.handleSubmittingNewEntry} />} />
            <Route path='/appointments' render={() => <ListIndex section={'appointments'}
              displayList={this.state.lists['appointments']}
              printEntryLink={this.printEntryLink}
              onHandleEntryFormRequest={this.handleEntryFormRequest}
              newFormRequested={this.state.newFormRequested}
              onHandleSubmittingNewEntry={this.handleSubmittingNewEntry} />} />
            <Route path='/employees' render={() => <ListIndex section={'employees'}
              displayList={this.state.lists['employees']}
              printEntryLink={this.printEntryLink}
              onHandleEntryFormRequest={this.handleEntryFormRequest}
              newFormRequested={this.state.newFormRequested}
              onHandleSubmittingNewEntry={this.handleSubmittingNewEntry} />} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;