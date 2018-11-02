import React from 'react';
import { Link } from 'react-router-dom';

class NewAppointmentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: false,
      pending: true
    };
    this.onAppointmentFormSubmission = this.onAppointmentFormSubmission.bind(this);
  }

  onAppointmentFormSubmission(event) {
    event.preventDefault();
    this.state.pending = false;
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
        <form onSubmit={this.onAppointmentFormSubmission}>
          <input
            type='text'
            id='first-name'
            placeholder='First name' />
          <input
            type='text'
            id='last-name'
            placeholder='Last name' />
          <input
            type='number'
            id='phone-number'
            placeholder='Phone number' />
          <input
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

export default NewAppointmentForm;