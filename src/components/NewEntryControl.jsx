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
    this.handleNewParentRequest = this.handleNewParentRequest.bind(this);
    this.handleNewPetRequest = this.handleNewPetRequest.bind(this);
    this.handleNewAppointmentRequest = this.handleNewAppointmentRequest.bind(this);
    this.handleNewEntrySubmission = this.handleNewEntrySubmission.bind(this);
  }

  handleNewParentRequest() {
    this.setState({newEntryTypeChosen: 'parent'});
  }

  handleNewPetRequest() {
    this.setState({newEntryTypeChosen: 'pet'});
  }

  handleNewAppointmentRequest() {
    this.setState({newEntryTypeChosen: 'appointment'});
  }

  handleNewEntrySubmission() {
    this.state.newEntryTypeChosen = undefined;
  }

  render() {
    let currentlyVisibleContent = null;
    if (this.state.newEntryTypeChosen === 'parent') {
      currentlyVisibleContent = <NewParentForm />;

    } else if (this.state.newEntryTypeChosen === 'pet') {
      currentlyVisibleContent = <NewPetForm />;

    } else if (this.state.newEntryTypeChosen === 'appointment') {
      currentlyVisibleContent = <NewAppointmentForm />;

    } else {
      currentlyVisibleContent = <NewEntrySelectionScreen
        onNewParentSelection={this.handleNewParentRequest}
        onNewPetSelection={this.handleNewPetRequest}
        onNewAppointmentSelection={this.handleNewAppointmentRequest} />;
    }
    return (
      <div>
        {currentlyVisibleContent}
      </div>
    );
  }
}

export default NewEntryControl;