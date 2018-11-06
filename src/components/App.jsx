import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ListIndex from './ListIndex';
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
          pastApptIds: [1, 4],
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
          upcomingApptIds: [5, 6],
          pastApptIds: [2, 3],
          notes: 'Fabulous tipper',
          schedule: 'TBD',
          formattedTimeSince: '',
          dateCreated: '1963-07-04'
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
          dateCreated: moment().format()
        },
        {
          date: 11092017,
          petId: 3,
          startTime: 1000,
          services: ['Flea dip', 'Deluxe ball-washing'],
          notes: ['Fewer fleas than last time :D'],
          formattedTimeSince: '(not user-created)',
          dateCreated: moment().format()
        }
      ]
    };
    this.updateTimeSinceEntriesCreated = this.updateTimeSinceEntriesCreated.bind(this);
  }

  componentDidMount() {
    // this.timeSinceEntryCreatedTimer = setInterval(() =>
    // this.updateTimeSinceEntriesCreated(), 
    // 60000
    // );
  }

  componentWillUnmount() {
    // clearInterval(this.timeSinceEntryCreatedTimer);
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
    console.log('updating times');
    let parsedPath = window.location.hash.split('#/').pop();
    if (['employees', 'parents', 'pets', 'appointments'].indexOf(parsedPath) > -1) {
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
            <Route exact path='/' render={() => <ListIndex type={'splash'} />} />
            <Route path='/parents' render={() => <ListIndex type={'parents'} />} />
            <Route path='/pets' render={() => <ListIndex type={'pets'} />} />
            <Route path='/appointments' render={() => <ListIndex type={'appointments'} />} />
            <Route path='/employees' render={() => <ListIndex type={'employees'} />} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;