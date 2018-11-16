import React from 'react';
import PropTypes from 'prop-types';

function SectionHeading(props) {
  let _sortStyle = 'asc';
  let sortOptions;
  let addIcon = 'person_add';
  let radius;
  if (props.type === 'parents') {
    sortOptions = [
      'Name',
      'Last Appt',
      'Created'
    ];
  } else if (props.type === 'pets') {
    sortOptions = [
      'Name',
      'Parent',
      'Created'
    ];
  } else if (props.type === 'appointments') {
    sortOptions = [
      'Date',
      'Parent',
      'Pet'
    ];
  } else {
    sortOptions = [
      'Date',
      'Parent',
      'Pet'
    ];
  }

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
          color: var(--mainBg);
          width: 100%;
          padding: 2%;
          border-radius: ${radius};
          font-family: Helvetica;
          font-size: 1rem;
        }
        #lbl {
          width: 35%;
        }
        #btns {
          padding: 0;
          display: inline-flex;
          justify-content: flex-end;
        }
        button {
          border-radius: 0.4rem;
          margin: 0.25rem;
        }
        #top-buttons {
          padding: 0;
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
        }
        #sort-label {
          display: inline-flex;
          align-items: center;
        }
        #sort-select {
          border-radius: 0.4rem;
          padding: 0.5rem;
          justify-self: flex-start;
          margin-left: 0.25rem;
        }
        #sort-style-radios {
          display: inline-flex;
          border-radius: 0;
          padding: 0.25rem;
        }
        #sort-style-radios > div {
          width: 6rem;
          border-radius: 0;
          padding: 0;
          display: inline-flex;
          align-items: center;
          font-size: 0.8rem;
        }
        input:nth-child(2n) {
          margin-left: 1rem;
        }
      `}</style>
      <form>
        <div id='top-buttons'>
          <div id='sort-label'>Sort by:
            <div id='lbl'>
              <select
                id='sort-select'
                onChange={() => { props.onChangeSortBy(event, _sortStyle); }}>
                {sortOptions.map((sortOption, i) => {
                  return (<option key={i}>{sortOption}</option>);
                })}
              </select>
            </div>
          </div>
          <div id='btns'>
            <button onClick={() => props.onRequestNewEntryForm(props.type)}><i className='material-icons'>{addIcon}</i></button>
            {/* <button onClick={() => props.onClickToUpdateList(props.type)}><i className='material-icons'>refresh</i></button> */}
          </div>
        </div>
        <div id='sort-style-radios'>
          <div onClick={() => props.onChangeSortStyle(event, '')}><input defaultChecked type='radio' name='sort-order' value=''></input>Ascending</div>
          <div onClick={() => props.onChangeSortStyle(event, 'desc')}><input type='radio' name='sort-order' value='desc'></input>Descending</div>
        </div>
      </form>
    </div>
  );
}

SectionHeading.propTypes = {
  type: PropTypes.string,
  onRequestNewEntryForm: PropTypes.func,
  onClickToUpdateList: PropTypes.func,
  onChangeSortBy: PropTypes.func,
  onChangeSortStyle: PropTypes.func
};

export default SectionHeading;