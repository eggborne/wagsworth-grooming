import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Header(props){
  return (
    <div id="header">
      <style jsx>{`
        #header {
          background-color: var(--darkest);
          color: var(--mainBg);
          box-sizing: border-box;
          font-family: Tangerine; cursive;
          font-size: 3rem;
          width: 100%;
          padding: 2%;
        }
        #admin-nav-bar {
          font-size: 1rem;
          font-family: Playfair Display; serif;
          width: 100%;
          color: var(--darkAccent);
          display: inline-flex;
          justify-content: space-between;
          align-items: center;
          background-color: #222;
          padding: 2%;
        }
        #account-nav {
          font-size: 0.8rem;
        }
      `}</style>
      <Link to="/"><div id="logo">{props.legend}</div></Link>
      <div id="admin-nav-bar">
        <div id="admin-section-nav">
          <Link to="/pets">Pets</Link> | <Link to="/parents">Parents</Link> | <Link to="/appointments">Appointments</Link>
        </div>
        <div id="account-nav">
          <Link to="/newentry"><button className="nav-button">Add new</button></Link>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  legend: PropTypes.string
};

export default Header;