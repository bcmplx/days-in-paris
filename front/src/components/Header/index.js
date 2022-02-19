/* eslint-disable jsx-a11y/label-has-associated-control */
// == Import de la lib React
import React from 'react';
import PropTypes from 'prop-types';

// == Import npm
import { Link, NavLink } from 'react-router-dom';
import {
  FaUserCircle,
  FaBars,
} from 'react-icons/fa';

// == Imports locaux
import logo from 'src/assets/images/daysinparis-microcontour.png';
import './style.scss';

const Header = ({ currentUser, logoutUser }) => (
  
  <header className="header">
    <Link to="/">
      <div className="header-logo">
        <img src={logo} alt="logo app" />
      </div>
    </Link>

    <nav className="header-nav">
      <ul className="header-list">
        <NavLink to="/activities" className="header-link" activeClassName="selected">Activités</NavLink>
        <NavLink to="/organizer" className="header-link" activeClassName="selected">Organiseur</NavLink>
        <FaUserCircle className="header-user" />
        {currentUser.isLogged ? (
          <>
            <NavLink to="/profile" className="header-link" activeClassName="selected">{currentUser.firstName}</NavLink>
            {currentUser.isAdmin && (
              <NavLink to="/admin" className="header-link" activeClassName="selected">Admin</NavLink>
            )}
            <p className="header-link pointer" onClick={logoutUser}>Déconnexion</p>
          </>
        ) : (
          <>
            <NavLink to="/login" className="header-link" activeClassName="selected">Se connecter</NavLink>
            <NavLink to="/signup" className="header-link" activeClassName="selected">S'inscrire</NavLink>
          </>
        )}
      </ul>
      <label className="header-dropdown">
        <div className="dd-button"><FaBars /></div>
        <ul className="dd-menu">
          <li><NavLink to="/activities" activeClassName="selected">Activités</NavLink></li>
          <li><NavLink to="/organizer" activeClassName="selected">Organiseur</NavLink></li>
          {currentUser.isLogged ? (
            <>
              <li><NavLink to="/profile" activeClassName="selected">Mon compte</NavLink></li>
              {currentUser.isAdmin && (
                <li><NavLink to="/admin" activeClassName="selected">Admin</NavLink></li>
              )}
              <li><p className="pointer" onClick={logoutUser}>Déconnexion</p></li>
            </>
          ) : (
            <>
              <li><NavLink to="/login" activeClassName="selected">Se connecter</NavLink></li>
              <li><NavLink to="/signup" activeClassName="selected">S'inscrire</NavLink></li>
            </>
          )}
        </ul>
      </label>
    </nav>
  </header>
);

Header.propTypes = {
  currentUser: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

export default Header;
