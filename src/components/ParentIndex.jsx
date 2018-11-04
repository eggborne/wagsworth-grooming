import React from 'react';
import SectionHeading from './SectionHeading';
import ParentCard from './ParentCard';
import PropTypes from 'prop-types';
import NewEntryForm from './NewEntryForm';


class ParentIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newFormRequested: null,
      newEntryToSubmit: null
    };
    this.handleEntryFormRequest = this.handleEntryFormRequest.bind(this);
    this.handleSubmittingNewEntry = this.handleSubmittingNewEntry.bind(this);
  }

  handleEntryFormRequest() {
    this.setState({
      newFormRequested: this.props.type
    });
  }

  handleSubmittingNewEntry(newEntryObj) {
    console.log('ParentIndex handling Form submissiogn!');
    console.log(newEntryObj)
    this.setState({
      newFormRequested: null,
      newEntryToSubmit: newEntryObj
    });
  }

  render() {
    if (this.state.newFormRequested) {
      return (
        <NewEntryForm type={this.props.type} 
        onFormSubmission={this.handleSubmittingNewEntry}
        />
      );
    } else {
      let parentsToDisplay = this.props.parentList;
      return (
        <div>
        <SectionHeading type={'parent'} 
          onClickToRequestForm={this.handleEntryFormRequest} />
        {parentsToDisplay.map((parent, index) =>
          <ParentCard key={index}
            firstName={parent.firstName}
            lastName={parent.lastName}
            phoneNumber={parent.phoneNumber}
            email={parent.email}
            notes={parent.notes}
            petIds={parent.petIds}
            upcomingApptIds={parent.upcomingApptIds}
            pastApptIds={parent.pastApptIds}
            dateCreated={parent.dateCreated}
            formattedTimeSince={parent.formattedTimeSince} />
        )}
        </div>
      );
    }
  }
}

ParentIndex.propTypes = {
  type: PropTypes.string,
  parentList: PropTypes.array,
  onNewEntryCreation: PropTypes.func
};

export default ParentIndex;