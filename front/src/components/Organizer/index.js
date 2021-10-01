// == Import de la lib React
import React, { useState, useEffect } from 'react';

// == Import npm
import PropTypes from 'prop-types';

// == Imports locaux
import './style.scss';
import api from 'src/api';
import Calendar from 'src/components/Calendar';
import Wishlist from 'src/components/Wishlist';
import Modale from 'src/components/Modale';
import Loading from 'src/components/Loading';
import defaultImg from 'src/assets/images/test-card.jpg';
import Footer from 'src/components/Footer';

const Organizer = ({ isLogged }) => {
  const [Open, setOpen] = useState(false);
  const [modalName, setModalName] = useState('');
  const [modalLat, setModalLat] = useState(0);
  const [modalLng, setModalLng] = useState(0);
  const [loader, setLoader] = useState(false);
  const [wishlistData, setWishlistData] = useState([]);
  const [calendarAddedOne, setCalendarAddedOne] = useState([]);

  useEffect(async () => {
    setLoader(true);
    // call DB for wishlist data
    // might come back to this later with a setTimeOut or other option
    try {
      const result = await api.get('/wishlist');
      console.log(result.data);
      if (result.data.length > 0) {
        setWishlistData(result.data);
      }
      else {
        setWishlistData([{
          id: 'no',
          name: 'Aucune Activité en Wishlist',
          imgUrl: defaultImg,
        }]);
      }
    }
    catch (err) {
      console.log(err);
      setWishlistData([{
        id: 'no',
        name: 'Aucune Activité en Wishlist',
        imgUrl: defaultImg,
      }]);
    }

    // call DB for calendar data
    setLoader(false);
  }, [isLogged]);

  const handleOpen = (name, lat, lng) => {
    setModalName(name);
    setModalLng(lng);
    setModalLat(lat);

    // open the modal
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addActivityToCalendar = async (activityScheduled) => {
    try {
      const response = await api.post('/calendar/add', activityScheduled);
      console.log(response.data);
      setCalendarAddedOne(response.data);
    }
    catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {loader && <Loading />}
      {!loader && (
      <div className="organizer">
        {/* <h1 className="organizer-title">Organiseur</h1> */}
        <div className="organizer-content">
          <div className="organizer-left-column">
            <Calendar calendarAddedOne={calendarAddedOne} />
          </div>
          <div className="organizer-right-column">
            <div className="organizer-wishlist">
              <Wishlist onClickCalendar={handleOpen} />
            </div>
          </div>
        </div>
        <Modale
          addActivityToCalendar={addActivityToCalendar}
          handleClose={handleClose}
          open={Open}
          name={modalName}
          lat={modalLat}
          lng={modalLng}
        />
        <Footer />
      </div>
      )}
    </>
  );
};

Organizer.propTypes = {
  isLogged: PropTypes.bool.isRequired,
};

export default Organizer;
