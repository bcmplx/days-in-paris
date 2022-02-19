/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
import React from 'react';
import PropTypes from 'prop-types';
import { MdFavorite } from 'react-icons/md';
import { FaMapMarkerAlt } from 'react-icons/fa';
// import {
//   AiFillStar,
//   AiOutlineStar,
// } from 'react-icons/ai';
import './style.scss';

const Activity = ({
  title,
  vicinity,
  photoUrl,
  // rating,
  modal,
  position,
  // user_ratings_total,
  addActivity,
}) => (
  <div className="activities-card" style={{ backgroundImage: `url(${photoUrl})` }}>
    <MdFavorite className="activities-card-logo-fav" onClick={() => addActivity(title, photoUrl, position[0], position[1], vicinity)} />
    <FaMapMarkerAlt className="activities-card-logo-marker" onClick={() => modal(position[0], position[1])} />
    <div className="activities-card-data">
      <h2 className="activities-card-data-title">{title}</h2>
      <p className="activities-card-data-description">{vicinity}</p>
      {/* <p>{getStar(rating)} ({user_ratings_total} votes)</p> */}
    </div>
  </div>
);

Activity.propTypes = {
  title: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,

  vicinity: PropTypes.string.isRequired,
  photoUrl: PropTypes.string.isRequired,
  // rating: PropTypes.number.isRequired,
  modal: PropTypes.func.isRequired,
  // geometry: PropTypes.object.isRequired,
  // user_ratings_total: PropTypes.number.isRequired,
  addActivity: PropTypes.func.isRequired,
};

export default Activity;
