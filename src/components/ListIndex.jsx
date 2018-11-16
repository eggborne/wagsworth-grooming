import React from 'react';
import SectionHeading from './SectionHeading';
import ParentCard from './cards/ParentCard';
import PetCard from './cards/PetCard';
import AppointmentCard from './cards/AppointmentCard';
import EmployeeCard from './cards/EmployeeCard';
import SplashPage from './SplashPage';
import PropTypes from 'prop-types';
// var moment = require('moment');
import axios from 'axios';


const getListingByParam = (listType, paramName, param) => axios({
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

const componentNames = {
  splashPage: SplashPage,
  parents: ParentCard,
  pets: PetCard,
  appointments: AppointmentCard,
  employees: EmployeeCard,
};

const cardStyle = {
  div: {
    padding: '2.5%',
    backgroundColor: 'var(--lightBg)',
    borderRadius: '0.5rem',
    border: '1px solid grey',
    marginTop: '2%',
    marginBottom: '2%'
  },
  small: {
    fontFamily: 'sans-serif',
    fontSize: '0.75rem'
  }
};

function compareValues(key, order = 'asc') {
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

class ListIndex extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      sortBy: 'asc',
    };

    this.slideIn = this.slideIn.bind(this);
    this.handleChangeSortBy = this.handleChangeSortBy.bind(this);
    this.handleChangeSortStyle = this.handleChangeSortStyle.bind(this);
  }

  componentDidMount() {
    if (this.props.section !== 'splashPage') {
      this.updateTimeSinceEntriesCreated();
    }
  }

  getListing(listType, paramName, param) {
    return getListingByParam(listType, paramName, param);
  }

  slideIn(speed, delay) {
    if (document.getElementById('main-list')) {
      document.getElementById('main-list').style.transition = 'none';
      document.getElementById('main-list').style.transform = 'translateX(20vw)';
      document.getElementById('main-list').style.opacity = '0';
      setTimeout(() => {
        if (document.getElementById('main-list')) {
          document.getElementById('main-list').style.transition = `all ${speed}ms ease`;
          document.getElementById('main-list').style.transform = 'translateX(0)';
          document.getElementById('main-list').style.opacity = '1';
        }
      }, delay);
    }
  }

  componentWillUnmount() {
    // clearInterval(this.timeSinceEntryCreatedTimer);
  }

  componentDidUpdate() {
    if (this.props.section !== this.props.lastSectionSelected) {
      this.slideIn(200, 50);
    }
  }

  convertTime(military) {
    var ampm = 'am';
    var hour = military.slice(0, 2);

    var min = military.slice(3, 5);
    if (min.length === 1) {
      min += '0';
    }
    if (hour === '00') {
      hour = '12';
    }
    if (parseInt(hour) > 12) {
      hour = (parseInt(hour) - 12).toString();
      ampm = 'pm';
    }
    if (hour[0] == '0') {
      hour = hour[1];
    }
    return `${hour}:${min} ${ampm}`;
  }

  updateTimeSinceEntriesCreated() {
    // let list = this.props.lists[this.props.section];
    // let updatedList = Object.entries(Object.assign({}, list));
    // updatedList.forEach((entry) => {
    //   entry.formattedTimeSince = moment(entry.dateCreated).fromNow(true);
    // });
    // this.setState({
    //   [this.props.section]: updatedList
    // });
  }

  handleChangeSortBy(event, sortStyle, returnOnly) {
    if (returnOnly) {
      let fullArr = Object.values(this.props.lists[this.props.section]);
      let newArr = [];
      newArr = fullArr.sort(compareValues('lastName', sortStyle));
      return newArr;
    } else {
      if (event.target.value.toLowerCase() === 'name') {
        // let fullArr = Object.values(this.props.lists[this.props.section]);
        // let newArr = [];
        // must add to prop instead??
        // newArr = fullArr.sort(compareValues('lastName', this.state.sortBy));
        this.setState({
          sortBy: sortStyle,
        });
      }
    }
  }

  handleChangeSortStyle(event, sortStyle) {
    Array.from(document.getElementsByName('sort-order')).map((sortRadios) => {
      if (sortRadios.value === sortStyle) {
        sortRadios.checked = true;
      } else {
        sortRadios.checked = false;
      }
    });
    // must add to prop instead??
    // let newArr = this.handleChangeSortBy(event, sortStyle, true);
    this.setState({
      sortBy: sortStyle,
    });
  }

  render() {
    let sec = this.props.section;
    let secHeading;
    if (sec === 'splashPage') {
      return (
        <SplashPage />
      );
    } else {
      if (sec === 'employees') {
        secHeading = <div></div>;
      } else {
        secHeading = <SectionHeading type={sec}
          onRequestNewEntryForm={this.props.onRequestNewEntryForm}
          onClickToUpdateList={this.props.handleUpdateListFromDB}
          onChangeSortBy={this.handleChangeSortBy}
          onChangeSortStyle={this.handleChangeSortStyle} />;
      }
      window.scrollTo(0, 0);
      let ComponentName = componentNames[sec];
      let listObj = this.props.lists[sec];
      let entriesToDisplay;
      if (!listObj) {
        entriesToDisplay = [];
      } else {
        if (this.props.displayList) {
          entriesToDisplay = Object.values(this.props.displayList);
        } else {
          entriesToDisplay = Object.values(listObj);
        }
        // appointments only have petIds, so need to find those pets' parentIds!
        if (this.props.section === 'appointments') {
          entriesToDisplay.map((entry) => {
            // if the appointment's pet is in the local list...
            if (this.props.lists.pets[entry.petId]) {
              // set appointment.parentId to that pet's parentId
              let pet = this.props.lists.pets[entry.petId];
              entry.parentId = pet.parent;
            }
          });
        }
      }
      return (
        <div>
          <style jsx>{`
            #main-list {
              // opacity: 0;
              // transition: all 600ms ease;
            }
          `}</style>
          {secHeading}
          <div id='main-list'>
            {entriesToDisplay.map((entry) =>
              <ComponentName key={entry.id}
                style={cardStyle}
                entryObject={entry}
                convertTime={this.convertTime}
                printAssociatedEntryLink={this.props.printEntryLink} />
            )}
          </div>
        </div>
      );
    }
  }
}

ListIndex.propTypes = {
  lists: PropTypes.object,
  displayList: PropTypes.object,
  section: PropTypes.string,
  lastSectionSelected: PropTypes.string,
  handleUpdateListFromDB: PropTypes.func,
  printEntryLink: PropTypes.func,
  onRequestNewEntryForm: PropTypes.func,
  onSubmitNewEntryForm: PropTypes.func,
  newFormRequested: PropTypes.string
};

export default ListIndex;