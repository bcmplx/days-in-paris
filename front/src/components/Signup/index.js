/* eslint-disable react/self-closing-comp */
// == Import de la lib React
import React, { useState, useLayoutEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
// == Import npm
import classNames from 'classnames';
import {
  RiLock2Line,
  RiUser3Line,
  RiMailLine,
} from 'react-icons/ri';
// == Imports locaux
import api from 'src/api';
import backgroundStatic from 'src/assets/images/background-signup.jpg';
import Field from 'src/components/Field';
import Loading from 'src/components/Loading';
import PswdCheck from './Validates/PasswordCheck';
import './style.scss';

const Signup = ({ loginUser }) => {
  const history = useHistory();
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
  });

  const [loader, setLoader] = useState(false);

  const inputChange = (value, name) => {
    setUser({
      ...user,
      [name]: value,
    });
  };

  const validateLastName = (e) => {
    const regex = /[a-zA-Z]{2,30}/;
    setError({
      ...error,
      lastName: !regex.test(e.target.value),
    });
    // ici les validates ce feront en temps reel grace a levent onblur,
    // que je viens de decouvrir a 00:16
  };

  const validateFirstName = (e) => {
    const regex = /([a-zA-Z]{2,30}\s*)+/;
    setError({
      ...error,
      firstName: !regex.test(e.target.value),
    });
  };

  const validateEmail = (e) => {
    const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    setError({
      ...error,
      email: !regex.test(e.target.value),
    });
  };

  const validatePassword = (value) => {
    setError({
      ...error,
      password: value,
    });
  };

  const handleSubmit = async (e) => {
    setLoader(true);
    try {
      e.preventDefault();
      if (Object.values(user).every((item) => item.length > 0)) {
        api.post('/signup', user)
          .then((response) => {
            const { token } = response.data;
            const isAdmin = false;
            localStorage.setItem('firstName', user.firstName);
            localStorage.setItem('token', token);
            localStorage.setItem('isAdmin', isAdmin);

            loginUser(user.firstName, token, isAdmin, true);

            history.push('/');
          })
          .catch((err) => {
            // Gerer les adresses mails (qui existent déjà).
            console.log(err);
          });
      } else {
        console.log('remplir tout les champs');
      }
    }
    catch (error) {
      console.log(error);
    }
    setLoader(false);
  };

  return (
    <>
      {loader && <Loading />}
      {!loader && (
      <>
        <div className="signup">
          <div className="signup-image" style={{ backgroundImage: `url('${backgroundStatic}')` }}></div>
          <div className="signup-right">
            <form className="signup-right-form" onSubmit={handleSubmit}>
              <h1 className="signup-right-form-title">S'inscrire</h1>

              <div className="signup-right-form-row">
                <div className="signup-right-form-input input-row-left">
                  <RiUser3Line className="signup-right-form-input-logo" />
                  <Field
                    value={user.lastName}
                    type="text"
                    name="lastName"
                    onChange={inputChange}
                    placeholder="Nom"
                    handleBlur={validateLastName}
                  />
                  {/* <input type="text" placeholder="Nom" */}
                </div>

                <div className="signup-right-form-input input-row-right">
                  <RiUser3Line className="signup-right-form-input-logo" />
                  <Field
                    value={user.firstName}
                    type="text"
                    name="firstName"
                    onChange={inputChange}
                    placeholder="Prenom"
                    handleBlur={validateFirstName}
                  />
                  {/* <input type="text" placeholder="Prenom" /> */}
                </div>
              </div>
              {error.lastName && (
              <p className="signup-right-form-error">Le nom ne doit contenir que des lettre entre 2 et 30 caractères.</p>
              )}
              {error.firstName && (
              <p className="signup-right-form-error">Le nom ne doit contenir que des lettre entre 2 et 30 caractères.</p>
              )}

              <div className="signup-right-form-input">
                <RiMailLine className="signup-right-form-input-logo" />
                <Field
                  value={user.email}
                  type="email"
                  name="email"
                  onChange={inputChange}
                  placeholder="Email"
                  handleBlur={validateEmail}
                />
                {/* <input type="email" placeholder="Email" /> */}
              </div>
              {error.email && (
              <p className="signup-right-form-error">L'email doit être au format suivant: president@whitehouse.com.</p>
              )}

              <div className="signup-right-form-input">
                <RiLock2Line className="signup-right-form-input-logo" />
                <Field
                  value={user.password}
                  type="password"
                  name="password"
                  onChange={inputChange}
                  placeholder="Mot de passe"
                />
                {/* <input type="password" placeholder="Mot de passe" /> */}
              </div>

              <div className="signup-right-form-input">
                <RiLock2Line className="signup-right-form-input-logo" />
                <Field
                  value={user.confirmPassword}
                  type="password"
                  name="confirmPassword"
                  onChange={inputChange}
                  placeholder="Confirmation du mot de passe"
                />
                {/* <input type="password" placeholder="Confirmation mot de passe" /> */}
              </div>

              <PswdCheck
                password={user.password}
                passwordConfirm={user.confirmPassword}
                valid={validatePassword}
              />

              <input type="submit" className="signup-right-form-submit" value="Valider" />
              <Link to="/login" className="signup-right-form-link">Déjà un profil ? Connectez-vous !</Link>
            </form>
            <footer className="signup-right-footer">
              <Link to="/legal-notice">Mentions légales</Link>
              <Link to="/data-protection">Protection des données</Link>
            </footer>
          </div>
        </div>
      </>
      )}
    </>

  );
};

Signup.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

export default Signup;
