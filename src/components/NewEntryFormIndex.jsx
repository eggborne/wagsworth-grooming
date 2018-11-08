import React from 'react';
import NewParentForm from './NewParentForm';
import NewPetForm from './NewPetForm';
import NewAppointmentForm from './NewAppointmentForm';
import NewEmployeeForm from './NewEmployeeForm';
import PropTypes from 'prop-types';

const formComponentNames = {
  parents: NewParentForm,
  pets: NewPetForm,
  appointments: NewAppointmentForm,
  employees: NewEmployeeForm,
};

const formStyle = {
  div: {
    marginTop: '2.5%',
    padding: '2.5%',
    boxSizing: 'border-box',
    background: '#ded',
    textAlign: 'center',
    borderRadius: '0.5rem'
  },
  form: {
    width: '100%',
  },
  input: {
    width: '40%',
    margin: '1%',
    padding: '1%',
    marginBottom: '5%'
  }
};

function NewEntryFormIndex(props) {
  let FormToShow = formComponentNames[props.type];
  return (
    <FormToShow style={formStyle}
      type={props.type}
      onFormSubmission={props.onFormSubmission} />
  );
}

NewEntryFormIndex.propTypes = {
  style: PropTypes.string,
  type: PropTypes.string,
  onFormSubmission: PropTypes.func,
};

export default NewEntryFormIndex;