import React from 'react';
import headerImage from '../assets/images/titlepic.jpg';

function SplashPage() {
  return (
    <div>
      <style jsx>{`
        div {
          padding: 0;
          text-align: center;
        }
        img {
          width: 60vmin;
          border: 1px solid black;
          border-radius: 4%;
          box-shadow: 0px 0px 4px 2px #444;
          margin: 1rem;
        }
      `}</style>
      <h2>Look at this goddamned dog</h2>
      <img src={headerImage}/>
    </div>
  );
}

export default SplashPage;