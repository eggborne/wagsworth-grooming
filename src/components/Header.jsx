import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <div id="header">
      <style jsx>{`
        small {
          font-size:1.5rem;
        }
        #logo {
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
          margin-left: 0.5rem;
        }
      `}</style>
      <Link to="/">
        <div id="logo">
          Wagsworth Grooming Co.<br />
          <small>Administrative Portal <span className='tiny'>v0.1</span></small>
        </div>
      </Link>
      <div id="admin-nav-bar">
        <div id="admin-section-nav">
          <Link to="/employees">Employees</Link> | <Link to="/parents">Parents</Link> | <Link to="/pets">Pets</Link> | <Link to="/appointments">Appointments</Link>
        </div>
      </div>
    </div>
  );
}

export default Header;