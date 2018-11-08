import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <div id="header">
      <style jsx>{`
        #logo, .tiny {
          color: var(--mainBg);
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
          justify-content: space-between;
          align-items: center;
          background-color: #222;
          padding: 2%;
        }
        .tiny {
          font-size: 0.6rem;
          font-family: sans-serif;
          margin-top: 0.25rem;
        }
      `}</style>
      <Link to="/">
        <div id="logo">
          {props.displayTitle}
        </div>
        <div className='tiny'>Administrative Portal v0.1</div>
      </Link>
      <div id="admin-nav-bar">
        <div id="admin-section-nav">
          <Link to="/employees">Employees</Link> | <Link to="/parents">Parents</Link> | <Link to="/pets">Pets</Link> | <Link to="/appointments">Appointments</Link>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  displayTitle: PropTypes.string,
};

export default Header;