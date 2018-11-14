import React from 'react';
import PropTypes from 'prop-types';

function SectionHeading(props) {
  // let headerText = `${props.type[0].toUpperCase()}${props.type.slice(1,props.type.length)}`;
  let headerText = '';
  let radius;
  if (props.type === 'employees') {
    radius = '0.5rem';
  } else {
    radius = '0rem 0.5rem 0.5rem 0.5rem';
  }
  return (
    <div>
      <style jsx>{`
        div {
          box-sizing:border-box;
          border-radius: 0.5rem;
          background-color: var(--dark);
          font-family: Tangerine, cursive;
          font-size: 2.25rem;
          color: var(--mainBg);
          width: 100%;
          padding: 2%;
          display: inline-flex;
          align-items: center;
          border-radius: ${radius};
        }
        #btns {
          display: inline-flex;
          justify-content: flex-end;
        }
        button {
          min-width: 5rem;
          padding: 0.5rem 0.2rem 0.5rem 0.2rem;
          font-size: 0.8rem;
          border-radius: 0.4rem;
          margin: 0.2rem;
          
        }
      `}</style>
      <div id='lbl'>{headerText}</div>
      <div id='btns'>
        <button onClick={() => props.onRequestNewEntryForm(props.type)}>Add new</button>
        <button onClick={() => props.onClickToUpdateList(props.type)}>Update List</button>
      </div>
    </div>
  );
}

SectionHeading.propTypes = {
  type: PropTypes.string,
  onRequestNewEntryForm: PropTypes.func,
  onClickToUpdateList: PropTypes.func,
};

export default SectionHeading;