import React from 'react';
import NewParentForm from './forms/NewParentForm';
import NewPetForm from './forms/NewPetForm';
import NewAppointmentForm from './forms/NewAppointmentForm';
import NewEmployeeForm from './forms/NewEmployeeForm';
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
    borderRadius: '0.5rem',
    border: '2px solid grey',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    alignContent: 'center'
  },
  input: {
    padding: '0.5rem',
    fontSize: '1.25rem',
    margin: '0.5rem',
  },
  formButtonInput: {
    padding: '0.5rem',
    fontSize: '1.25rem',
    margin: '0.5rem',
    width: '80%'
  },
  formButtonRow: {
    display: 'inline-flex',
    justifyContent: 'space-between',
    // flexWrap: 'wrap'
  },
  button: {
    borderRadius: '0',
    margin: '0.5rem',
  },
  createButton: {
    padding: '1rem'
  }

};

function NewEntryFormIndex(props) {
  let formType = props.type;
  let FormToShow = formComponentNames[formType];
  return (
    <FormToShow style={formStyle}
      type={formType}
      onFormSubmission={props.onFormSubmission}
      lists={props.lists} />
  );
}

NewEntryFormIndex.propTypes = {
  type: PropTypes.string,
  onFormSubmission: PropTypes.func,
  lists: PropTypes.object
};

export default NewEntryFormIndex;