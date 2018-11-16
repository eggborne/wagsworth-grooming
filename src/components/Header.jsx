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
      // let apptList = Object.entries(this.props.lists[currentSearchList]);
      // apptList.map((appt) => {
      //   let apptDate = appt[1].date;
      //   let petLink = this.props.printEntryLink('pets', appt[1].petId, true);
      //   let apptServices = appt[1].services.join(', ');
      //   optionsList.push(`${apptDate} | ${petLink} - ${apptServices}`);
      // });
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
        searchType.nextSibling.style.color = 'var(--mainBg)';
        searchType.nextSibling.style.backgroundColor = 'var(--dark)';
      } else {
        searchType.nextSibling.style.color = 'var(--darkAccent)';
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
      window.location = '/#/parents';
    }
  }

  render() {
    let currentSearchList = this.state.searchList;
    let menuVis;
    let searchVis;
    if (this.props.menuSymbol === 'menu') {
      menuVis = 'none';
    } else {
      menuVis = 'block';
    }
    if (currentSearchList === 'employees') {
      searchVis = 'none';
    } else {
      searchVis = 'block';
    }

    let optionsList = this.getAutosuggestList(currentSearchList);

    let suggestOptions =
      optionsList.map((optionString, i) =>
        <option key={i} value={optionString} />
      );

    return (
      <div id="header">
        <style jsx>{`
          
          #hamburger-icon {
            font-size:2.5rem;
            align-self: center;
          }
          #top-row {
            background-color: var(--darkest);
            width:100%;
            display: inline-flex;
            align-items: center;
            justify-content: space-between;
          }
          #hamburger {
            text-align: center;
            width: 18vmin;
            height: 18vmin;
            background-color: #191919;
            display: inline-flex;
            justify-content: center;
            cursor: pointer;
          }
          #header {
            background-image: linear-gradient(var(--darkest) 8rem, var(--mainBg));
            color: var(--mainBg);
            font-family: Tangerine; cursive;
            font-size: 2.5rem;
            padding: 3% 3% 0 3%;
            display: flex;
            flex-direction: column;
          }
          #admin-search-form {
            font-family: Playfair Display; serif;
            width: 100%;
            color: var(--darkAccent);
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            display: ${searchVis};
          }
          #hamburger-container {
            box-sizing:border-box;
            font-size: 2rem;
            font-family: Tangerine; cursive;
            text-align: right;
            width: 100%;
            padding: 2%;
            background-color: rgba(25, 25, 25, 1) ;
            display: ${menuVis};
            transition: all 400ms ease;
            opacity: 0;
          }
          .tiny {
            text-align: right;
            font-size: 0.6rem;
            font-family: sans-serif;
            margin-top: 0.25rem;
          }
          #search-area {
            width: 100%;
            margin-top: 0.5rem;
            margin-bottom: 0;
            display: inline-flex;
            align-items: stretch;
            justify-content: space-between;
          }
          #search-input {
            width:75%;
            font-size: 1.25rem;
            padding-left: 0.5rem;
            border-radius: 2px;
          }
          #search-button {
            width: 20%;
            border-radius: 2px;
            padding: 0.5rem;
            font-size: 1rem;
          }
          #search-options {
            width:90%;
            max-width: 300px;
            margin-top: 0.5rem;
            display: inline-flex;
            justify-content: flex-start;
            justify-items: center;
            align-items: center;
          }
          .search-list-tab {
            font-size: 1.2rem;
            margin-right: 0.5rem;
          }
          .search-list-tab > div {
            background-color: var(--light);
            border-radius: 0.5rem 0.5rem 0rem 0rem;
            font-family: Helvetica;
            transition: all 400ms ease;
            padding: 0.5rem;
          }
          #parent-tab {
            background-color: var(--dark);
          }
          input[type=radio] {
            display: none;
          }
        `}</style>
        <div id='top-row'>
          <div onClick={this.handleHomeClick}>
            <Link to="/">
              <div id="logo">
                {this.props.displayTitle}
              </div>
              <div className='tiny'>Administrative Portal v0.1 | <strong>DB calls: <big>{this.props.callCount}</big></strong></div>
            </Link>
          </div>
          <div onClick={() => this.props.onClickHamburger(event, this.state.searchList)} id='hamburger'>
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
                <div className='search-list-tab' onClick={() => this.changeSearchList('parents')}><input defaultChecked type='radio' name='search-type' value='parents'></input><div id='parent-tab'><Link to="/parents">Parents</Link></div></div>
                <div className='search-list-tab' onClick={() => this.changeSearchList('pets')}><input type='radio' name='search-type' value='pets'></input><div><Link to="/pets">Pets</Link></div></div>
                <div className='search-list-tab' onClick={() => this.changeSearchList('appointments')}><input type='radio' name='search-type' value='appointments'></input><div><Link to="/appointments">Appointments</Link></div></div>
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