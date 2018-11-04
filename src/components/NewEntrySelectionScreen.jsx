import React from 'react';
import PropTypes from 'prop-types';

function NewEntrySelectionScreen(props) {

  return (
    <div>
      <style jsx>{`
        div {
          margin-top: 3%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          justify-items: center;
        }
        button {
          margin: 2.5%;
          font-size: 1.2rem;
          padding: 1rem;
        }
      `}</style>
      <button onClick={props.onNewEmployeeSelection}>New Employee</button>
      <button onClick={props.onNewParentSelection}>New Parent</button>
      <button onClick={props.onNewPetSelection}>New Pet</button>
      <button onClick={props.onNewAppointmentSelection}>New Appointment</button>
    </div>
  );

}

NewEntrySelectionScreen.propTypes = {
  onNewEmployeeSelection: PropTypes.func,
  onNewParentSelection: PropTypes.func,
  onNewPetSelection: PropTypes.func,
  onNewAppointmentSelection: PropTypes.func
};

export default NewEntrySelectionScreen;