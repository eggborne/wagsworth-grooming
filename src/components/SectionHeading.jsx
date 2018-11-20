import React from 'react';
import PropTypes from 'prop-types';

function SectionHeading(props) {
  let _sortStyle = 'asc';
  let sortOptions;
  let addIcon = 'person_add';
  let radius;
  sortOptions = props.entryAttributes[props.type].sortOptions;

  if (props.type === 'employees') {
    radius = '0.5rem';
  } else {
    radius = '0rem 0.5rem 0.5rem 0.5rem';
  }
  return (
    <div id='section-heading'>
      <style jsx>{`
        div {
          border-radius: ${radius};
        }
      `}</style>
      <form>
        <div id='top-buttons'>
          <div id='sort-label'>Sort by:
            <div id='lbl'>
              <select
                id='sort-select'
                onChange={() => { props.onChangeSortBy(props.type, _sortStyle); }}>
                {sortOptions.map((sortOption, i) => {
                  return (<option key={i}>{sortOption}</option>);
                })}
              </select>
            </div>
          </div>
          <div id='btns'>
            <button onClick={() => props.onRequestNewEntryForm(event, props.type)}><i className='material-icons'>{addIcon}</i></button>
            <button onClick={(event) => props.onClickToUpdateList(event, props.type, 'dateCreated')}>All <i className='material-icons'>refresh</i></button>
          </div>
        </div>
        <div id='sort-style-radios'>
          <div onClick={() => props.onChangeSortStyle(event, props.type, 'asc')}><input defaultChecked className='visible' type='radio' name='sort-order' value='asc'></input>Ascending</div>
          <div onClick={() => props.onChangeSortStyle(event, props.type, 'desc')}><input className='visible' type='radio' name='sort-order' value='desc'></input>Descending</div>
        </div>
      </form>
    </div>
  );
}

SectionHeading.propTypes = {
  type: PropTypes.string,
  entryAttributes: PropTypes.object,
  onRequestNewEntryForm: PropTypes.func,
  onClickToUpdateList: PropTypes.func,
  onChangeSortBy: PropTypes.func,
  onChangeSortStyle: PropTypes.func
};

export default SectionHeading;