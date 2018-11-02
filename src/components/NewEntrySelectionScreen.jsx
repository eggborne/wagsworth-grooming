import React from 'react';
import PropTypes from 'prop-types';

function NewEntrySelectionScreen(props) {

  return (
    <div>
      <style jsx>{`
        div {
          margin-top: 8vmax;
          height: 70vmin;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-items: center;
          justify-content: space-around;
          align-items: center;
          background: lightbrown;
        }
        button {
          font-size: 1.2rem;
          padding: 1rem;
        }
      `}</style>
      <button onClick={props.onNewEntrySelection('parent')}>New Parent</button>
      <button onClick={props.onNewEntrySelection('pet')}>New Pet</button>
      <button onClick={props.onNewEntrySelection('appointment')}>New Appointment</button>
    </div>
  );

}

NewEntrySelectionScreen.propTypes = {
  onNewEntrySelection: PropTypes.func
};

export default NewEntrySelectionScreen;