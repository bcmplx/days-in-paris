import React from 'react';
import PropTypes from 'prop-types';
import {
  FaMonument,
  FaPlaceOfWorship,
} from 'react-icons/fa';
import { MdRestaurant } from 'react-icons/md';
import {
  GiMusicalNotes,
  GiSpartanHelmet,
  GiParkBench,
} from 'react-icons/gi';
import { BiChurch, BiGame } from 'react-icons/bi';
import {
  BsCheckAll,
  BsBuilding,
} from 'react-icons/bs';
import { IoFastFoodOutline } from 'react-icons/io5';

import './style.scss';

const MenuFilter = ({ filterByCategories }) => (
  <div className="menu-filter">
    <ul className="menu-filter-list">
      <li className="menu-filter-list-item" id="All" data-name="All" onClick={filterByCategories}><BsCheckAll className="menu-filter-list-item-logo" />Toutes les activités</li>
      <li className="menu-filter-list-item" id="tourist_attraction" data-name="tourist_attraction" onClick={filterByCategories}><FaMonument className="menu-filter-list-item-logo" />Monuments</li>
      <li className="menu-filter-list-item" id="museum" data-name="museum" onClick={filterByCategories}><GiSpartanHelmet className="menu-filter-list-item-logo" />Musée</li>
      <li className="menu-filter-list-item" id="point_of_interest" data-name="point_of_interest" onClick={filterByCategories}><GiMusicalNotes className="menu-filter-list-item-logo" />Point d'intérêt</li>
      <li className="menu-filter-list-item" id="establishment" data-name="establishment" onClick={filterByCategories}><BsBuilding className="menu-filter-list-item-logo" />Établissement</li>
      <li className="menu-filter-list-item" id="church" data-name="church" onClick={filterByCategories}><BiChurch className="menu-filter-list-item-logo" />Église</li>
      <li className="menu-filter-list-item" id="place_of_worship" data-name="place_of_worship" onClick={filterByCategories}><FaPlaceOfWorship className="menu-filter-list-item-logo" />Lieu de culte</li>
      <li className="menu-filter-list-item" id="park" data-name="park" onClick={filterByCategories}><GiParkBench className="menu-filter-list-item-logo" />Parc</li>
      <li className="menu-filter-list-item" id="amusement_park" data-name="amusement_park" onClick={filterByCategories}><BiGame className="menu-filter-list-item-logo" />Parc d'attractions</li>
      <li className="menu-filter-list-item" id="restaurant" data-name="restaurant" onClick={filterByCategories}><MdRestaurant className="menu-filter-list-item-logo" />Restaurants</li>
      <li className="menu-filter-list-item" id="food" data-name="food" onClick={filterByCategories}><IoFastFoodOutline className="menu-filter-list-item-logo" />Food</li>
    </ul>
  </div>
);
MenuFilter.propTypes = {
  filterByCategories: PropTypes.func,
};

MenuFilter.defaultProps = {
  filterByCategories: () => {},
};

export default MenuFilter;
