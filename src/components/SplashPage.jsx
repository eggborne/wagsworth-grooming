import React from 'react';
import headerImage from '../assets/images/titlepic.jpg';

function SplashPage() {
  setTimeout(() => {
    document.getElementById('logo-img').style.opacity = 1,
    document.getElementById('logo-msg').style.opacity = 1,
    document.getElementById('logo-img').style.transform = 'scale(1)'
    document.getElementById('logo-msg').style.transform = 'scale(1)'
  },5)
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
          opacity: 0;
          transform: scale(0);
          transition: all 600ms ease;
        }
        #logo-msg {
          transform: scale(0);
          transition: all 600ms ease;
        }
      `}</style>
      <div id='logo-msg'><h1>Look at this dog</h1></div>
      <img id='logo-img' src={headerImage}/>
    </div>
  );
}

export default SplashPage;