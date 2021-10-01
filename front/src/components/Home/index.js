// == Import de la lib React
import React from 'react';

// == Import npm
// import { Link } from 'react-router-dom';
// == Import Swiper.js
import { Swiper, SwiperSlide } from 'swiper/react';

// import Swiper core and required modules
import SwiperCore, {
  Pagination,
  Navigation,
} from 'swiper/core';

import {
  VscArrowSmallRight,
} from 'react-icons/vsc';

import { Link } from 'react-router-dom';
import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.min.css';

// == Imports locaux
import Monuments from 'src/assets/images/slider-home/monuments.jpg';
import Restaurants from 'src/assets/images/slider-home/restaurants.jpg';
import Activites from 'src/assets/images/slider-home/activites.jpg';
import Musee from 'src/assets/images/slider-home/musee.jpg';
import Concerts from 'src/assets/images/slider-home/concerts.jpg';

import CloudAnimation from 'src/components/CloudAnimation';
import './style.scss';

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

const Home = () => (
  <div className="home">
    <div className="home-introduction">
      <h1 className="home-introduction-title">La Ville des Lumières vous attend... </h1>
      <p className="home-introduction-description">Pour commencer votre aventure, cliquez sur le bouton pour voir toutes les activités ou <br />sur un thême en dessous pour une découverte plus precise.
      </p>
      <Link to="/activities" className="home-link">Tout voir →</Link>
    </div>
    <Swiper
      slidesPerView={3}
      spaceBetween={12}
      navigation
      loop
      pagination={{
        clickable: true,
      }}
      className="home-swiper desktop"
    >

      <SwiperSlide className="home-swiper-slide" style={{ backgroundImage: `url(${Monuments})` }}>
        <div className="home-swiper-slide-corner">
          <Link to="/activities"><VscArrowSmallRight className="home-swiper-slide-icon" /></Link>
        </div>
        <Link to="/activities"><h2 className="home-swiper-slide-title">Monuments</h2></Link>
        <p className="home-swiper-slide-description">On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions.</p>
      </SwiperSlide>
      <SwiperSlide className="home-swiper-slide" style={{ backgroundImage: `url(${Restaurants})` }}>
        <div className="home-swiper-slide-corner">
          <Link to="/activities"><VscArrowSmallRight className="home-swiper-slide-icon" /></Link>
        </div>
        <Link to="/activities"><h2 className="home-swiper-slide-title">Restaurants</h2></Link>
        <p className="home-swiper-slide-description">On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions.</p>
      </SwiperSlide>
      <SwiperSlide className="home-swiper-slide" style={{ backgroundImage: `url(${Activites})` }}>
        <div className="home-swiper-slide-corner">
          <Link to="/activities"><VscArrowSmallRight className="home-swiper-slide-icon" /></Link>
        </div>
        <Link to="/activities"><h2 className="home-swiper-slide-title">Activités</h2></Link>
        <p className="home-swiper-slide-description">On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions.</p>
      </SwiperSlide>
      <SwiperSlide className="home-swiper-slide" style={{ backgroundImage: `url(${Musee})` }}>
        <div className="home-swiper-slide-corner">
          <Link to="/activities"><VscArrowSmallRight className="home-swiper-slide-icon" /></Link>
        </div>
        <Link to="/activities"><h2 className="home-swiper-slide-title">Musées</h2></Link>
        <p className="home-swiper-slide-description">On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions.</p>
      </SwiperSlide>
      <SwiperSlide className="home-swiper-slide" style={{ backgroundImage: `url(${Concerts})` }}>
        <div className="home-swiper-slide-corner">
          <Link to="/activities"><VscArrowSmallRight className="home-swiper-slide-icon" /></Link>
        </div>
        <Link to="/activities"><h2 className="home-swiper-slide-title">Concerts</h2></Link>
        <p className="home-swiper-slide-description">On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions.</p>
      </SwiperSlide>
    </Swiper>

    <Swiper
      slidesPerView={1}
      spaceBetween={12}
      navigation
      loop
      pagination={{
        clickable: true,
      }}
      className="home-swiper mobile"
    >

      <SwiperSlide className="home-swiper-slide" style={{ backgroundImage: `url(${Monuments})` }}>
        <div className="home-swiper-slide-corner">
          <Link to="/activities"><VscArrowSmallRight className="home-swiper-slide-icon" /></Link>
        </div>
        <Link to="/activities"><h2 className="home-swiper-slide-title">Monuments</h2></Link>
        <p className="home-swiper-slide-description">On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions.</p>
      </SwiperSlide>
      <SwiperSlide className="home-swiper-slide" style={{ backgroundImage: `url(${Restaurants})` }}>
        <div className="home-swiper-slide-corner">
          <Link to="/activities"><VscArrowSmallRight className="home-swiper-slide-icon" /></Link>
        </div>
        <Link to="/activities"><h2 className="home-swiper-slide-title">Restaurants</h2></Link>
        <p className="home-swiper-slide-description">On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions.</p>
      </SwiperSlide>
      <SwiperSlide className="home-swiper-slide" style={{ backgroundImage: `url(${Activites})` }}>
        <div className="home-swiper-slide-corner">
          <Link to="/activities"><VscArrowSmallRight className="home-swiper-slide-icon" /></Link>
        </div>
        <Link to="/activities"><h2 className="home-swiper-slide-title">Activités</h2></Link>
        <p className="home-swiper-slide-description">On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions.</p>
      </SwiperSlide>
      <SwiperSlide className="home-swiper-slide" style={{ backgroundImage: `url(${Musee})` }}>
        <div className="home-swiper-slide-corner">
          <Link to="/activities"><VscArrowSmallRight className="home-swiper-slide-icon" /></Link>
        </div>
        <Link to="/activities"><h2 className="home-swiper-slide-title">Musées</h2></Link>
        <p className="home-swiper-slide-description">On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions.</p>
      </SwiperSlide>
      <SwiperSlide className="home-swiper-slide" style={{ backgroundImage: `url(${Concerts})` }}>
        <div className="home-swiper-slide-corner">
          <Link to="/activities"><VscArrowSmallRight className="home-swiper-slide-icon" /></Link>
        </div>
        <Link to="/activities"><h2 className="home-swiper-slide-title">Concerts</h2></Link>
        <p className="home-swiper-slide-description">On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions.</p>
      </SwiperSlide>
    </Swiper>

    <CloudAnimation />
  </div>
);

export default Home;
