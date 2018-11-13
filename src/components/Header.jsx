import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchList: null,
    };

    this.changeSearchList = this.changeSearchList.bind(this);
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
    this.toggleMenuItemOn = this.toggleMenuItemOn.bind(this);
    this.handleSearchFocus = this.handleSearchFocus.bind(this);
    this.handleHomeClick = this.handleHomeClick.bind(this);

  }

  componentDidMount() {

  }

  highlightSection(section) {
    Array.from(document.getElementsByName('search-type')).map((searchType) => {
      if (searchType.value === section) {
        searchType.checked = true;
        searchType.nextSibling.style.color = 'var(--mainBg)';
        searchType.nextSibling.style.backgroundColor = 'var(--dark)';
      } else {
        searchType.nextSibling.style.color = 'var(--darkAccent)';
        searchType.nextSibling.style.backgroundColor = '#191919';
      }
    });
  }

  changeSearchList(newList) {
    this.setState({
      searchList: newList
    });
    // check correct radio button
    Array.from(document.getElementsByName('search-type')).map((searchType) => {
      if (searchType.value === newList) {
        searchType.checked = true;
      }
    });
    this.props.onSwitchSectionView(this.state.searchList);
    this.setState({
      searchList: newList
    });
    this.highlightSection(newList);
  }

  toggleMenuItemOn(newItem) {
    Array.from(document.getElementsByClassName('mainMenuItem')).map((menuItem) => {
      if (menuItem.id === newItem) {
        menuItem.style.backgroundColor = '#222';
      } else {
        menuItem.style.backgroundColor = 'transparent';
      }
    });
    let newList = newItem.replace('MenuArea', 's');
    // trigger App.handleSwitchSectionView to record last selected section
    this.props.onSwitchSectionView(this.state.searchList);
    this.setState({
      searchList: newList
    });
    this.highlightSection(newList);
  }

  handleSearchTermChange() {
    let newTerm = this.state.searchTerm;
    let stroke = event.data;
    if (!stroke) {
      newTerm = newTerm.slice(0, newTerm.length - 1);
    } else {
      newTerm += stroke;
    }
    this.setState({
      searchTerm: newTerm
    });
  }

  handleHomeClick() {
    this.toggleMenuItemOn('');
  }

  handleSearchFocus() {
    if (!this.state.searchList) {
      this.toggleMenuItemOn('parents');
    }
  }

  render() {
    let menuVis;
    let searchVis;
    let optionsList = [];
    if (this.props.menuSymbol === 'menu') {
      menuVis = 'none';
    } else {
      menuVis = 'block';
    }
    if (this.state.searchList === 'employees') {
      searchVis = 'none';
    } else {
      searchVis = 'block';
    }

    if (this.state.searchList === 'parents') {
      let parentList = Object.entries(this.props.lists[this.state.searchList]);
      parentList.map((parent) => {
        optionsList.push(parent[1].lastName);
      });
    } else if (this.state.searchList === 'pets') {
      let petList = Object.entries(this.props.lists[this.state.searchList]);
      petList.map((pet) => {
        optionsList.push(pet[1].name);
      });
    }

    let suggestOptions =
      optionsList.map((optionString, i) =>
        <option key={i} value={optionString} />
      );

    return (
      <div id="header">
        <style jsx>{`
          .material-icons {
            font-size: 1.5rem;
          }
          #hamburger-icon {
            font-size:2.5rem;
            align-self: center;
          }
          #top-row {
            width:100%;
            display: inline-flex;
            align-items: center;
            justify-content: space-between;
          }
          #logo, .tiny {
            color: var(--mainBg);
          }
          .mainMenuItem {
            background-color: transparent;
            padding: 0.5rem;
            border-radius: 0.5rem;
            padding-right: 0.75rem;
            height: 25%;
            transition: background 500ms ease;
          }
          #hamburger {
            text-align: center;
            width: 18vmin;
            height: 18vmin;
            background-color: #191919;
            display: inline-flex;
            justify-content: center;
          }
          #header {
            background-color: var(--darkest);
            color: var(--mainBg);
            font-family: Tangerine; cursive;
            font-size: 2.5rem;
            padding: 2%;
            display: flex;
            flex-direction: column;
          }
          #admin-search-form {
            font-size: 1rem;
            font-family: Playfair Display; serif;
            width: 100%;
            color: var(--darkAccent);
            display: flex;
            align-items: center;
            padding: 2%;
            flex-wrap: wrap;
            display: ${searchVis}
          }
          #list-nav-items {
            font-size: 2rem;
            font-family: Tangerine; cursive;
            text-align: right;
            width: 100%;
            background-color: #191919;
            padding: 2%;
            transition: all 400ms ease;
            display: ${menuVis}
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
            margin-bottom: 0.25rem;
            display: inline-flex;
            align-items: stretch;
            justify-content: space-between;
          }
          #search-input {
            width:75%;
            font-size: 1.5rem;
            padding-left: 0.5rem;
            border-radius: 2px;
            flex-basis: auto;
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
            justify-content: space-between;
            justify-items: center;
            align-items: center;
          }
          #search-options > div {
            color: #191919;
          }
          .search-list-tab {
            font-size: 1.2rem;
            display: inline-flex;
            align-items: center;
          }
          .search-list-tab > div {
            box-sizing: border-box;
            background-color: #191919;
            border-radius: 0.5rem;
            font-family: Helvetica;
            text-shadow: 1px 1px 1px black;
            transition: all 400ms ease;
            padding: 0.5rem;
          }
          input[type=radio] {
            margin: 0;
            width: 1.5rem;
            height: 1.5rem;
            margin-right: 0.25rem;
            display: none;
          }
          #employeeMenuArea {
            opacity: 0.6;
          }
          
        `}</style>

        <div id='top-row'>
          <div onClick={this.handleHomeClick}>
            <Link to="/">
              <div id="logo">
                {this.props.displayTitle}
              </div>
              <div className='tiny'>Administrative Portal v0.1</div>
            </Link>
          </div>
          <div onClick={() => this.props.onClickHamburger(event,this.state.searchList)} id='hamburger'>
            <i id="hamburger-icon" className="material-icons"><big>{this.props.menuSymbol}</big></i>
          </div>
        </div>

        <div id="list-nav-items">
          <div id='menu'>
            <div className='mainMenuItem' id='employeeMenuArea' onClick={() => this.toggleMenuItemOn('employeeMenuArea')}><Link to="/employees">Employees</Link></div>
            <div className='mainMenuItem' id='parentMenuArea' onClick={() => this.toggleMenuItemOn('parentMenuArea')}><Link to="/parents">Parents</Link></div>
            <div className='mainMenuItem' id='petMenuArea' onClick={() => this.toggleMenuItemOn('petMenuArea')}><Link to="/pets">Pets</Link></div>
            <div className='mainMenuItem' id='appointmentMenuArea' onClick={() => this.toggleMenuItemOn('appointmentMenuArea')}><Link to="/appointments">Appointments</Link></div>
          </div>
        </div>

        <div id="admin-search-form">
          <form onSubmit={() => this.props.onSubmitSearch(event, this.state.searchTerm.value, this.state.searchList)}>
            <div id="search-area">
              <input
                onFocus={this.handleSearchFocus}
                onChange={this.handleSearchTermChange}
                list='found-entries'
                autoComplete='off'
                type='text'
                placeholder='Search...'
                id='search-input' />
              <datalist id='found-entries'>
                {suggestOptions}
              </datalist>
              <button id="search-button" type="submit"><i className="material-icons">search</i></button>
            </div>
            <div id='search-options'>
              <div className='search-list-tab' onClick={() => this.changeSearchList('parents')}><input defaultChecked type='radio' name='search-type' value='parents'></input><div><Link to="/parents">Parents</Link></div></div>
              <div className='search-list-tab' onClick={() => this.changeSearchList('pets')}><input type='radio' name='search-type' value='pets'></input><div><Link to="/pets">Pets</Link></div></div>
              <div className='search-list-tab' onClick={() => this.changeSearchList('appointments')}><input type='radio' name='search-type' value='appointments'></input><div><Link to="/appointments">Appointments</Link></div></div>
            </div>
          </form>
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
  lists: PropTypes.object
};

export default Header;