import style from '../css/styles.css';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ListIndex from './ListIndex';
import NewEntryFormIndex from './NewEntryFormIndex';
var uuid = require('uuid/v1');
var moment = require('moment');
import { Switch, Route } from 'react-router-dom';

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
      }
    };

    this.printEntryLink = this.printEntryLink.bind(this);
    this.addToLocalList = this.addToLocalList.bind(this);
    this.saveNewEntryToDatabase = this.saveNewEntryToDatabase.bind(this);
    this.getList = this.getList.bind(this);
    this.getEntryById = this.getEntryById.bind(this);
    this.getEntryByLastName = this.getEntryByLastName.bind(this);
    this.getEntryByPetName = this.getEntryByPetName.bind(this);
    this.handleEntryFormRequest = this.handleEntryFormRequest.bind(this);
    this.handleSubmittingNewEntry = this.handleSubmittingNewEntry.bind(this);
    this.handleSwitchSectionView = this.handleSwitchSectionView.bind(this);
    this.handleHamburgerClick = this.handleHamburgerClick.bind(this);
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
    
  }

  addToLocalList(listType, newEntryArray) {
    let origLists = this.state.lists;
    let newLists = Object.assign({}, origLists);

    newEntryArray.forEach((entryObject) => {
      // convert strings to arrays if needed
      for (let prop in entryObject) {
        let val = entryObject[prop];
        if (val[0] === '[') {
          val = val.slice(1, val.length - 1);
          val = val.split(',');
        } else if (val.length === 0) {
          val = [];
        }
        entryObject[prop] = val;
      }
      // record entry as id:entry
      newLists[listType][entryObject.id] = entryObject;
      
    });
    this.setState({
      lists: newLists,
    });
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
      if (type==='employees') {
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
        (`${key} NOT in local ${type} list!`);
        if (!end) {
          this.getEntryById(type, key, end);
          return;
        }
      } else {
        output = 'No id passed';
      }
    }
    return output;
  }

  getEntryById(listType, id) {
    new Promise(
      (resolve) => {
        $.ajax({
          type: 'get',
          url: 'https://www.eggborne.com/scripts/getentrybyid.php',
          data: {
            listType: listType,
            id: id,
          },
          success: (response) => {
            let newEntryObj = JSON.parse(response);
            resolve([listType,newEntryObj]);
          },
          error: function () {
            
          }
        });
      }
    ).then((val) => {
      this.addToLocalList(val[0], [val[1]]);
    }).catch(() => {
      
    });
  }

  getEntryByLastName(listType, lastName) {
    new Promise(
      (resolve) => {
        $.ajax({
          type: 'get',
          url: 'https://www.eggborne.com/scripts/getentrybylastname.php',
          data: {
            listType: listType,
            lastName: lastName,
          },
          success: (response) => {
            if (response) {
              let newEntryObj = JSON.parse(response);
              resolve([listType, newEntryObj]);
            }
          },
          error: function () {
            
          }
        });
      }
    ).then((val) => {
      this.addToLocalList(val[0], [val[1]]);
    }).catch(() => {
      
    });
  }
  getEntryByPetName(listType, petName) {
    new Promise(
      (resolve) => {
        $.ajax({
          type: 'get',
          url: 'https://www.eggborne.com/scripts/getentrybypetname.php',
          data: {
            listType: listType,
            petName: petName,
          },
          success: (response) => {
            if (response) {
              let newEntryObj = JSON.parse(response);
              resolve([listType, newEntryObj]);
            }
          },
          error: function () {
            
          }
        });
      }
    ).then((val) => {
      this.addToLocalList(val[0], [val[1]]);
    }).catch(() => {
      
    });
  }
  
  getList(listType, start, limit) {
    new Promise(
      (resolve) => {
        $.ajax({
          type: 'get',
          url: 'https://www.eggborne.com/scripts/getlists.php',
          data: {
            listType: listType,
            start: start,
            limit: limit
          },
          success: (response) => {
            let newEntryArray = JSON.parse(response);
            resolve([listType,newEntryArray]);
          }
        });
      }
    ).then((val) => {
      this.addToLocalList(val[0], val[1]);
    }).catch(() => {
      
    });
    // return promise;
  }

  componentDidMount() {
    // this.getList('employees');
    // this.getList('parents');
    // this.getList('pets');
    // this.getList('appointments');

    // this.getEntryById('parents','f134ae10-e3d9-11e8-8982-5fccabf17114')
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

  handleSubmitSearch(event, searchTerm, searchList) {
    event.preventDefault();
    searchTerm = searchTerm.split(' ');
    if (searchList === 'parents') {
      this.getEntryByLastName(searchList, searchTerm[0]);
    } else if (searchList === 'pets') {
      this.getEntryByPetName(searchList, searchTerm[0]);
    } else if (searchList === 'appointments') {
      // stuff
    }
  }

  handleEntryFormRequest(type) {
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
      lastSectionSelected: oldSection
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
          lists={this.state.lists} />
        <div id='padding-container'>
          <Switch>
            <Route exact path='/' render={() => <ListIndex section={'splashPage'} />} />
            <Route path='/parents' render={() => <ListIndex section={'parents'}
              lastSectionSelected={this.state.lastSectionSelected}
              handleUpdateListFromDB={this.getList}
              lists={this.state.lists}
              printEntryLink={this.printEntryLink}
              onRequestNewEntryForm={this.handleEntryFormRequest}
              newFormRequested={this.state.newFormRequested}
              onSubmitNewEntryForm={this.handleSubmittingNewEntry} />} />
            <Route path='/pets' render={() => <ListIndex section={'pets'}
              lastSectionSelected={this.state.lastSectionSelected}
              handleUpdateListFromDB={this.getList}
              lists={this.state.lists}
              printEntryLink={this.printEntryLink}
              onRequestNewEntryForm={this.handleEntryFormRequest}
              newFormRequested={this.state.newFormRequested}
              onSubmitNewEntryForm={this.handleSubmittingNewEntry} />} />
            <Route path='/appointments' render={() => <ListIndex section={'appointments'}
              lastSectionSelected={this.state.lastSectionSelected}
              handleUpdateListFromDB={this.getList}
              lists={this.state.lists}
              printEntryLink={this.printEntryLink}
              onRequestNewEntryForm={this.handleEntryFormRequest}
              newFormRequested={this.state.newFormRequested}
              onSubmitNewEntryForm={this.handleSubmittingNewEntry} />} />
            <Route path='/employees' render={() => <ListIndex section={'employees'}
              lastSectionSelected={this.state.lastSectionSelected}
              handleUpdateListFromDB={this.getList}
              lists={this.state.lists}
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