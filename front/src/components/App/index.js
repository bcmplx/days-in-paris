// == Import npm
import React, { useEffect, useState } from 'react';
import {
  useHistory,
  Route,
  Switch,
} from 'react-router-dom';

// == Import locaux
import api from 'src/api';
import Home from 'src/components/Home';
import Activities from 'src/components/Activities';
import Organizer from 'src/components/Organizer';
import Login from 'src/components/Login';
import SignUp from 'src/components/Signup';
import Admin from 'src/components/Admin';
import Profile from 'src/components/Profile';
import LegalInfos from 'src/components/LegalInfos';
import SiteMap from 'src/components/SiteMap';
import Error from 'src/components/Error';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Frise from 'src/components/Frise';
import Loading from 'src/components/Loading';
import Team from 'src/components/Team';
import './styles.scss';

// == Composant
const App = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    firstName: null,
    token: null,
    isLogged: false,
    isAdmin: false,
  });
  const [loader, setLoader] = useState(false);

  const setLogged = (firstName, token, isAdmin, isLogged) => {
    console.log(isAdmin);
    setUser({
      firstName,
      token,
      isLogged,
      isAdmin,
    });

    // Permet de créer un header par défaut à chaque requete axios
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  const setLogout = () => {
    // En cas de déconnexion, on supprime ce header par défaut
    delete api.defaults.headers.common.Authorization;
    // Si on se logout, il faut aussi supprimer les localStorages pour nettoyer
    localStorage.removeItem('firstName');
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');

    setUser({
      firstName: null,
      token: null,
      isLogged: false,
      isAdmin: false,
    });
    history.push('/');
  };

  useEffect(() => {
    setLoader(true);
    const token = localStorage.getItem('token');
    const firstName = localStorage.getItem('firstName');
    const isAdmin = localStorage.getItem('isAdmin');

    if (token && firstName && isAdmin) {
      setLogged(firstName, token, isAdmin, true);
    }
    console.log(user);
    setLoader(false);
  }, []);

  const changeHeader = (firstNameChanged) => {
    // change the name on the header
    setUser({
      ...user,
      firstName: firstNameChanged,
    });
    // put it in localStorage for conservation
    localStorage.setItem('firstName', firstNameChanged);
  };

  const handleDeleteAccount = async () => {
    try {
      await api.delete('/profile/delete');
      // logout
      setUser({
        ...user,
        isLogged: false,
      });
      setLogout();
    }
    catch (err) {
      console.log('error delete account', err);
    }
  };

  return (
    <div className="app">
      <Header currentUser={user} logoutUser={setLogout} />
      {loader && <Loading />}
      {!loader && (
      <Switch>
        <Route path="/" exact>
          <Home />
          <Footer />
        </Route>
        <Route path="/activities">
          <Activities isLogged={user.isLogged} />
        </Route>
        <Route path="/organizer">
          {user.isLogged
            ? <Organizer isLogged={user.isLogged} />
            : <Login loginUser={setLogged} />}
        </Route>
        <Route path="/login">
          <Login loginUser={setLogged} />
        </Route>
        <Route path="/signup">
          <SignUp loginUser={setLogged} />
        </Route>
        <Route path="/admin">
          {
          user.isAdmin
            ? <Admin isAdmin={user.isAdmin} />
            : <Login loginUser={setLogged} />
        }
        </Route>
        <Route path="/profile">
          {user.isLogged
            ? <Profile isLogged={user.isLogged} changeHeader={changeHeader} handleDeleteAccount={handleDeleteAccount} />
            : <Login loginUser={setLogged} />}
          <Footer />
        </Route>
        <Route path="/legal-infos">
          <LegalInfos />
          <Footer />
        </Route>
        <Route path="/sitemap">
          <SiteMap />
          <Footer />
        </Route>
        <Route path="/team">
          <Team />
          <Footer />
        </Route>
        <Route>
          <Error code={404} />
          <Footer />
        </Route>
      </Switch>
      )}
    </div>
  );
};

// == Export
export default App;
