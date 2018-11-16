import style from '../css/styles.css';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ListIndex from './ListIndex';
import NewEntryFormIndex from './NewEntryFormIndex';
var uuid = require('uuid/v1');
var moment = require('moment');
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

let calls = 0;

const getListingByParam = (listType, paramName, param) =>
  axios({
    method: 'get',
    url: `https://www.eggborne.com/scripts/getentryby${paramName.toLowerCase()}.php`,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
    },
    params: {
      listType: listType,
      [paramName]: param,
    }
  });

const getFullList = (listType, orderBy) =>
  axios({
    method: 'get',
    url: 'https://www.eggborne.com/scripts/getlists.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
    },
    params: {
      listType: listType,
      orderBy: orderBy,
    }
  });

const entryAttributes = {
  pets: [
    'name',
    'breed',
    'sex',
    'color',
    'weight',
    'dob',
    'vaccinationDate',
    'vaccinationClinic',
    'veterinarian',
    'parent',
    'notes',
  ],
  parents: [
    'lastName',
    'firstNames',
    'phoneNumbers',
    'email',
    'notes',
    'petIds',
    'upcomingApptIds',
    'pastApptIds',
  ],
  appointments: [
    'employeeId',
    'petId',
    'date',
    'startTime',
    'services',
    'notes',
  ],
  employees: [
    'role',
    'firstName',
    'lastName',
    'phoneNumbers',
    'email',
    'upcomingApptIds',
    'pastApptIds',
    'schedule',
    'notes'
  ]
};

const sectionSearchParams = {
  parents: 'lastName',
  pets: 'name',
  appointments: 'lastName'
};

