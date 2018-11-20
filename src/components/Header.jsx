import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchList: null,
    };

    this.changeSearchList = this.changeSearchList.bind(this);
    this.toggleMenuItemOn = this.toggleMenuItemOn.bind(this);
    this.handleSearchFocus = this.handleSearchFocus.bind(this);
    this.handleHomeClick = this.handleHomeClick.bind(this);
  }

  componentDidMount() {

  }

  getAutosuggestList(currentSearchList) {
    let optionsList = [];
    if (currentSearchList === 'parents') {
      let parentList = Object.entries(this.props.lists[currentSearchList]);
      parentList.map((parent) => {
        optionsList.push(`${parent[1].lastName}, ${parent[1].firstNames.join(' & ')}`);
      });
    } else if (currentSearchList === 'pets') {
      let petList = Object.entries(this.props.lists[currentSearchList]);
      petList.map((pet) => {
        let petName = pet[1].name;
        let petLastName = this.props.printEntryLink('parents', pet[1].parent, true);
        let petBreed = pet[1].breed;
        optionsList.push(`${petName} ${petLastName} - ${petBreed.join(' / ')}`);
      });
    } else if (currentSearchList === 'appointments') {
      let apptList = Object.entries(this.props.lists[currentSearchList]);
      apptList.map((appt) => {
        let apptDate = appt[1].date;
        let petLink = this.props.printEntryLink('pets', appt[1].petId, true);
        let apptServices = appt[1].services.join(', ');
        optionsList.push(`${apptDate} | ${petLink} - ${apptServices}`);
      });
    } else if (currentSearchList === 'splashPage') {
      // shouldn't be done here
      document.getElementById('search-input').placeholder = 'Search...';
    }
    return optionsList;
  }

  highlightSection(section) {
    Array.from(document.getElementsByName('search-type')).map((searchType) => {
      if (searchType.value === section) {
        searchType.checked = true;
        searchType.nextSibling.style.backgroundColor = 'var(--dark)';
      } else {
        searchType.nextSibling.style.backgroundColor = 'var(--light)';
      }
    });
  }

  changeSearchList(newList) {
    // tell App.jsx what the previous section was
    this.props.onSwitchSectionView(this.state.searchList, newList);
    this.setState({
      searchList: newList
    });
    // check correct radio button
    Array.from(document.getElementsByName('search-type')).map((searchType) => {
      if (searchType.value === newList) {
        searchType.checked = true;
      }
    });
    this.setState({
      searchList: newList
    });
    this.highlightSection(newList);
    if (newList) {
      document.getElementById('search-input').placeholder = `Search ${newList[0].toUpperCase()}${newList.slice(1, -1)}s`;
    } else {
      document.getElementById('search-input').placeholder = 'Search...';
    }
  }

  toggleMenuItemOn(newItem, noHamburger) {

    Array.from(document.getElementsByClassName('mainMenuItem')).map((menuItem) => {
      if (menuItem.id === newItem) {
        menuItem.style.backgroundColor = '#222';
      } else {
        menuItem.style.backgroundColor = 'transparent';
      }
    });
    // trigger App.handleSwitchSectionView to record last selected section
    let newList = newItem.replace('MenuArea', 's');

    if (!noHamburger) {
      // setTimeout(() => {
      //   this.props.onClickHamburger(false, newList, true);
      // }, 200);
    }


    this.changeSearchList(newList);


    // this.props.onSwitchSectionView(this.state.searchList, newList);
    // this.setState({
    //   searchList: newList
    // });
    // this.highlightSection(newList);
    // document.getElementById('hamburger-container').style.opacity = 0;

    // if (newList) {
    //   document.getElementById('search-input').placeholder = `Search ${newList[0].toUpperCase()}${newList.slice(1, -1)}s`;
    // } else {
    //   document.getElementById('search-input').placeholder = 'Search...';
    // }
  }

  handleHomeClick() {
    this.toggleMenuItemOn('', true);
  }

  handleSearchFocus() {
    if (!this.state.searchList) {
      this.toggleMenuItemOn('parents', true);
      window.location.hash = '#/parents';
    }
  }

  render() {
    let currentSearchList = this.state.searchList;
    let menuVis;
    let searchVis;
    let hambRadius;
    if (this.props.menuSymbol === 'menu') {
      menuVis = 'none';
      hambRadius = '0.5rem';
    } else {
      menuVis = 'block';
      hambRadius = '0.5rem 0.5rem 0 0';
    }
    if (currentSearchList === 'employees') {
      searchVis = 'none';
    } else {
      searchVis = 'inline-flex';
    }

    let optionsList = this.getAutosuggestList(currentSearchList);

    let suggestOptions =
      optionsList.map((optionString, i) =>
        <option key={i} value={optionString} />
      );

    return (
      <div id="header">
        <style jsx>{`
          #hamburger-container {       
            display: ${menuVis};
          }
          #hamburger {
            border-radius: ${hambRadius};
          }
          #search-area {
            display: ${searchVis};
          }
        `}</style>
        <div id='top-row'>
          <div onClick={this.handleHomeClick}>
            <Link to="/">
              <div id="logo">
                {this.props.displayTitle}
              </div>
              <div className='tiny'>Administrative Portal v0.1 | <strong>DB calls: <big id='call-count'>{this.props.callCount}</big></strong></div>
            </Link>
          </div>
          <div onClick={(event) => this.props.onClickHamburger(event, this.state.searchList)} id='hamburger'>
            <i id="hamburger-icon" className="material-icons"><big>{this.props.menuSymbol}</big></i>
          </div>
        </div>
        <div id='lower-rows'>
          <div id="hamburger-container">
            <div className='mainMenuItem' id='employeeMenuArea' onClick={() => this.toggleMenuItemOn('employeeMenuArea')}><Link to="/employees">Employees</Link></div>
            <div className='mainMenuItem' id='parentMenuArea' onClick={() => this.toggleMenuItemOn('parentMenuArea')}><Link to="/parents">Parents</Link></div>
            <div className='mainMenuItem' id='petMenuArea' onClick={() => this.toggleMenuItemOn('petMenuArea')}><Link to="/pets">Pets</Link></div>
            <div className='mainMenuItem' id='appointmentMenuArea' onClick={() => this.toggleMenuItemOn('appointmentMenuArea')}><Link to="/appointments">Appointments</Link></div>
          </div>
          <div id="admin-search-form">
            <form onSubmit={(event) => this.props.onSubmitSearch(event, this.state.searchList)}>
              <div id="search-area">
                <input
                  name='search-bar'
                  onFocus={this.handleSearchFocus}
                  list='found-entries'
                  autoComplete='off'
                  type='text'
                  placeholder='Search...'
                  id='search-input' />
                <datalist id='found-entries'>
                  {suggestOptions}
                </datalist>
                <button name="submit-button" id="search-button" type="submit"><i className="material-icons">search</i></button>
              </div>
              <div id='search-options'>
                <div className='search-list-tab' onClick={() => this.changeSearchList('parents')}>
                  <input defaultChecked type='radio' name='search-type' value='parents'></input>
                  <div>
                    <Link to="/parents"><div className='tab-contents'><i className='material-icons'>person</i> Parents</div></Link>
                  </div>
                </div>
                <div className='search-list-tab' onClick={() => this.changeSearchList('pets')}>
                  <input type='radio' name='search-type' value='pets'></input>
                  <div>
                    <Link to="/pets"><div className='tab-contents'><i className='material-icons'>pets</i> Pets</div></Link>
                  </div>
                </div>
                <div className='search-list-tab' onClick={() => this.changeSearchList('appointments')}>
                  <input type='radio' name='search-type' value='appointments'></input>
                  <div>
                    <Link to="/appointments"><div className='tab-contents'><i className='material-icons'>event</i> Appointments</div></Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  menuSymbol: PropTypes.string,
  displayTitle: PropTypes.string,
  onClickHamburger: PropTypes.func,
  onSubmitSearch: PropTypes.func,
  onSwitchSectionView: PropTypes.func,
  printEntryLink: PropTypes.func,
  lists: PropTypes.object,
  callCount: PropTypes.number
};

export default Header;