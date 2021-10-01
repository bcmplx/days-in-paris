// == Import de la lib React
import React from 'react';

// == Import npm

// == Imports locaux
import './style.scss';
import voiture from 'src/assets/images/voiture.png';
import paris from 'src/assets/images/paris.png';

const Frise = () => (
  <>
    <img className="frise-img" src={voiture} alt="partie voiture de la frise" />
    <img className="frise-img" src={paris} alt="partie paris de la frise" />
  </>
);

export default Frise;
