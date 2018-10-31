import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Header(props){
  var pageHeaderStyles = {
    margin: 0,
    boxSizing: 'border-box',
    backgroundColor: '#111',
    fontFamily: 'Tangerine, cursive',
    fontSize: '3rem',
    color: '#eee',
    width: '100%',
    padding: '2%',
  };
  var adminNavStyles = {
    fontSize: '1rem',
    fontFamily: 'Playfair Display, serif',
    width: '100%',
    color: '#666',
    display: 'inline-flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#222',
    padding: '2%',
  };
  return (
    <div style={pageHeaderStyles}>
      <style jsx>{`
        #account-nav {
          font-size: 0.8rem;
        }
        #logo {
          color: white;
        }
      `}</style>
      <Link to="/"><div id="logo">{props.legend}</div></Link>
      <div style={adminNavStyles} id="admin-nav-bar">
        <div id="admin-section-nav">
          <Link to="/pets">Pets</Link> | <Link to="/parents">Parents</Link> | <Link to="/appointments">Appointments</Link>
        </div>
        <div id="account-nav">
          <Link to="/newparent">Register New Parent</Link>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  legend: PropTypes.string
};

export default Header;