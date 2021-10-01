// == Import de la lib React
import React from 'react';

// == Import npm

// == Imports locaux
import './style.scss';

const SiteMap = () => (
  <div className="sitemap">
    <h1 className="sitemap-title">Plan du site : <br />days-in-paris.netlify.app/</h1>
    <div className="sitemap-subtitle">Dernière mise à jour : 5 août 2021</div>
    <div className="sitemap-total">Total pages: 1 (Single Page App)</div>
    <div className="sitemap-home-page">Page d' accueil : <a href="https://days-in-paris.netlify.app/">Days in Paris (days-in-paris.netlify.app/)</a></div>
    <div className="sitemap-page-number">Page 1</div>
    <a href="https://days-in-paris.netlify.app/" title="Days in Paris">Days in Paris</a>
  </div>
);

export default SiteMap;
