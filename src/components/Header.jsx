import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { relative } from 'path';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchList: 'parents',
    };

    this.changeSearchList = this.changeSearchList.bind(this);
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
    this.toggleMenuItemOn = this.toggleMenuItemOn.bind(this);

  }

  componentDidMount() { 
    console.log('Header mounted ------------------ HEADER');
  }

  changeSearchList(newList) {
    this.setState({
      searchList: newList
    });
    // check correct radio button
    Array.from(document.getElementsByName('search-type')).map((searchType, i) => {
      if (searchType.value === newList) {
        searchType.checked = true;
      }
    });
  }

  toggleMenuItemOn(newItem) {
    Array.from(document.getElementsByClassName('mainMenuItem')).map((menuItem, i) => {
      if (menuItem.id === newItem) {
        menuItem.style.backgroundColor = '#222';
      } else {
        menuItem.style.backgroundColor = 'transparent';
      }
    });
    let newList = newItem.replace('MenuArea', 's')
    this.setState({
      searchList: newList
    })
    Array.from(document.getElementsByName('search-type')).map((searchType, i) => {
      if (searchType.value === newList) {
        searchType.checked = true;
      }
    });
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

  render() {
    let menuItemStyle = {
      backgroundColor: 'none',
      padding: '0.5rem',
      borderRadius: '0.5rem',
      paddingRight: '0.75rem',
    }
    let menuStyle = {
      height: '0',
    }
    let displayListNav;
    if (this.props.menuSymbol === 'close') {
      displayListNav = 'block';
      menuStyle.height = '100%';
    } else {
      displayListNav = 'none';
      menuStyle.height = '0';
    }
    let optionsList = [];
    let hambHeight;
    if (this.props.menuSymbol === 'menu') {
      hambHeight = '14vmin';
    } else {
      hambHeight = '20vmin';
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
            font-size: 2rem;
          }
          #hamburger-icon {
            font-size:2.5rem;
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
          #hamburger {
            position: absolute;
            right: 2%;
            top: 0;
            text-align: center;
            width: 16vmin;
            height: ${hambHeight};
            background-color: #191919;
            display: inline-flex;
            align-items: flex-start;
            justify-content: center;
            margin-top: 2%;
            margin-right: 2%;
            z-index: 0;
          }
          #header {
            background-color: var(--darkest);
            color: var(--mainBg);
            box-sizing: border-box;
            font-family: Tangerine; cursive;
            font-size: 2.5rem;
            width: 100%;
            padding: 2%;
          }
          #admin-nav-bar {
            font-size: 1rem;
            font-family: Playfair Display; serif;
            width: 100%;
            color: var(--darkAccent);
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 2%;
            flex-wrap: wrap;
          }
          #admin-section-nav {
            font-size: 2rem;
            font-family: Tangerine; cursive;
            text-align: right;
            width: 100%;
            display: ${displayListNav};
            background-color: #191919;
            margin-top: 0.5rem;
            padding: 1rem;
            z-index: 1;
          }
          .tiny {
            text-align: right;
            font-size: 0.6rem;
            font-family: sans-serif;
            margin-top: 0.25rem;
          }
          #search {
            width:80%;
            height: 2rem;
            font-size: 1.5rem;
            padding-left: 0.5rem;
            margin-right: 0.25rem;
            margin-top: 0.25rem;
            margin-bottom: 0.25rem;
          }
          #search-area {
            margin-top: 1rem;
            display: inline-flex;
            align-items: center;
            justify-content: space-around;
          }
          #search-options {
            width:80%;
            align-items: center;
            display: inline-flex;
            justify-content: space-between;
            margin-top: 0.25rem;
          }
          #employeeMenuArea {
            opacity: 0.5;
          }
          button {
            border-radius: 2px;
            padding: 0;
          }
        `}</style>
        <div id='top-row'>
          <Link to="/">
            <div id="logo">
              {this.props.displayTitle}
            </div>
            <div className='tiny'>Administrative Portal v0.1</div>
          </Link>
          <div onClick={this.props.onClickHamburger} id='hamburger'>
            <i id="hamburger-icon" className="material-icons"><big>{this.props.menuSymbol}</big></i>
          </div>
        </div>
        <div id="admin-nav-bar">
          <div id="admin-section-nav">
            <div style={menuStyle}>
            <div className='mainMenuItem' id='employeeMenuArea' onClick={() => this.toggleMenuItemOn('employeeMenuArea')} style={menuItemStyle}><Link to="/employees">Employees</Link></div>
            <div className='mainMenuItem' id='parentMenuArea' onClick={() => this.toggleMenuItemOn('parentMenuArea')} style={menuItemStyle}><Link to="/parents">Parents</Link></div>
            <div className='mainMenuItem' id='petMenuArea' onClick={() => this.toggleMenuItemOn('petMenuArea')} style={menuItemStyle}><Link to="/pets">Pets</Link></div>
            <div className='mainMenuItem' id='appointmentMenuArea' onClick={() => this.toggleMenuItemOn('appointmentMenuArea')} style={menuItemStyle}><Link to="/appointments">Appointments</Link></div>
          </div>
          </div>
          <form onSubmit={() => this.props.onSubmitSearch(event, this.state.searchTerm.value, this.state.searchList)}>
            <div id="search-area">
              <input
                onChange={this.handleSearchTermChange}
                list='found-entries'
                autoComplete='off'
                type='text'
                placeholder='Search...'
                id='search' />
              <datalist id='found-entries'>
                {suggestOptions}
              </datalist>
              <button type="submit"><i className="material-icons">search</i></button>
            </div>
            <div id='search-options'>
              <div onClick={() => this.changeSearchList('parents')}><input defaultChecked type='radio' name='search-type' value='parents'></input>Parents</div>
              <div onClick={() => this.changeSearchList('pets')}><input type='radio' name='search-type' value='pets'></input>Pets</div>
              <div onClick={() => this.changeSearchList('appointments')}><input type='radio' name='search-type' value='appointments'></input>Appointments</div>
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
  lists: PropTypes.object
};

export default Header;