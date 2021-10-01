// == Import de la lib React
import React, { useState, useEffect } from 'react';

// == Import npm
// trash icon
import { FaTrashAlt } from 'react-icons/fa';
// confirmation modale package
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import PropTypes from 'prop-types';

// == Imports locaux
import './style.scss';
import api from 'src/api';
import defaultImg from 'src/assets/images/test-card.jpg';
import Card from './Card';

const Wishlist = ({ onClickCalendar }) => {
  // declaration du state
  const [wishlist, setWishlist] = useState([]);

  useEffect(async () => {
    try {
      const result = await api.get('/wishlist');
      console.log('wishlist data', result.data);
      if (result.data.length > 0) {
        setWishlist(result.data);
      }
      else {
        setWishlist([{
          id: 'no',
          name: 'Aucune Activité en Wishlist',
          imgUrl: defaultImg,
        }]);
      }
    }
    catch (err) {
      console.log(err);
      setWishlist([{
        id: 'no',
        name: 'Aucune Activité en Wishlist',
        imgUrl: defaultImg,
      }]);
    }
  }, []);

  const handleWishlistDelete = async () => {
    try {
      const result = await api.get('/wishlist/delete/all');
      setWishlist(result.data);
      setWishlist([{
        id: 'no',
        name: 'Aucune Activité en Wishlist',
        photo_url: defaultImg,
      }]);
    }
    catch (error) {
      console.log(error);
    }
  };

  const submitDelete = () => {
    confirmAlert({
      title: '⚠ Supprimer la Wishlist',
      message: 'Etes-vous sûr de vouloir supprimer toutes les activités favorites?',
      buttons: [
        {
          label: 'SUPPRIMER',
          onClick: handleWishlistDelete,
        },
        {
          label: 'ANNULER',
          // onClick: () => alert('Click No'),
        },
      ],
    });
  };

  const handleClickDelete = async (activityId) => {
    console.log('activity id', activityId);
    try {
      const result = await api.post('/wishlist/delete', {
        activityId,
      });
      console.log('delete one from wishlist', result.data);
      if (result.data.length > 0) {
        setWishlist(result.data);
      }
      else {
        setWishlist([{
          id: 'no',
          name: 'Aucune Activité en Wishlist',
          imgUrl: defaultImg,
        }]);
        console.log('tableau vide');
      }
    }
    catch (error) {
      console.log('delete one from wishlist', error);
    }
  };

  return (
    <div className="wishlist">
      <div className="wishlist-header">
        <h2 className="wishlist-header-title">Activités en Favoris </h2>
        <FaTrashAlt className="wishlist-header-delete-icon" onClick={submitDelete} />
      </div>
      <div className="wishlist-content">
        {wishlist.map((activity) => (
          <Card
            {...activity}
            key={activity.activity_id}
            onClickDelete={() => {
              handleClickDelete(activity.activity_id);
            }}
            onClickCalendar={() => {
              onClickCalendar(activity.name, activity.lat, activity.lng);
            }}
          />
        ))}
      </div>
    </div>
  );
};

Wishlist.propTypes = {
  onClickCalendar: PropTypes.func.isRequired,
};

export default Wishlist;
