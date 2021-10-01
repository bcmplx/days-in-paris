// == Import de la lib React
import React from 'react';

// == Import npm
import { RiCloseCircleLine } from 'react-icons/ri';
import { FaRegCalendarPlus } from 'react-icons/fa';
import defaultImg from 'src/assets/images/test-card.jpg';
import PropTypes from 'prop-types';

// == Imports locaux
import './style.scss';

const Card = ({
  name,
  photo_url: photoUrl,
  onClickDelete,
  onClickCalendar,
}) => (
  <div className="card">
    <div className="card-img" style={{ backgroundImage: `url(${photoUrl})` }} />
    <p className="card-title">{name}</p>
    <div>
      <FaRegCalendarPlus
        className="card-icon"
        onClick={onClickCalendar}
      />
      <RiCloseCircleLine
        className="card-icon"
        onClick={onClickDelete}
      />
    </div>
  </div>
);

Card.propTypes = {
  name: PropTypes.string.isRequired,
  photo_url: PropTypes.string,
  onClickDelete: PropTypes.func.isRequired,
  onClickCalendar: PropTypes.func.isRequired,
};

Card.defaultProps = {
  photo_url: defaultImg,
};

export default Card;
