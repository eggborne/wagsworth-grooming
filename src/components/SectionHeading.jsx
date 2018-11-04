import React from 'react';
import PropTypes from 'prop-types';

function SectionHeading(props) {

  let headerText = `${props.type[0].toUpperCase()}${props.type.slice(1,props.type.length)}s`;
  
  return (
    <div>
      <style jsx>{`
        a {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        button {
          font-size: 0.8rem;
        }
        div {
          border-radius: 0.5rem;
          background-color: #222;
          font-family: Tangerine, cursive;
          font-size: 2.25rem;
          color: #eee;
          width: 100%;
          padding: 4%;
          display: inline-flex;
          justify-content: space-between;
          align-items: center;
        }
      `}</style>
      {headerText}
      <button onClick={props.onClickToRequestForm}>Add new</button>
    </div>
  );
}

SectionHeading.propTypes = {
  type: PropTypes.string,
  onClickToRequestForm: PropTypes.func
};

export default SectionHeading;