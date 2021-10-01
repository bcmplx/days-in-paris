// == Import de la lib React
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

// Import Modal
import Modal from 'react-modal';

// Import Map
import GoogleMapReact from 'google-map-react';

// == Import npm
import { VscSearch } from 'react-icons/vsc';
import { IoAddOutline } from 'react-icons/io5';
// == Imports locaux
import api from 'src/api';
// import dataActivities from 'src/data/activities';
import Loading from 'src/components/Loading';
import Menu from 'src/components/Menu';
import Footer from 'src/components/Footer';
import MenuFilter from './MenuFilter';
import Activity from './Activity';
import Marker from './Marker';

import './style.scss';

const Activities = ({ isLogged }) => {
  const history = useHistory();
  // Déclaration du state
  const [inputValue, setInputValue] = useState('');
  const [loader, setLoader] = useState(false);
  const [loaderNextPage, setLoaderNextPage] = useState(false);
  const [allActivities, setAllActivities] = useState([]);
  const [filterActivities, setFilterActivities] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [nextPageTokenAllActivities, setTokenAll] = useState('');
  const [nextPageToken, setNextPageToken] = useState({
    nextPage: '',
    category: '',
  });
  const [propsMap, setPropsMap] = useState({
    center: {
      lat: null,
      lng: null,
    },
    zoom: 11,
  });

  useEffect(async () => {
    // Sert a initialize les activités au premier render
    // C'est d'ailleurs ici que l'on viendra faire l'appel de l'API
    setLoader(true);
    try {
      const response = await api.get('/activities');
      const events = response.data.events.results;
      console.log(response);
      const data = events.map((elem, index) => (
        {
          ...elem,
          photoUrl: response.data.photos[index],
        }
      ));
      setTokenAll(response.data.events.next_page_token);
      setNextPageToken({
        nextPage: response.data.events.next_page_token,
        category: 'All',
      });
      setAllActivities(data);
      setFilterActivities(data);

      if (isLogged) {
        const result = await api.get('/wishlist');
        setWishList(result.data);
      }
    }
    catch (err) {
      console.log(err);
    }
    setLoader(false);

    // add active class to all menu
    const activeMenu = document.querySelector('#All');
    activeMenu.classList.add('active');
  }, [isLogged]);

  // add activity dans la wishlist
  const addActivityToWishList = async (name, photoUrl, formattedAddress, lat, lng) => {
    if (isLogged) {
      const activity = {
        name,
        photoUrl,
        formattedAddress,
        lat,
        lng,
      };
      const response = await api.post('/wishlist/add', activity);
      setWishList(response.data);
    }
    else {
      history.push('/login');
    }
  };

  const deleteActivityToWishList = async (activityId) => {
    try {
      const result = await api.post('/wishlist/delete', {
        activityId,
      });
      setWishList(result.data);
    }
    catch (error) {
      console.log(error);
    }
  };

  const deleteAllActivitiesToWishList = async () => {
    try {
      const result = await api.get('/wishlist/delete/all');
      setWishList(result.data);
    }
    catch (error) {
      console.log(error);
    }
  };

  const handlerChange = (e) => {
    setInputValue(e.target.value);
  };

  const getFilterActivities = () => filterActivities.filter((activity) => (
    activity.name.toLowerCase().includes(inputValue.toLowerCase())
  ));

  const nextPage = async () => {
    setLoaderNextPage(true);
    try {
      const { data } = await api.post('/activities/category', nextPageToken);
      console.log(data);

      const events = data.events.results;
      const newTab = events.map((elem, index) => (
        {
          ...elem,
          photoUrl: data.photos[index],
        }
      ));
      setNextPageToken({
        ...nextPageToken,
        nextPage: data.events.next_page_token,
      });
      setFilterActivities(filterActivities.concat(newTab));
    }
    catch (error) {
      console.log(error);
    }
    setLoaderNextPage(false);
  };

  // Fonction de filter par categories (pour le menu de gauche)
  const getFilterActivitiesByCategories = async (e) => {
    if (e.target.dataset.name === 'All') {
      setFilterActivities(allActivities);
      setNextPageToken({
        nextPage: nextPageTokenAllActivities,
        category: e.target.dataset.name,
      });
    }
    else {
      setLoader(true);
      try {
        console.log(e.target.dataset.name);
        console.log(nextPageToken);

        const { data } = await api.post('/activities/category', {
          category: e.target.dataset.name,
          nextPage: '',
        });
        console.log(data.events.results);
        const events = data.events.results;
        const newTab = events.map((elem, index) => (
          {
            ...elem,
            photoUrl: data.photos[index],
          }
        ));
        console.log(newTab);
        setFilterActivities(newTab);
        setNextPageToken({
          nextPage: data.events.next_page_token,
          category: e.target.dataset.name,
        });
      }
      catch (error) {
        console.log(error);
      }
      setLoader(false);

      // add active class to menu active
      const activeMenu = document.querySelector(`#${e.target.dataset.name}`);
      activeMenu.classList.add('active');
    }
  };

  // Configuration de la modal

  const openModal = (location) => {
    setPropsMap({
      center: {
        lat: location.lat,
        lng: location.lng,
      },
      zoom: 15,
    });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '500px',
      height: '500px',
    },
  };

  Modal.setAppElement('#root');

  // Configuration Map

  return (
    <>
      {loader && <Loading />}
      {!loader && (
      <>
        <MenuFilter filterByCategories={getFilterActivitiesByCategories} />
        <Menu
          activities={wishList}
          deleteActivityWl={deleteActivityToWishList}
          deleteAll={deleteAllActivitiesToWishList}
        />
        <div className="activities">
          <h1 className="activities-title">Activités</h1>
          <form className="activities-searchbar">
            <input type="text" placeholder="Recherche sur Paris..." value={inputValue} onChange={handlerChange} />
            <VscSearch />
          </form>
          <div className="activities-select">
            <select onChange={getFilterActivitiesByCategories}>
              <option data-name="All">Toutes les activités</option>
              <option data-name="tourist_attraction">Monuments</option>
              <option data-name="museum">Musée</option>
              <option data-name="point_of_interest">Point d'intérêt</option>
              <option data-name="establishment">Établissement</option>
              <option data-name="church">Église</option>
              <option data-name="place_of_worship">Lieu de culte</option>
              <option data-name="park">Parc</option>
              <option data-name="amusement_park">Parc d'attractions</option>
              <option data-name="restaurant">Restaurants</option>
              <option data-name="food">Food</option>
            </select>
          </div>
          {/* Modal */}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div style={{ height: '100%', width: '100%' }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyDCqRoeXO6_-sKWQvZID-RmRtebhc-OhNs' }}
                defaultCenter={propsMap.center}
                defaultZoom={propsMap.zoom}
              >
                <Marker
                  lat={propsMap.center.lat}
                  lng={propsMap.center.lng}
                />
              </GoogleMapReact>
            </div>
          </Modal>

          <div className="activities-list">
            {getFilterActivities().map((elem) => (
              <Activity
                {...elem}
                modal={openModal}
                key={elem.name}
                addActivity={addActivityToWishList}
              />
            ))}
          </div>

          {loaderNextPage && (
          <div className="activities-loader_next_page">
            <Loading />
          </div>
          )}
          {!loaderNextPage && (
            <div className="activities-nextpage" onClick={nextPage}>
              <IoAddOutline className="activities-nextpage-icon" />
              <p className="activities-nextpage-text">Plus d'activités</p>
            </div>
          )}
        </div>
        <Footer />
      </>
      )}
    </>
  );
};

Activities.propTypes = {
  isLogged: PropTypes.bool.isRequired,
};

export default Activities;
