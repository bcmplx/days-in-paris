import React from 'react';

// import Swiper core and required modules
import SwiperCore, {
  Pagination,
  Navigation,
} from 'swiper/core';

import { Link } from 'react-router-dom';
import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.min.css';

import './style.scss';
import video from '../../assets/videos/homevid.mp4';

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

const Home = () => (
  <div className="home">
    <video autoPlay loop muted id="home-video">
      <source src={video} type="video/mp4" />
    </video>
    <div className="home-introduction">
      <h1 className="home-introduction-title">La Ville des Lumières vous attend... </h1>
      <p className="home-introduction-description">Pour commencer votre aventure, cliquez sur le bouton pour voir toutes les activités ou <br />sur un thême en dessous pour une découverte plus precise.
      </p>
      <Link to="/activities" className="home-link">Tout voir →</Link>
    </div>
  </div>
);

export default Home;
