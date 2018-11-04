import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class NewPetForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.handlePetFormSubmission = this.handlePetFormSubmission.bind(this);
  }

  handlePetFormSubmission(event) {
    event.preventDefault();
    console.log(this.firstName.value);
    console.log(this.lastName.value);
    console.log(this.phoneNumber.value);
    console.log(this.email.value);
    // this.state.pending = false;
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
        <h3>New Pet</h3>
        <form onSubmit={this.handlePetFormSubmission}>
          <input
            ref={input => this.name = input}
            type='text'
            id='name'
            placeholder='Name' />
          <input
            ref={input => this.breed = input}
            type='text'
            id='breed'
            placeholder='Breed' />
          <select
            ref={input => this.sex = input}
            type='number'
            id='sex'
            placeholder='Sex' />
          <input
            ref={input => this.weight = input}
            type='number'
            id='weight'
            placeholder='Weight' />
          <br />
          <Link to="/"><button type="submit">Create</button></Link>
        </form>
      </div>
    );
  }
}

NewPetForm.propTypes = {
  onPetFormSubmission: PropTypes.func
};

export default NewPetForm;