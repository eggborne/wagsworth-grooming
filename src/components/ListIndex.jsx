import React from 'react';
import SectionHeading from './SectionHeading';
import ParentCard from './cards/ParentCard';
import PetCard from './cards/PetCard';
import AppointmentCard from './cards/AppointmentCard';
import EmployeeCard from './cards/EmployeeCard';
import SplashPage from './SplashPage';
import PropTypes from 'prop-types';
// var moment = require('moment');

const componentNames = {
  splashPage: SplashPage,
  parents: ParentCard,
  pets: PetCard,
  appointments: AppointmentCard,
  employees: EmployeeCard,
};

class ListIndex extends React.Component {

  constructor(props) {

    super(props);
    this.state = {

    };
    this.props.handleUpdateListFromDB(event,'employees', 'lastName');
    this.slideIn = this.slideIn.bind(this);
  }

  componentDidMount() {
    if (this.props.section !== 'splashPage') {
      this.updateTimeSinceEntriesCreated();
    }
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
    // if (this.props.section !== this.props.lastSectionSelected) {
    //   this.slideIn(200, 50);
    // }
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


  render() {
    let sec = this.props.section;
    let secHeading;
    let showingEntriesMessage;
    if (sec === 'splashPage') {
      return (
        <SplashPage />
      );
    } else {
      let ComponentName = componentNames[sec];
      let entriesToDisplay = Object.values(this.props.displayList);
      let totalEntries = Object.values(this.props.lists[this.props.section]);
      if (sec === 'employees') {
        secHeading = <div></div>;
      } else {
        if (entriesToDisplay.length) {
          showingEntriesMessage = <div id='showing-results-message'>Showing {entriesToDisplay.length} of {totalEntries.length} total entries</div>;
        }
        secHeading = <SectionHeading type={sec}
        entryAttributes={this.props.entryAttributes}
        onRequestNewEntryForm={this.props.onRequestNewEntryForm}
        onClickToUpdateList={this.props.handleUpdateListFromDB}
        onChangeSortBy={this.handleChangeSortBy}
        onChangeSortStyle={this.props.onChangeAscOrDesc} />;
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
      return (
        <div>
          {secHeading}
          {showingEntriesMessage}
          <div>
            {entriesToDisplay.map((entry) =>
              <ComponentName key={entry.id}
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
  entryAttributes: PropTypes.object,
  lastSectionSelected: PropTypes.string,
  handleUpdateListFromDB: PropTypes.func,
  onChangeAscOrDesc: PropTypes.func,
  printEntryLink: PropTypes.func,
  onRequestNewEntryForm: PropTypes.func,
  onSubmitNewEntryForm: PropTypes.func,
  newFormRequested: PropTypes.string
};

export default ListIndex;