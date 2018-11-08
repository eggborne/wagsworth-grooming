import React from 'react';
import SectionHeading from './SectionHeading';
import ParentCard from './ParentCard';
import PetCard from './PetCard';
import AppointmentCard from './AppointmentCard';
import EmployeeCard from './EmployeeCard';
import NewParentForm from './NewParentForm';
import NewPetForm from './NewPetForm';
import NewAppointmentForm from './NewAppointmentForm';
import NewEmployeeForm from './NewEmployeeForm';
import SplashPage from './SplashPage';
import PropTypes from 'prop-types';
import NewEntryFormIndex from './NewEntryFormIndex';
var moment = require('moment');

const componentNames = {
  splashPage: SplashPage,
  parents: ParentCard,
  pets: PetCard,
  appointments: AppointmentCard,
  employees: EmployeeCard,
  forms: {
    parents: NewParentForm,
    pets: NewPetForm,
    appointments: NewAppointmentForm,
    employees: NewEmployeeForm,
  }
};

class ListIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };

  }

  componentDidMount() {
    
    if (this.props.section !== 'splashPage') {
      this.updateTimeSinceEntriesCreated();
    }
    // this.timeSinceEntryCreatedTimer = setInterval(() =>
    //   this.updateTimeSinceEntriesCreated(), 
    //   1000
    // );
  }

  componentWillUnmount() {
    // clearInterval(this.timeSinceEntryCreatedTimer);
  }

  componentDidUpdate() {}

  updateTimeSinceEntriesCreated() {
    let list = this.props.displayList;
    let updatedList = Object.entries(Object.assign({}, list));
    updatedList.forEach((entry) => {
      entry.formattedTimeSince = moment(entry.dateCreated).fromNow(true);
    });
    this.setState({
      [this.props.section]: updatedList
    });
  }

  render() {
    const sec = this.props.section;
    let ComponentName;
    if (sec === 'splashPage') {
      return (
        <SplashPage />
      );
    } else if (this.props.newFormRequested) {
      window.scrollTo(0, 0);
      return (
        <NewEntryFormIndex type={this.props.newFormRequested}
          onFormSubmission={this.props.onHandleSubmittingNewEntry} />
      );
    } else {
      window.scrollTo(0, 0);
      ComponentName = componentNames[sec];
      let listObj = this.props.displayList;
      let entriesToDisplay;
      if (!listObj) {
        entriesToDisplay = [];
      } else {
        entriesToDisplay = Object.values(listObj).reverse();
      }
      return (
        <div>
          <SectionHeading type={sec}
            onClickToRequestForm={this.props.onHandleEntryFormRequest} />
          {entriesToDisplay.map((entry) =>
            <ComponentName key={entry.id}
              entryObject={entry}
              printAssociatedEntryLink={this.props.printEntryLink} />
          )}
        </div>
      );
    }
  }
}

ListIndex.propTypes = {
  section: PropTypes.string,
  displayList: PropTypes.object,
  printEntryLink: PropTypes.func,
  onHandleEntryFormRequest: PropTypes.func,
  onHandleSubmittingNewEntry: PropTypes.func,
  newFormRequested: PropTypes.string
};

export default ListIndex;