let shorterDimension = null;
if (window.innerWidth < window.innerHeight) {
  shorterDimension = window.innerWidth;
} else {
  shorterDimension = window.innerHeight;
}
const displayTitle = 'Wagsworth Grooming Co.';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      newFormRequested: null,
      menuSummoned: false,
      lastSectionSelected: null,
      lists: {
        employees: {},
        parents: {},
        pets: {},
        appointments: {}
      },
      displayLists: {
        employees: {},
        parents: {},
        pets: {},
        appointments: {}
      }
    };

    this.printEntryLink = this.printEntryLink.bind(this);
    this.addToLocalList = this.addToLocalList.bind(this);
    this.addToDisplayList = this.addToDisplayList.bind(this);
    this.saveNewEntryToDatabase = this.saveNewEntryToDatabase.bind(this);
    this.getList = this.getList.bind(this);
    this.handleEntryFormRequest = this.handleEntryFormRequest.bind(this);
    this.handleSubmittingNewEntry = this.handleSubmittingNewEntry.bind(this);
    this.handleSwitchSectionView = this.handleSwitchSectionView.bind(this);
    this.handleHamburgerClick = this.handleHamburgerClick.bind(this);
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
  }

  saveNewEntryToDatabase(tableName, newEntryObj) {

    let dataObj = {
      tableName: tableName,
      uniqueId: uuid(),
      dateCreated: moment().format()
    };

    entryAttributes[tableName].forEach((dataField) => {
      dataObj[[dataField]] = newEntryObj[dataField];
    });

    $.ajax({
      type: 'post',
      url: `https://www.eggborne.com/scripts/saveentryto${tableName}.php`,
      data: dataObj,
      success: () => {
        this.getList(tableName);
      },
      error: () => {

      }
    });

  }

  printEntryLink(type, key, end) {
    let output;
    if (key && this.state.lists[type][key]) {
      let entryObj = this.state.lists[type][key];
      if (type === 'employees') {
        output = `${entryObj.firstName} ${entryObj.lastName}`;
      } else if (type === 'pets') {
        output = `${entryObj.name} ${this.printEntryLink('parents', entryObj.parent, true)}`;
      } else if (type === 'parents') {
        output = `${entryObj.lastName}`;
      } else if (type === 'appointments') {
        output = `${entryObj.date} - ${this.printEntryLink('pets', entryObj.petId, true)}`;
      }
    } else {
      if (key) {
        if (!end) {
          getListingByParam(type, 'id', key).then((response) => {
            this.addToDisplayList(type, response.data);
            calls++;
          });
          return;
        }
      } else {
        output = 'No id passed';
      }
    }
    if (output) {
      return output;
    } else {
      return 'loading...';
    }
  }

  getList(event, listType) {
    if (event) {
      event.preventDefault();
    }
    getFullList(listType, 'dateCreated').then((response) => {
      response.data.map((resp) => {
        this.addToDisplayList(listType, resp);
      });
      calls++;
    });
  }

  addToLocalList(listType, newEntryInput) {
    // let newLists = { ...this.state.lists }; // eslint doesn't like it
    let newLists = Object.assign({}, this.state.lists);
    for (let prop in newEntryInput) {
      let val = newEntryInput[prop];
      // check if it's a stringified array
      if (val[0] === '[') {
        // make it a real one
        val = val.slice(1, val.length - 1);
        val = val.split(',');
      } else if (val.length === 0) {
        val = [];
      }
      newEntryInput[prop] = val;
    }
    // record entry as id:entry

    // why does this change the actual state??
    newLists[listType][newEntryInput.id] = newEntryInput;

    // this.setState({
    //   lists: newLists,
    // });
  }

  addToDisplayList(listType, newEntryObj, replace) {
    if (!this.state.lists[listType][newEntryObj.id]) {
      console.warn(`adding ${newEntryObj} to ${listType} list, but also local list because it was not there`);
      this.addToLocalList(listType, newEntryObj);
    }
    let newLists = Object.assign({}, this.state.displayLists);
    for (let prop in newEntryObj) {
      let val = newEntryObj[prop];
      // check if it's a stringified array
      if (val[0] === '[') {
        // make it a real one
        val = val.slice(1, val.length - 1);
        val = val.split(',');
      } else if (val.length === 0) {
        val = [];
      }
      newEntryObj[prop] = val;
    }
    if (replace) {
      newLists[listType] = {};
    }
    newLists[listType][newEntryObj.id] = newEntryObj;
    this.setState({
      displayLists: newLists,
    });
  }

  componentDidMount() {

  }
  componentWillUnmount() { }
  UNSAFE_componentWillMount() { }
  UNSAFE_componentWillReceiveProps() { }
  shouldComponentUpdate() { return true; }
  UNSAFE_componentWillUpdate() { }
  componentDidUpdate() { }

  handleHamburgerClick(event, section, skipFade) {
    if (event) {
      event.preventDefault();
    }
    let newOpacity = 0;
    let hamburgerStyle = document.getElementById('hamburger-container').style;
    if (!skipFade) {
      if (hamburgerStyle.opacity == 0) {
        newOpacity = 1;
      }
      setTimeout(() => {
        hamburgerStyle.opacity = newOpacity;
      });
    }
    this.setState({
      menuSummoned: !this.state.menuSummoned,
      lastSectionSelected: section
    });
  }

  handleSubmitSearch(event, searchList) {
    event.preventDefault();
    let searchTerm = event.target[0].value.split(' ');
    let param;
    let searching;
    if (searchList !== 'appointments') {
      param = sectionSearchParams[searchList];
      searching = searchTerm[0];
    } else {
      // must look up parent/pet names for ID to search appointments with!
      param = 'id';
      searching = 'oldApptUniqueId';
    }
    getListingByParam(searchList, param, searching).then((response) => {
      if (typeof response.data !== 'object') {
        response.data = {};
      }
      // this.addToDisplayList(searchList, response.data, true) // to only show the result
      this.addToDisplayList(searchList, response.data);
      calls++;
    });
  }

  handleEntryFormRequest(event, type) {
    event.preventDefault();
    this.setState({
      newFormRequested: type
    });
    window.location.hash = '#/newentry';
  }

  handleSubmittingNewEntry(newEntryObj, type) {
    this.saveNewEntryToDatabase(type, newEntryObj);
  }

  handleSwitchSectionView(oldSection) {
    this.setState({
      lastSectionSelected: oldSection,
    });
  }

  render() {
    var heightAdjusted = {
      minHeight: window.innerHeight - (shorterDimension * 0.15)
    };
    let hamburgerMenu;
    let headerMenuSymbol;
    if (this.state.menuSummoned) {
      headerMenuSymbol = 'close';
    } else {
      headerMenuSymbol = 'menu';
    }
    return (
      <div style={heightAdjusted} id='main'>
        <style jsx>{`
          #main {
            background-color: var(--mainBg);
            font-family: Playfair Display; serif;
            position: relative
          }
          #padding-container {
            padding: 3%;
            padding-top: 0;
          }
        `}</style>
        <Header displayTitle={displayTitle}
          onClickHamburger={this.handleHamburgerClick}
          onSubmitSearch={this.handleSubmitSearch}
          onSwitchSectionView={this.handleSwitchSectionView}
          printEntryLink={this.printEntryLink}
          menuSymbol={headerMenuSymbol}
          lists={this.state.lists}
          callCount={calls} />
        <div id='padding-container'>
          <Switch>
            <Route exact path='/' render={() => <ListIndex section={'splashPage'} />} />
            <Route path='/parents' render={() => <ListIndex section={'parents'}
              lastSectionSelected={this.state.lastSectionSelected}
              handleUpdateListFromDB={this.getList}
              lists={this.state.lists}
              displayList={this.state.displayLists.parents}
              printEntryLink={this.printEntryLink}
              onRequestNewEntryForm={this.handleEntryFormRequest}
              newFormRequested={this.state.newFormRequested}
              onSubmitNewEntryForm={this.handleSubmittingNewEntry} />} />
            <Route path='/pets' render={() => <ListIndex section={'pets'}
              lastSectionSelected={this.state.lastSectionSelected}
              handleUpdateListFromDB={this.getList}
              lists={this.state.lists}
              displayList={this.state.displayLists.pets}
              printEntryLink={this.printEntryLink}
              onRequestNewEntryForm={this.handleEntryFormRequest}
              newFormRequested={this.state.newFormRequested}
              onSubmitNewEntryForm={this.handleSubmittingNewEntry} />} />
            <Route path='/appointments' render={() => <ListIndex section={'appointments'}
              lastSectionSelected={this.state.lastSectionSelected}
              handleUpdateListFromDB={this.getList}
              lists={this.state.lists}
              displayList={this.state.displayLists.appointments}
              printEntryLink={this.printEntryLink}
              onRequestNewEntryForm={this.handleEntryFormRequest}
              newFormRequested={this.state.newFormRequested}
              onSubmitNewEntryForm={this.handleSubmittingNewEntry} />} />
            <Route path='/employees' render={() => <ListIndex section={'employees'}
              lastSectionSelected={this.state.lastSectionSelected}
              handleUpdateListFromDB={this.getList}
              lists={this.state.lists}
              displayList={this.state.displayLists.employees}
              printEntryLink={this.printEntryLink}
              onRequestNewEntryForm={this.handleEntryFormRequest}
              newFormRequested={this.state.newFormRequested}
              onSubmitNewEntryForm={this.handleSubmittingNewEntry} />} />
            <Route path='/newentry' render={() => <NewEntryFormIndex type={this.state.newFormRequested}
              onFormSubmission={this.handleSubmittingNewEntry}
              lists={this.state.lists} />} />
          </Switch>
          {hamburgerMenu}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;