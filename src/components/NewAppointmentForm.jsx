import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class NewAppointmentForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleAppointmentFormSubmission = this.handleAppointmentFormSubmission.bind(this);
  }

  handleAppointmentFormSubmission(event) {
    event.preventDefault();
    console.log(this.firstName.value);
    console.log(this.lastName.value);
    console.log(this.phoneNumber.value);
    console.log(this.email.value);
  }

  render() {
    return (
      <div>
        <style jsx>{`
        div {
          margin-top: 2.5%;
          padding: 2.5%;
          box-sizing: border-box;
          background:#ded;
          text-align: center;
          border-radius: 0.5rem
        }
        form {
          width: 100%;
        }
        input {
          width: 40%;
          margin: 1%;
          padding: 1%;
          margin-bottom: 5%;
        }
      `}</style>
        <h3>New Appointment</h3>
        <form onSubmit={this.handleAppointmentFormSubmission}>
          <input
            ref={input => this.firstName = input}
            type='text'
            id='first-name'
            placeholder='First name' />
          <input
            ref={input => this.lastName = input}
            type='text'
            id='last-name'
            placeholder='Last name' />
          <input
            ref={input => this.phoneNumber = input}
            type='number'
            id='phone-number'
            placeholder='Phone number' />
          <input
            ref={input => this.email = input}
            type='text'
            id='email'
            placeholder='Email' />
          <br />
          <Link to="/"><button type="submit">Create</button></Link>
        </form>
      </div>
    );
  }
}

NewAppointmentForm.propTypes = {
  onAppointmentFormSubmission: PropTypes.func
};

export default NewAppointmentForm;