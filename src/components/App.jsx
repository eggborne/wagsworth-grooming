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

function compareValues(key, order = '') {
  return function (a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }
    const varA = (typeof a[key] === 'string') ?
      a[key] : a[key];
    const varB = (typeof b[key] === 'string') ?
      b[key] : b[key];
    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order == 'desc') ? (comparison * -1) : comparison
    );
  };
}

let shorterDimension = null;
window.innerWidth < window.innerHeight
  ? shorterDimension = window.innerWidth
  : shorterDimension = window.innerHeight;

const heightAdjusted = {
  minHeight: window.innerHeight - (shorterDimension * 0.15)
};
const displayTitle = 'Wagsworth Grooming Co.';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newFormRequested: null,
      menuSummoned: false,
      lastSectionSelected: null,
      lists: { employees: {}, parents: {}, pets: {}, appointments: {} },
      displayLists: { employees: {}, parents: {}, pets: {}, appointments: {} },
      entryAttributes: {
        parents: {
          dbAttributes: ['lastName', 'firstNames', 'phoneNumbers', 'email', 'notes', 'petIds', 'upcomingApptIds', 'pastApptIds',],
          miniDisplayString: (selfObj) => {
            return [
              selfObj.lastName
            ];
          },
          sortOptions: ['Last Name', 'Last Appt', 'Created'],
          searchParams: ['lastName'],
          defaultSortParam: 'lastName'
        },
        pets: {
          dbAttributes: ['name', 'breed', 'sex', 'color', 'weight', 'dob', 'vaccinationDate', 'vaccinationClinic', 'veterinarian', 'parent', 'notes',],
          miniDisplayString: (selfObj) => {
            return [
              `${selfObj.name}`,
              `${ selfObj.breed.join('/') }`
            ];
          },
          sortOptions: ['Name', 'Parent', 'Created'],
          searchParams: ['name'],
          defaultSortParam: 'name'
        },
        appointments: {
          dbAttributes: ['employeeId', 'petId', 'date', 'startTime', 'services', 'notes',],
          miniDisplayString: (selfObj) => {
            return [
              `${moment(selfObj.date).format('MMM DD, YYYY')}`,
              // `${this.printEntryLink('pets', selfObj.petId, true)}`,
              `${selfObj.petId}`,
              `${selfObj.services.join(', ')}`
            ];
          },
          sortOptions: ['Date', 'Parent', 'Pet'],
          searchParams: ['name', 'lastName'],
          defaultSortParam: 'date'
        },
        employees: {
          dbAttributes: ['role', 'firstName', 'lastName', 'phoneNumbers', 'email', 'upcomingApptIds', 'pastApptIds', 'schedule', 'notes'],
          miniDisplayString: (selfObj) => {
            return [
              `${selfObj.firstName} ${selfObj.lastName[0].toUpperCase()}.`
            ];
          },
          defaultSortParam: 'lastName'
        }
      }
    };
    this.arrayFromMultiObjectString = this.arrayFromMultiObjectString.bind(this);
    this.handleChangeAscOrDesc = this.handleChangeAscOrDesc.bind(this);
    this.printEntryLink = this.printEntryLink.bind(this);
    this.addToLocalMasterList = this.addToLocalMasterList.bind(this);
    this.addToDisplayList = this.addToDisplayList.bind(this);
    this.saveNewEntryToDatabase = this.saveNewEntryToDatabase.bind(this);
    this.getList = this.getList.bind(this);
    this.handleEntryFormRequest = this.handleEntryFormRequest.bind(this);
    this.handleSubmittingNewEntry = this.handleSubmittingNewEntry.bind(this);
    this.handleSwitchSectionView = this.handleSwitchSectionView.bind(this);
    this.handleHamburgerClick = this.handleHamburgerClick.bind(this);
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
  }

  handleChangeAscOrDesc(event, sec, newSort) {
    let orderBy = this.state.entryAttributes[sec].defaultSortParam;
    let newArr = Object.values(this.state.displayLists[sec]).slice();
    newArr = newArr.sort(compareValues(orderBy, newSort));
    let newListObj = {};
    newArr.map((entry) => {
      newListObj[entry.id] = entry;
    });
    let dListsCopy = Object.assign({}, this.state.displayLists);
    dListsCopy[sec] = newListObj;
    this.setState({
      displayLists: dListsCopy
    });
    // set the proper radio button
    Array.from(document.getElementsByName('sort-order')).map((sortRadios) => {
      sortRadios.checked = (sortRadios.value === newSort);
    });
  }

  handleChangeSortByAttribute(event, sec, newSort) {
    let orderBy = this.state.entryAttributes[sec].defaultSortParam;
    let newArr = Object.values(this.state.displayLists[sec]).slice();
    newArr = newArr.sort(compareValues(orderBy, newSort));
    let newListObj = {};
    newArr.map((entry) => {
      newListObj[entry.id] = entry;
    });
    let dListsCopy = Object.assign({}, this.state.displayLists);
    dListsCopy[sec] = newListObj;
    this.setState({
      displayLists: dListsCopy
    });
    // set the proper radio button
    Array.from(document.getElementsByName('sort-order')).map((sortRadios) => {
      sortRadios.checked = (sortRadios.value === newSort);
    });
  }

  saveNewEntryToDatabase(tableName, newEntryObj) {

    // change this to use axios

    let dataObj = {
      tableName: tableName,
      uniqueId: uuid(),
      dateCreated: moment().format()
    };

    this.state.entryAttributes[tableName].dbAttributes.forEach((dataField) => {
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

  printEntryLink(type, key, callerCardObj) {

    // calls on entries from array an extra time
    // e.g. [Bobid, MegId] calls for Bob twice

    let output;
    if (!key) {
      // DB has empty field
      return 'no data passed';
    } else {
      // check localMasterList for associated entry
      if (!this.state.lists[type][key]) {
        // get it from DB
        getListingByParam(type, 'id', key).then((response) => {
          if (!this.state.lists[type][response.id]) {
            // add it to localMasterList
            this.addToLocalMasterList(type, response.data);
          }
          calls++;
          console.log(`call ${calls} called by printEntryLink for ${type} ${response.data.id}`);
        });

        return;
      } else {
        // get it from localMasterList
        let entryObj = Object.assign({}, this.state.lists[type][key]);
        output = this.state.entryAttributes[type].miniDisplayString(entryObj);
      }

      if (output) {
        if (type === 'appointments') {
          if (callerCardObj && callerCardObj.name) { // came from PetCard
            // omit pet name (already in title of card)
            output = `${output[0]}: ${output[2]}`;
          } else {
            output = `${output[0]}: ${this.printEntryLink('pets', output[1])} - ${output[2]}`;
          }
        } else if (type === 'pets') {
          if (callerCardObj && (callerCardObj.lastName || callerCardObj.services)) {
            output = `${output[0]} (${output[1]})`;
          } else {
            // came from a printEntryLink
            output = output[0];
          }
        }
        return output;
      } else {
        return 'loading...';
      }
    }
  }

  getList(event, listType, orderBy) {
    orderBy = this.state.entryAttributes[listType].defaultSortParam;
    console.warn(`getting ${listType} list ordered by ${orderBy}`);
    if (event) {
      event.preventDefault();
    }
    getFullList(listType, orderBy).then((response) => {
      let inc = 5;
      response.data.map((resp) => {
        setTimeout(() => {
          this.addToLocalMasterList(listType, resp);
          this.addToDisplayList(listType, resp);
        }, inc);
        inc += 500;
      });
      calls++;
      console.log(`call ${calls} called by getList for ${listType}`);
    });
  }

  addToLocalMasterList(listType, newEntryInput) {
    // let newLists = { ...this.state.lists }; // eslint doesn't like this
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
    newLists[listType][newEntryInput.id] = newEntryInput;
    this.setState({
      lists: newLists,
    });
  }

  addToDisplayList(listType, newEntryObj, replace) {
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

  arrayFromMultiObjectString(objectString) {
    let objectArray = [];
    let splitArr = objectString.split('}{');
    splitArr.forEach((apptString, i) => {
      let fullString;
      if (i === 0) {
        // only needs end bracket
        fullString = `${apptString}}`;
      } else if (i === splitArr.length - 1) {
        // only needs start bracket
        fullString = `{${apptString}`;
      } else {
        // needs both brackets
        fullString = `{${apptString}}`;
      }
      objectArray.push(JSON.parse(fullString));
    });
    return objectArray;
  }

  handleSubmitSearch(event, searchList) {
    event.preventDefault();
    let searchTerm = event.target[0].value.split(' ');
    let param;
    let searching;
    if (searchList !== 'appointments') {
      param = this.state.entryAttributes[searchList].searchParams[0];
      searching = searchTerm[0];
      getListingByParam(searchList, param, searching).then((response) => {
        if (typeof response.data !== 'object') {
          response.data = {};
        }
        // this.addToDisplayList(searchList, response.data, true) // to only show the result
        this.addToDisplayList(searchList, response.data);
        calls++;
      });
    } else {
      // must look up pet/parent names for ID to search appointments with!
      param = this.state.entryAttributes[searchList].searchParams[0];
      searching = searchTerm[0]; // assumed to be a pet name first
      getListingByParam('pets', param, searching).then((response) => {
        return response.data.id;
      }).then((petId) => {
        if (!petId) {
          throw searching;
        }
        getListingByParam('appointments', 'petId', petId).then((apptObj) => {
          if (!apptObj.data) {
            throw error;
          }
          if (typeof apptObj.data !== 'object') {
            // got multiple results as objs in one string
            let apptsToAdd = this.arrayFromMultiObjectString(apptObj.data);
            // clear appt display list
            let listsCopy = Object.assign({}, this.state.displayLists);
            listsCopy.appointments = {};
            this.setState({
              displayLists: listsCopy
            });
            // add new result appts
            apptsToAdd.map((appt) => {
              this.addToDisplayList(searchList, appt);
            });
          } else {
            let apptsToAdd = [apptObj.data];
            apptsToAdd.map((appt) => {
              this.addToDisplayList(searchList, appt, true);
            });
          }
        }).catch(() => {
          // search parent last names instead
          console.warn(`NO APPTS for valid existing pet ${searching} found!! Trying parent ${this.state.entryAttributes[searchList].searchParams[1]} instead...`);

          // (check in local first!!)
          param = this.state.entryAttributes[searchList].searchParams[1];
          getListingByParam('parents', 'lastName', searching).then((response) => {
            return response.data;
          }).then((parentObj) => {
            if (!parentObj) {
              throw searching;
            } else {
              parentObj.petIds = parentObj.petIds.slice(1, parentObj.petIds.length - 1);
              parentObj.petIds = parentObj.petIds.split(',');
              parentObj.petIds.map((petId) => {
                getListingByParam('appointments', 'petId', petId).then((response) => {
                  if (!response.data) {
                    throw petId;
                  } else if (typeof response.data !== 'object') {
                    response.data = this.arrayFromMultiObjectString(response.data);
                  } else {
                    response.data = [response.data];
                  }
                  // clear appt display list
                  let listsCopy = Object.assign({}, this.state.displayLists);
                  listsCopy.appointments = {};
                  this.setState({
                    displayLists: listsCopy
                  });
                  // add new result appts
                  response.data.map((appt) => {
                    this.addToDisplayList(searchList, appt);
                  });
                }).catch((petId) => {
                  console.warn(`NO APPTS with PETID ${petId} found!!`);
                });
              });
            }
          }).catch((searching) => {
            console.warn(`NO PARENT EXISTS ${searching}!!`);
          });
        });
      }).catch((searching) => {
        console.warn(`NO PET EXISTS ${searching}!! Trying parent ${this.state.entryAttributes[searchList].searchParams[1]} instead...`);
        // try parent lastname instead
        getListingByParam('parents', 'lastName', searching).then((response) => {
          return response.data;
        }).then((parentObj) => {
          if (!parentObj) {
            throw searching;
          } else {
            parentObj.petIds = parentObj.petIds.slice(1, parentObj.petIds.length - 1);
            parentObj.petIds = parentObj.petIds.split(',');
            parentObj.petIds.map((petId) => {
              getListingByParam('appointments', 'petId', petId).then((response) => {
                if (!response.data) {
                  throw petId;
                } else if (typeof response.data !== 'object') {
                  response.data = this.arrayFromMultiObjectString(response.data);
                } else {
                  response.data = [response.data];
                }
                // clear appt display list
                let listsCopy = Object.assign({}, this.state.displayLists);
                listsCopy.appointments = {};
                this.setState({
                  displayLists: listsCopy
                });
                // add new result appts
                response.data.map((appt) => {
                  this.addToDisplayList(searchList, appt);
                });
              }).catch((petId) => {
                console.warn(`NO APPTS with PETID ${petId} found!!`);
              });
            });
          }
        }).catch((searching) => {
          console.warn(`NO PARENT EXISTS ${searching} (tried after didn't find pet with name ${searching})!!`);
        });
      });
    }
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

    let hamburgerMenu;
    let headerMenuSymbol;
    if (this.state.menuSummoned) {
      headerMenuSymbol = 'close';
    } else {
      headerMenuSymbol = 'menu';
    }
    return (
      <div style={heightAdjusted} id='main'>
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
              onChangeAscOrDesc={this.handleChangeAscOrDesc}
              handleUpdateListFromDB={this.getList}
              lists={this.state.lists}
              displayList={this.state.displayLists.parents}
              entryAttributes={this.state.entryAttributes}
              printEntryLink={this.printEntryLink}
              onRequestNewEntryForm={this.handleEntryFormRequest}
              newFormRequested={this.state.newFormRequested}
              onSubmitNewEntryForm={this.handleSubmittingNewEntry} />} />
            <Route path='/pets' render={() => <ListIndex section={'pets'}
              lastSectionSelected={this.state.lastSectionSelected}
              onChangeAscOrDesc={this.handleChangeAscOrDesc}
              handleUpdateListFromDB={this.getList}
              lists={this.state.lists}
              displayList={this.state.displayLists.pets}
              entryAttributes={this.state.entryAttributes}
              printEntryLink={this.printEntryLink}
              onRequestNewEntryForm={this.handleEntryFormRequest}
              newFormRequested={this.state.newFormRequested}
              onSubmitNewEntryForm={this.handleSubmittingNewEntry} />} />
            <Route path='/appointments' render={() => <ListIndex section={'appointments'}
              lastSectionSelected={this.state.lastSectionSelected}
              onChangeAscOrDesc={this.handleChangeAscOrDesc}
              handleUpdateListFromDB={this.getList}
              lists={this.state.lists}
              displayList={this.state.displayLists.appointments}
              entryAttributes={this.state.entryAttributes}
              printEntryLink={this.printEntryLink}
              onRequestNewEntryForm={this.handleEntryFormRequest}
              newFormRequested={this.state.newFormRequested}
              onSubmitNewEntryForm={this.handleSubmittingNewEntry} />} />
            <Route path='/employees' render={() => <ListIndex section={'employees'}
              lastSectionSelected={this.state.lastSectionSelected}
              onChangeAscOrDesc={this.handleChangeAscOrDesc}
              handleUpdateListFromDB={this.getList}
              lists={this.state.lists}
              displayList={this.state.displayLists.employees}
              entryAttributes={this.state.entryAttributes}
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