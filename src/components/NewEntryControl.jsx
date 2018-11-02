import React from 'react';
import NewEntrySelectionScreen from './NewEntrySelectionScreen';
import NewParentForm from './NewParentForm';
import NewPetForm from './NewPetForm';
import NewAppointmentForm from './NewAppointmentForm';

class NewEntryControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newEntryTypeChosen: undefined
    };
    this.handleNewEntryRequest = this.handleNewEntryRequest.bind(this);
    this.handleNewEntrySubmission = this.handleNewEntrySubmission.bind(this);
  }

  handleNewEntryRequest(chosenType) {
    console.log('new ' + chosenType);
    this.state.newEntryTypeChosen = chosenType;
    console.log('chosenType came in handleNewEntryReq as ' + chosenType);
    console.log('newEntryTypeChosen is ' + this.state.newEntryTypeChosen);
  }

  handleNewEntrySubmission() {
    this.state.newEntryTypeChosen = undefined;
    console.log('onParentFormSubmission called handleNewEntrySubmission!! newEntryTypeChosen is now ' + this.state.newEntryTypeChosen);
  }

  render() {
    let currentlyVisibleContent = null;
    if (this.state.newEntryTypeChosen) {
      if (this.state.newEntryTypeChosen === 'parent') {
        currentlyVisibleContent = <NewParentForm />;

      } else if (this.state.newEntryTypeChosen === 'pet') {
        currentlyVisibleContent = <NewPetForm />;

      } else if (this.state.newEntryTypeChosen === 'appointment') {
        currentlyVisibleContent = <NewAppointmentForm />;

      }
    } else {
      currentlyVisibleContent = <NewEntrySelectionScreen onNewEntrySelection={this.handleNewEntryRequest} />;
    }
    return (
      <div>
        {currentlyVisibleContent}
      </div>
    );
  }
}

export default NewEntryControl;