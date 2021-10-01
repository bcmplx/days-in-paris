/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
import React from 'react';
import PropTypes from 'prop-types';
import { MdFavorite } from 'react-icons/md';
import { FaMapMarkerAlt } from 'react-icons/fa';
import {
  AiFillStar,
  AiOutlineStar,
} from 'react-icons/ai';
import './style.scss';

const Activity = ({
  name,
  formatted_address,
  photoUrl,
  rating,
  modal,
  geometry,
  user_ratings_total,
  addActivity,
}) => {
  const getStar = (note) => {
    const tab = [];
    for (let i = 1; i < 6; i++) {
      if (i < note) {
        tab.push(<AiFillStar key={i} />);
      }
      else {
        tab.push(<AiOutlineStar key={i} />);
      }
    }
    return tab;
  };
  return (
    <div className="activities-card" style={{ backgroundImage: `url(${photoUrl})` }}>
      <MdFavorite className="activities-card-logo-fav" onClick={() => addActivity(name, photoUrl, formatted_address, geometry.location.lat, geometry.location.lng)} />
      <FaMapMarkerAlt className="activities-card-logo-marker" onClick={() => modal(geometry.location)} />
      <div className="activities-card-data">
        <h2 className="activities-card-data-title">{name}</h2>
        <p className="activities-card-data-description">{formatted_address}</p>
        <p>{getStar(rating)} ({user_ratings_total} votes)</p>
      </div>
    </div>
  );
};

Activity.propTypes = {
  name: PropTypes.string.isRequired,
  formatted_address: PropTypes.string.isRequired,
  photoUrl: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  modal: PropTypes.func.isRequired,
  geometry: PropTypes.object.isRequired,
  user_ratings_total: PropTypes.number.isRequired,
  addActivity: PropTypes.func.isRequired,
};

export default Activity;
