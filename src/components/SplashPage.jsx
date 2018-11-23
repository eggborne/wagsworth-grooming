import React from 'react';
import headerImage from '../assets/images/titlepic.jpg';

function SplashPage() {
  
  setTimeout(() => {
    let logoImg = document.getElementById('logo-img');
    if (logoImg) {
      logoImg.style.opacity = 1;
      document.getElementById('logo-msg').style.opacity = 1;
      logoImg.style.transform = 'scale(1)';
      document.getElementById('logo-msg').style.transform = 'scale(1)';
    }
  }, 10);
  
  return (
    <div id='splash-page'>
      <div id='logo-msg'><h1>Look at this dog</h1></div>
      <img id='logo-img' src={headerImage} />
    </div>
  );
}

export default SplashPage;