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
            return {
              lastName: selfObj.lastName
            };
          },
          sortOptions: ['Last Name', 'Last Appt', 'Created'],
          searchParams: ['lastName'],
          defaultSortParam: 'lastName',
          associatedEntries: ['petIds', 'appointments'] // ids that need to be searched in their lists
        },
        pets: {
          dbAttributes: ['name', 'breed', 'sex', 'color', 'weight', 'dob', 'vaccinationDate', 'vaccinationClinic', 'veterinarian', 'parent', 'notes',],
          miniDisplayString: (selfObj) => {
            return {
              name: `${selfObj.name}`,
              breed: `${selfObj.breed.join('/')}`
            };
          },
          sortOptions: ['Name', 'Parent', 'Created'],
          searchParams: ['name'],
          defaultSortParam: 'name',
          associatedEntries: ['parent', 'appointments']
        },
        appointments: {
          dbAttributes: ['employeeId', 'petId', 'date', 'startTime', 'services', 'notes',],
          miniDisplayString: (selfObj) => {
            return {
              date: `${moment(selfObj.date).format('MMM DD, YYYY')}`,
              petId: `${this.printEntryLink('pets', selfObj.petId)}`,
              // petId: `${selfObj.petId}`,
              services: `${selfObj.services.join(', ')}`
            };
          },
          sortOptions: ['Date', 'Parent', 'Pet'],
          searchParams: ['name', 'lastName'],
          defaultSortParam: 'date',
          associatedEntries: ['employees', 'parents', 'pets']
        },
        employees: {
          dbAttributes: ['role', 'firstName', 'lastName', 'phoneNumbers', 'email', 'upcomingApptIds', 'pastApptIds', 'schedule', 'notes'],
          miniDisplayString: (selfObj) => {
            return {
              firstName: `${selfObj.firstName}`,
              lastName: `${selfObj.lastName}`
            };
          },
          defaultSortParam: 'lastName',
          associatedEntries: ['appointments']
        }
      }
    };

    this.getList(null, 'employees', 'lastName', true).then(() => {
      this.getList(null, 'parents', 'lastName').then((response) => {
        document.getElementsByClassName('search-list-tab')[0].style.opacity = '1';
        document.getElementsByClassName('search-list-tab')[0].style.pointerEvents = 'all';
      });
    }).then(() => {
      this.getList(null, 'pets', 'name').then((response) => {
        document.getElementsByClassName('search-list-tab')[1].style.opacity = '1';
        document.getElementsByClassName('search-list-tab')[1].style.pointerEvents = 'all';
      });
    }).then(() => {
      this.getList(null, 'appointments', 'date').then((response) => {
        document.getElementsByClassName('search-list-tab')[2].style.opacity = '1';
        document.getElementsByClassName('search-list-tab')[2].style.pointerEvents = 'all';
      });
    });

    this.arrayFromMultiObjectString = this.arrayFromMultiObjectString.bind(this);
    this.arrayFromString = this.arrayFromString.bind(this);
    this.handleChangeAscOrDesc = this.handleChangeAscOrDesc.bind(this);
    this.printEntryLink = this.printEntryLink.bind(this);
    this.addToLocalMasterList = this.addToLocalMasterList.bind(this);
    this.addToDisplayList = this.addToDisplayList.bind(this);
    this.saveNewEntryToDatabase = this.saveNewEntryToDatabase.bind(this);
    this.getList = this.getList.bind(this);
    this.getListingByParameter = this.getListingByParameter.bind(this);
    this.getAssociatedCalls = this.getAssociatedCalls.bind(this);
    this.handleEntryFormRequest = this.handleEntryFormRequest.bind(this);
    this.handleSubmittingNewEntry = this.handleSubmittingNewEntry.bind(this);
    this.handleSwitchSectionView = this.handleSwitchSectionView.bind(this);
    this.handleHamburgerClick = this.handleHamburgerClick.bind(this);
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
    this.renderRouteJSX = this.renderRouteJSX.bind(this);
  }

  getAssociatedCalls(listType, entryObj) {
    let assocCalls = [];
    this.state.entryAttributes[listType].associatedEntries.forEach((idType, i) => {
      let arr;
      if (entryObj[idType][0] === '[') {
        arr = this.arrayFromString(entryObj[idType]);
      } else {
        arr = [entryObj[idType]];
      }
      let list = `${idType.replace('Id', '')}`;
      if (list === 'parent') {
        list = 'parents';
      }
      arr.forEach((id, i) => {
        let prom = new Promise((resolve, reject) => {
          getListingByParam(list, 'id', id).then((response) => {
            calls++;
            console.warn('assoc getListingByParameter initiated call', calls);
            resolve([list, response]);
          });
        });
        assocCalls.push(prom);
      });
    });

    return [entryObj, assocCalls];
  }

  getListingByParameter(listType, paramName, param) {
    let initialCall = new Promise((resolve, reject) => {
      getListingByParam(listType, paramName, param).then((initialEntry) => {
        calls++;
        console.warn('initial getListingByParameter initiated call', calls);
        resolve(initialEntry);
      }).catch((reason) => {
        console.log('getListingByParameter rejected', reason);
      });
    });
    return initialCall;
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
    let output;
    if (!key) {
      // DB has empty field
      return 'no data passed';
    } else {
      // check localMasterList for associated entry
      if (!this.state.lists[type][key]) {
        // do nothing?
        return;
      } else {
        // get it from localMasterList
        let entryObj = Object.assign({}, this.state.lists[type][key]);
        output = Object.assign({}, this.state.entryAttributes)[type].miniDisplayString(entryObj);
      }
      if (output) {
        if (type === 'appointments') {
          if (callerCardObj && callerCardObj.name) { // came from PetCard
            // omit pet name (already in title of card)
            output = `${output.date}: ${output.services}`;
          } else {
            output = `${output.date}: ${output.petId} - ${output.services}`;
          }
        } else if (type === 'pets') {
          if (callerCardObj && (callerCardObj.lastName || callerCardObj.services)) {
            output = `${output.name} (${output.breed})`;
          } else {
            // came from a printEntryLink
            output = output.name;
          }
        } else if (type === 'employees') {
          output = `${output.firstName} ${output.lastName[0]}.`;
        } else if (type === 'parents') {
          output = `${output.lastName}`;
        }
        return output;
      } else {
        return 'loading...';
      }
    }
  }

  getList(event, listType, orderBy, addToDisplay) {
    console.warn(`getting ${listType} list`);
    orderBy = this.state.entryAttributes[listType].defaultSortParam;
    console.warn(` ordered by ${orderBy}`);
    if (event) {
      event.preventDefault();
    }
    let prom = new Promise((resolve) => {
      getFullList(listType, orderBy).then((response) => {
        let inc = 5;
        response.data.map((resp, i) => {
          this.addToLocalMasterList(listType, resp);
          setTimeout(() => {
            if (addToDisplay) {
              this.addToDisplayList(listType, resp);
            }
            if (i === response.data.length - 1) {
              resolve(`done with ${listType} list`);
            }
          }, inc);

          inc += 50;
        });
        calls++;
        console.warn(`call ${calls} called by getList for ${listType}`);
      });
    });
    return prom;
  }

  addToLocalMasterList(listType, newEntryInput) {
    console.log('ADDING ---------- ', listType, newEntryInput);
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
    let hamburgerStyle = document.getElementById('hamburger-container').style;
    if (!skipFade) {
      if (hamburgerStyle.opacity == 0) {
        hamburgerStyle.transition = 'height 300ms ease, opacity 600ms ease';
        hamburgerStyle.opacity = 1;
        hamburgerStyle.pointerEvents = 'all';
      } else {
        hamburgerStyle.transition = 'height 200ms ease, opacity 100ms ease';
        hamburgerStyle.opacity = 0;
        hamburgerStyle.pointerEvents = 'none';
      }
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

  arrayFromString(arrayString) {
    let newArr;
    if (arrayString[0] === '[') {
      // cut the brackets off the start and end
      newArr = arrayString.slice(1, arrayString.length - 1);
      // make an array split by commas
      newArr = newArr.split(',');
    } else if (arrayString.length === 0) {
      newArr = [];
    }
    return newArr;
  }

  handleSubmitSearch(event, searchList) {
    event.preventDefault();
    let searchTerm = event.target[0].value.split(' ');
    let param;
    let searching;
    if (searchList !== 'appointments') {
      param = this.state.entryAttributes[searchList].searchParams[0];
      searchTerm = searchTerm[0];
      this.getFullListing(searchList, param, searchTerm).then((response) => {
        this.addToDisplayList(searchList, response, true);
      });
    } else {
      // must look up pet/parent names for ID to search appointments with!
      param = this.state.entryAttributes[searchList].searchParams[0];
      searching = searchTerm[0]; // assumed to be a pet name first


    }
  }

  getFullListing(searchList, param, searchTerm) {
    // adds an entry to display list
    // adds its associated entries to master list
    return new Promise((resolve) => {
      this.getListingByParameter(searchList, param, searchTerm).then((initialEntry) => {
        console.log('resolved initial entry', initialEntry.data);
        return initialEntry;
      }).then((initialEntry) => {
        return this.getAssociatedCalls(searchList, initialEntry.data);
      }).then((assocCalls) => {
        console.log('CALLS', assocCalls);
        let orig = assocCalls[0];
        let callArray = assocCalls[1];
        callArray.map((call, i) => {
          call.then((response) => {
            console.log('assoc', i, response[1].data);
            this.addToLocalMasterList(response[0], response[1].data);
            if (i === callArray.length - 1) {
              resolve(assocCalls[0]);
            }
          });
        });
        this.addToLocalMasterList(searchList, orig);
      });
    });
  }

  handleSubmitSearch2(event, searchList) {
    // console.log('search event', event.target[0])
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

  renderRouteJSX(routeName, key) {
    return <Route key={key}
      path={`/${routeName}`} render={() => <ListIndex section={routeName}
        lastSectionSelected={this.state.lastSectionSelected}
        onChangeAscOrDesc={this.handleChangeAscOrDesc}
        handleUpdateListFromDB={this.getList}
        lists={this.state.lists}
        displayList={this.state.displayLists[routeName]}
        entryAttributes={this.state.entryAttributes}
        printEntryLink={this.printEntryLink}
        onRequestNewEntryForm={this.handleEntryFormRequest}
        newFormRequested={this.state.newFormRequested}
        onSubmitNewEntryForm={this.handleSubmittingNewEntry} />} />;
  }

  render() {

    let hamburgerMenu;
    let headerMenuSymbol;
    if (this.state.menuSummoned) {
      headerMenuSymbol = 'close';
    } else {
      headerMenuSymbol = 'menu';
    }

    let routeNames = Object.keys(this.state.entryAttributes);
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
          {hamburgerMenu}
          <Switch>
            <Route exact path='/' render={() => <ListIndex section={'splashPage'} />} />
            {routeNames.map((routeName, i) =>
              this.renderRouteJSX(routeName, i)
            )}
            <Route path='/newentry' render={() => <NewEntryFormIndex type={this.state.newFormRequested}
              onFormSubmission={this.handleSubmittingNewEntry}
              lists={this.state.lists} />} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;