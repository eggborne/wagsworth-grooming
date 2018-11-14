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


class ListIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
    if (this.props.section !== 'splashPage') {
      this.props.handleUpdateListFromDB(this.props.section);
    }
    this.slideIn = this.slideIn.bind(this);
  }

  componentDidMount() {
    if (this.props.section !== 'splashPage') {
      this.updateTimeSinceEntriesCreated();
    }

  }

  slideIn(speed, delay) {
    setTimeout(() => {
      if (document.getElementById('main-list')) {
        document.getElementById('main-list').style.transition = 'none';
        document.getElementById('main-list').style.transform = 'translateX(20vw)';
        document.getElementById('main-list').style.opacity = '0';

        setTimeout(() => {
          document.getElementById('main-list').style.transition = `all ${speed}ms ease`;
          document.getElementById('main-list').style.transform = 'translateX(0)';
          document.getElementById('main-list').style.opacity = '1';
        }, delay);
      }
    }, 0);
  }

  componentWillUnmount() {

    // clearInterval(this.timeSinceEntryCreatedTimer);
  }

  componentDidUpdate() {

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
    if (this.props.section !== this.props.lastSectionSelected) {
      this.slideIn(200, 100);
    }
    const sec = this.props.section;
    if (sec === 'splashPage') {
      return (
        <SplashPage />
      );
    } else {
      window.scrollTo(0, 0);
      let ComponentName = componentNames[sec];
      let listObj = this.props.lists[this.props.section];
      let entriesToDisplay;
      if (!listObj) {
        entriesToDisplay = [];
      } else {
        entriesToDisplay = Object.values(listObj);
        if (this.props.section === 'appointments') {
          entriesToDisplay.map((entry) => {
            if (this.props.lists.pets[entry.petId]) {
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
              opacity: 0;
              transition: all 600ms ease;
              
            }
          `}</style>
          <SectionHeading type={sec}
            onRequestNewEntryForm={this.props.onRequestNewEntryForm}
            onClickToUpdateList={this.props.handleUpdateListFromDB} />
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
  section: PropTypes.string,
  lastSectionSelected: PropTypes.string,
  handleUpdateListFromDB: PropTypes.func,
  printEntryLink: PropTypes.func,
  onRequestNewEntryForm: PropTypes.func,
  onSubmitNewEntryForm: PropTypes.func,
  newFormRequested: PropTypes.string
};

export default ListIndex;