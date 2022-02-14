import React from 'react';
import PropTypes from 'prop-types';
import {
  // FaMonument,
  FaPlaceOfWorship,
} from 'react-icons/fa';
import { MdRestaurant } from 'react-icons/md';
import {
  GiMusicalNotes,
  GiSpartanHelmet,
  // GiParkBench,
} from 'react-icons/gi';
import { BiChurch } from 'react-icons/bi';
import {
  // BsCheckAll,
  BsBuilding,
} from 'react-icons/bs';
// import { IoFastFoodOutline } from 'react-icons/io5';

import './style.scss';

const MenuFilter = ({ filterByCategories }) => (
  <div className="menu-filter">
    <ul className="menu-filter-list">
      <li className="menu-filter-list-item" id="sights-museums" data-name="sights-museums" onClick={filterByCategories}><GiSpartanHelmet className="menu-filter-list-item-logo" />Museums</li>
      <li className="menu-filter-list-item" id="accomodation" data-name="accomodation" onClick={filterByCategories}><GiMusicalNotes className="menu-filter-list-item-logo" />accomodation</li>
      <li className="menu-filter-list-item" id="leisure-outdoor" data-name="leisure-outdoor" onClick={filterByCategories}><BsBuilding className="menu-filter-list-item-logo" />leisure-outdoor</li>
      <li className="menu-filter-list-item" id="airport" data-name="airport" onClick={filterByCategories}><BiChurch className="menu-filter-list-item-logo" />airport</li>
      <li className="menu-filter-list-item" id="shopping" data-name="shopping" onClick={filterByCategories}><FaPlaceOfWorship className="menu-filter-list-item-logo" />shopping</li>
      <li className="menu-filter-list-item" id="restaurant" data-name="restaurant" onClick={filterByCategories}><MdRestaurant className="menu-filter-list-item-logo" />Restaurants</li>
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
