import React from 'react';
import PropTypes from 'prop-types';

function SectionHeading(props) {
  let headerText = `${props.type[0].toUpperCase()}${props.type.slice(1,props.type.length)}`;
  return (
    <div>
      <style jsx>{`
        div {
          border-radius: 0.5rem;
          background-color: #222;
          font-family: Tangerine, cursive;
          font-size: 2.25rem;
          color: #eee;
          width: 100%;
          padding: 3%;
          display: inline-flex;
          justify-content: space-between;
          align-items: center;
          justify-items: center;
        }
        button {
          padding: 0.4rem;
          font-size: 0.8rem;
          height: 80%;
          border-radius: 0.4rem;
        }
        #lbl {
          justify-self: flex-start;
          padding: 0;
        }
        #btns {
          justify-self: flex-end;
          padding: 0;
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