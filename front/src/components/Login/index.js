/* eslint-disable react/self-closing-comp */
// == Import de la lib React
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
// == Import npm
import {
  RiMailLine,
  RiLock2Line,
} from 'react-icons/ri';
// == Imports locaux
import backgroundStatic from 'src/assets/images/background-login.jpg';
import Field from 'src/components/Field';
import Loading from 'src/components/Loading';
import api from 'src/api';
import './style.scss';

const Login = ({ loginUser }) => {
  const history = useHistory();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState({
    submit: '',
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

  const validateEmail = (e) => {
    // eslint-disable-next-line no-control-regex
    const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    setError({
      ...error,
      email: !regex.test(e.target.value),
    });
  };

  const handleSubmit = (e) => {
    setLoader(true);
    try {
      e.preventDefault();
      if (user.email.trim().length > 0 && user.password.trim().length > 0) {
        api.post('/login', user)
          .then((response) => {
            const { firstName, token, isAdmin } = response.data;
            localStorage.setItem('firstName', firstName);
            localStorage.setItem('token', token);
            localStorage.setItem('isAdmin', isAdmin);

            loginUser(firstName, token, isAdmin, true);

            console.log(history.location);
            if (history.location.pathname === '/login') {
              history.push('/');
            }
          })
          .catch(() => {
            setError({
              ...error,
              submit: 'Email et/ou mot de passe incorrect(s).',
            });
            setTimeout(() => {
              setError({
                ...error,
                submit: '',
              });
            }, 6000);
          });
      }
      else {
        setError({
          ...error,
          submit: 'Tous les champs doivent être remplis',
        });
        setTimeout(() => {
          setError({
            ...error,
            submit: '',
          });
        }, 6000);
      }
    }
    catch (err) {
      console.log(err);
    }
    setLoader(false);
  };

  return (
    <>
      {loader && <Loading />}
      {!loader && (
      <>
        <div className="login">
          <div className="login-image" style={{ backgroundImage: `url('${backgroundStatic}')` }}></div>
          <div className="login-right">
            <form className="login-right-form" onSubmit={handleSubmit}>
              <h1 className="login-right-form-title">Connexion</h1>
              {error.submit && (
              <div className="error">
                <p className="error-message">{error.submit}</p>
              </div>
              )}
              <div className="login-right-form-input">
                <RiMailLine className="login-right-form-input-logo" />
                <Field
                  value={user.email}
                  type="email"
                  name="email"
                  onChange={inputChange}
                  placeholder="Email"
                  handleBlur={validateEmail}
                />
                {/* <input type="email" placeholder="email" /> */}
              </div>
              {error.email && (
              <p className="login-right-form-error">L'email doit être au format suivant: president@whitehouse.com.</p>
              )}

              <div className="login-right-form-input">
                <RiLock2Line className="login-right-form-input-logo" />
                <Field
                  value={user.password}
                  type="password"
                  name="password"
                  onChange={inputChange}
                  placeholder="Mot de passe"
                />
                {/* <input type="password" placeholder="mot de passe" /> */}
              </div>

              <input type="submit" className="login-right-form-submit" value="Valider" />
              <Link to="/signup" className="login-right-form-link">Pas encore de profil ? Inscrivez-vous!</Link>
            </form>
            <footer className="login-right-footer">
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

export default Login;
