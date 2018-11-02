import React from 'react';
import headerImage from '../assets/images/conan1.jpg';

function SplashPage() {
  return (
    <div>
      <style jsx>{`
        div {
          padding: 2.5%;
          text-align: center;
        }
        img {
          width: 100%;
          border: 1px solid black;
          border-radius: 4%;
          box-shadow: 0px 0px 5px 3px #444;
        }
      `}</style>
      <h2>Look at this goddamned dog</h2>
      <img src={headerImage}/>
    </div>
  );
}

export default SplashPage;