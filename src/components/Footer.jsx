import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Footer(){
  return (
    <div id="footer">
      <style jsx>{`
        #footer {
          margin: 0;
          box-sizing: border-box;
          background-color: #111;
          font-family: sans-serif;
          font-size: 0.75rem;
          color: #ccc;
          width: 100%;
          text-align: center;
          position: absolute;
          bottom: -15vmin;
          height: 15vmin;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .underlined {
          text-decoration: underline;
        }
      `}</style>
      <div id="copyright-notice">
      © 2018 Eggborne Studios - <Link to="/pets"><span className="underlined">Terms of Use</span></Link> | <Link to="/parents"><span className="underlined">Privacy Policy</span></Link>
      </div>
    </div>
  );
}

Footer.propTypes = {
  legend: PropTypes.string
};

export default Footer;