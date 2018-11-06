import React from 'react';
import SectionHeading from './SectionHeading';
import ParentCard from './ParentCard';
import PetCard from './PetCard';
import NewParentForm from './NewParentForm';
import NewPetForm from './NewPetForm';
import SplashPage from './SplashPage';
import PropTypes from 'prop-types';
var uuid = require('uuid/v1');
var moment = require('moment');

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
  })
];

let cardStyle = `div {
  padding: 2.5%;
  background-color: var(--lightBg);
}
div:nth-child(2n) {
  background-color: var(--darkBg);
}
small {
  font-family: sans-serif;
  font-size: 0.75rem;
}`;

class ListIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newFormRequested: null,
      displayList: {
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
        }
      }
    };
    this.handleEntryFormRequest = this.handleEntryFormRequest.bind(this);
    this.handleSubmittingNewEntry = this.handleSubmittingNewEntry.bind(this);
    this.printEntryLink = this.printEntryLink.bind(this);
  }

  handleEntryFormRequest() {
    this.setState({
      newFormRequested: this.props.type
    });
  }

  handleSubmittingNewEntry(newEntryObj) {
    newEntryObj.key = newEntryObj.id = uuid();
    let newList = Object.assign({}, this.state.displayList);
    newList[this.props.type][newEntryObj.id] = newEntryObj;
    this.setState({
      displayList: newList,
      newFormRequested: null
    });
  }

  printEntryLink(type, key) {
    let output;
    if (key) {
      let entryObj = this.state.displayList[type][key];
      output = `${entryObj.firstName} ${entryObj.lastName}`;
    } else {
      output = 'Your Mama';
    }
    return output;
  }

  render() {
    window.scrollTo(0, 0);
    if (this.state.newFormRequested) {
      if (this.props.type === 'parents') {
        return (
          <NewParentForm type={this.props.type}
            onFormSubmission={this.handleSubmittingNewEntry}
          />
        );
      } else if (this.props.type === 'pets') {
        return (
          <NewPetForm type={this.props.type}
            onFormSubmission={this.handleSubmittingNewEntry}
          />
        );
      }
    } else {
      let listObj = this.state.displayList[`${this.props.type}`];
      let entriesToDisplay;
      if (!listObj) {
        entriesToDisplay = [];
      } else {
        entriesToDisplay = Object.values(listObj).reverse();
      }
      if (this.props.type === 'splash') {
        return (
          <SplashPage />
        );
      } else if (this.props.type === 'parents') {
        return (
          <div>
            <SectionHeading type={'parents'}
              onClickToRequestForm={this.handleEntryFormRequest} />
            {entriesToDisplay.map((entry) =>
              <ParentCard key={entry.id}
                entryObject={entry} />
            )}
          </div>
        );
      } else if (this.props.type === 'pets') {
        return (
          <div>
            <SectionHeading type={'pets'}
              onClickToRequestForm={this.handleEntryFormRequest} />
            {entriesToDisplay.map((entry) =>
              <PetCard key={entry.id}
                entryObject={entry}
                printParentLink={this.printEntryLink} />
            )}
          </div>
        );
      } else if (this.props.type === 'appointments') {
        return (
          <div>
            {this.props.type} not set up yet
          </div>
        );
      } else if (this.props.type === 'employees') {
        return (
          <div>
            {this.props.type} not set up yet
          </div>
        );
      }
    }
  }
}

ListIndex.propTypes = {
  type: PropTypes.string,
};

export default ListIndex;