import React from 'react';
import headerImage from '../assets/images/titlepic.jpg';

function SplashPage() {
  return (
    <div>
      <style jsx>{`
        div {
          padding: 2%;
          margin:1.5%;
          text-align: center;
          border-radius: 0.5rem;
          background-color: var(--mainBg);
        }
        img {
          width: 60vmin;
          border: 1px solid #333;
          border-radius: 4%;
          box-shadow: 0px 0px 4px 2px #666;
          margin: 10%;
          margin-top: 5%;
        }
      `}</style>
      <h1>Look at this dog</h1>
      <img src={headerImage}/>
    </div>
  );
}

export default SplashPage;