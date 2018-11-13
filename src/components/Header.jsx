import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchList: 'parents',
    };

    this.changeSearchList = this.changeSearchList.bind(this);
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);

  }

  changeSearchList(newList) {
    this.setState({
      searchList: newList
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

    let barContents;
    let displayListNav;
    if (this.props.menuSymbol === 'close') {
      displayListNav = 'block';
      barContents =
        <div>
          <Link to="/employees">Employees</Link> | <Link to="/parents">Parents</Link> | <Link to="/pets">Pets</Link> | <Link to="/appointments">Appointments</Link>
        </div>;
    } else {
      displayListNav = 'none';
      barContents = '';
    }
    let optionsList = [];

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
            text-align: center;
            width: 16vmin;
            height: 16vmin;
            background-color: #191919;
            display: inline-flex;
            align-items: center;
            justify-content: center;
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
            display: inline-flex;
            justify-content: space-around;
            align-items: center;
            padding: 2%;
            flex-wrap: wrap;
          }
          #admin-section-nav {
            display: ${displayListNav};
            background-color: #222;
            margin-top: 1rem;
            padding: 1rem;
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
              <div><input defaultChecked onClick={() => this.changeSearchList('parents')} type='radio' name='search-type' value='parents'></input>Parents</div>
              <div><input onClick={() => this.changeSearchList('pets')} type='radio' name='search-type' value='pets'></input>Pets</div>
              <div><input onClick={() => this.changeSearchList('appointments')} type='radio' name='search-type' value='appointments'></input>Appointments</div>
            </div>
          </form>
          <div id="admin-section-nav">
            {barContents}
          </div>
        </div>
      </div>
    );
  }
}

// function Header(props) {

// let barContents;
// if (props.menuSymbol === 'close') {
//   barContents = <div id="admin-section-nav">
//   <Link to="/employees">Employees</Link> | <Link to="/parents">Parents</Link> | <Link to="/pets">Pets</Link> | <Link to="/appointments">Appointments</Link>
// </div>
// } else {
//   barContents = '';
// }
// let optionsList;
// if (this.state.searchList === 'pets') {
//   optionsList = [
//     'Megatron',
//     'Cheddar Cheese'
//   ];
// } else if (this.state.searchList === 'parents') {
//   optionsList = [
//     'Reeves',
//     'Schwarzenegger'
//   ];
// }

// let suggestOptions = 
// optionsList.map((optionString, i) => 
//   <option key={i} value={optionString} />
// )

// return (
//   <div id="header">
//     <style jsx>{`
//       .material-icons {
//         font-size:2.5rem;
//       }
//       #top-row {
//         width:100%;
//         display: inline-flex;
//         align-items: center;
//         justify-content: space-between;
//       }
//       #logo, .tiny {
//         color: var(--mainBg);
//       }
//       #hamburger {
//         text-align: center;
//         width: 16vmin;
//         height: 16vmin;
//         background-color: #191919;
//         display: inline-flex;
//         align-items: center;
//         justify-content: center;
//       }
//       #header {
//         background-color: var(--darkest);
//         color: var(--mainBg);
//         box-sizing: border-box;
//         font-family: Tangerine; cursive;
//         font-size: 2.5rem;
//         width: 100%;
//         padding: 2%;
//       }
//       #admin-nav-bar {
//         font-size: 1rem;
//         font-family: Playfair Display; serif;
//         width: 100%;
//         color: var(--darkAccent);
//         display: inline-flex;
//         justify-content: space-between;
//         align-items: center;
//         background-color: #222;
//         padding: 2%;
//         flex-wrap: wrap;
//       }
//       .tiny {
//         text-align: right;
//         font-size: 0.6rem;
//         font-family: sans-serif;
//         margin-top: 0.25rem;
//       }
//       #search {
//         height: 2rem;
//         font-size: 1.5rem;
//         padding-left: 0.5rem;
//         margin-right: 0.25rem;
//       }
//       #search-area {
//         display: inline-flex;
//         align-items: center;
//         justify-content: space-between;
//       }
//       #search-options {
//         width:85%;
//         align-items: center;
//         display: inline-flex;
//         justify-content: space-between;
//       }
//       button {
//         padding: 0;
//       }
//     `}</style>
//     <div id='top-row'>
//       <Link to="/">
//         <div id="logo">
//           {props.displayTitle}
//         </div>
//         <div className='tiny'>Administrative Portal v0.1</div>
//       </Link>
//       <div onClick={props.onClickHamburger} id='hamburger'>
//         <i className="material-icons"><big>{props.menuSymbol}</big></i>
//       </div>
//     </div>
//     <div id="admin-nav-bar">
//       <form onSubmit={() => props.onSubmitSearch(event,this.state.searchTerm.value,this.state.searchList)}>
//         <div id="search-area">
//           <input
//             list='found-entries'
//             autoComplete='off'
//             ref={(input) => { this.state.searchTerm = input; }}
//             type='text'
//             placeholder='Search...'
//             id='search' />
//           <datalist id='found-entries'>
//             {suggestOptions}
//           </datalist>
//           <button type="submit"><i className="material-icons">search</i></button>
//         </div>
//         <div id='search-options'>
//           <div><input defaultChecked onClick={() => this.changeSearchList('parents')} type='radio' name='search-type' value='parents'></input>Parents</div>
//           <div><input onClick={() => this.changeSearchList('pets')} type='radio' name='search-type' value='pets'></input>Pets</div>
//           <div><input onClick={() => this.changeSearchList('appointments')} type='radio' name='search-type' value='appointments'></input>Appointments</div>
//         </div>
//       </form>
//       {barContents}
//     </div>
//   </div>
// );
// }

Header.propTypes = {
  menuSymbol: PropTypes.string,
  displayTitle: PropTypes.string,
  onClickHamburger: PropTypes.func,
  onSubmitSearch: PropTypes.func,
  lists: PropTypes.object
};

export default Header;