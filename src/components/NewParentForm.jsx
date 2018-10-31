import React from 'react';

function NewParentForm(){
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
        button {
          border-radius: 0.1rem;
          padding: 2%;
          margin-top: 2%
        }
        input {
          width: 40%;
          margin: 1%;
          padding: 1%;
        }
      `}</style>
      <form>
        <input
          type='text'
          id='first-name'
          placeholder='First name'/>
        <input
          type='text'
          id='last-name'
          placeholder='Last name'/>
        <input
          type='number'
          id='phone-number'
          placeholder='Phone number'/>
        <input
          type='text'
          id='email'
          placeholder='Email'/>
        <br />
        <button type='submit'>Submit!</button>
      </form>
    </div>
  );
}

export default NewParentForm;