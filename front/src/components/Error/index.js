import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CloudAnimation from 'src/components/CloudAnimation';
import { BsArrowLeftShort } from 'react-icons/bs';
import './style.scss';

const Error = ({ code }) => (
  <div id="notfound">
    <CloudAnimation />
    <div className="notfound">
      <div className="notfound-404">
        <h1>{code}</h1>
      </div>
      {
      code === 404
        ? <h2>OOPS, la page que vous recherchez est introuvable !</h2>
        : <h2>OOPS, une erreur interne s'est produite ! Veuillez réessayer ultérieurement.</h2>
      }
      <Link className="link" to="/">
        <BsArrowLeftShort className="icon" />
        <span className="arrow">Retour à l'accueil</span>
      </Link>
    </div>
  </div>
);

Error.propTypes = {
  code: PropTypes.number.isRequired,
};

export default Error;
