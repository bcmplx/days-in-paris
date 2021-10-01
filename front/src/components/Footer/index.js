// == Import de la lib React
import React from 'react';

// == Import npm
import { Link } from 'react-router-dom';

// == Imports locaux
import './style.scss';

const Footer = () => (
  <footer className="footer">
    <div className="footer-section">
      <h2 className="footer-section-title">Notre mission</h2>
      <p className="footer-text">
        Days in Paris a pour but de vous aider à organiser des voyages sur la Capitale française.
        Pour cela, vous pouvez découvrir une liste d'activités que
        vous pourrez repartir sur un calendrier dans votre organiseur.
      </p>
      <p className="footer-credits">© Day in Paris</p>
    </div>

    <div className="footer-section">
      <h2 className="footer-section-title">Liens Utiles</h2>
      <ul className="footer-list">
        <li className="footer-link">
          <Link to="/activities">
            Les activités disponibles
          </Link>
        </li>
        <li className="footer-link">
          <Link to="/faq">
            FAQ
          </Link>
        </li>
        <li className="footer-link">
          <Link to="/team">
            Qui sommes-nous?
          </Link>
        </li>
      </ul>
    </div>

    <div className="footer-section">
      <h2 className="footer-section-title">Conformités</h2>
      <ul className="footer-list">
        <li className="footer-link">
          <Link to="/legal-infos">
            Mentions Légales
          </Link>
        </li>
        <li className="footer-link">
          <Link to="/sitemap">
            Plan du site
          </Link>
        </li>
        <li className="footer-link">
          <Link to="/general-terms">
            Conditions générales
          </Link>
        </li>
      </ul>
    </div>
  </footer>
);

export default Footer;
