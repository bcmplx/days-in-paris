// == Import de la lib React
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

// == Import npm
import {
  AiOutlineUser,
  AiOutlineCalendar,
  AiOutlineOrderedList,
  AiOutlineHome,
} from 'react-icons/ai';
// == Imports locaux
import api from 'src/api';
import TabUsers from './Tab/TabUser';
import TabCalendars from './Tab/TabCalendars';
import TabActivities from './Tab/TabActivities';
import TabWishlists from './Tab/TabWishlists';
import './style.scss';

const Admin = ({ isAdmin }) => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [tabPrint, setTabPrint] = useState('');
  const [count, setCount] = useState({});

  const setDataFromTab = (tabData) => {
    setData(tabData);
  };

  const callUsers = async () => {
    try {
      const response = await api.get('/admin/users');
      setTabPrint('users');
      setData(response.data);
    }
    catch (error) {
      console.log(error);
    }
  };

  const callActivities = async () => {
    try {
      const response = await api.get('/admin/activities');
      console.log(response.data);
      setTabPrint('activities');
      setData(response.data);
    }
    catch (error) {
      console.log(error);
    }
  };

  const callCalendars = async () => {
    console.log('ici');
    try {
      const response = await api.get('/admin/calendars');
      setTabPrint('calendars');
      setData(response.data);
    }
    catch (error) {
      console.log(error);
    }
  };

  const callWishLists = async () => {
    try {
      const response = await api.get('/admin/wishlists');
      console.log(response.data);
      setTabPrint('wishlists');
      setData(response.data);
    }
    catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    try {
      if (isAdmin === 'false') {
        history.push('/');
      }
      const { data } = await api.get('/admin/count');
      setCount(data);
    }
    catch (error) {
      console.log(error);
    }
  }, [isAdmin]);

  return (
    <div className="admin">
      <div className="admin-group">
        <div className="admin-group-btn" onClick={callUsers}>
          <AiOutlineUser className="admin-group-btn-icon" />
          <div className="admin-group-btn-info">
            <p className="admin-group-btn-info-nbr">{count.users}</p>
            <p className="admin-group-btn-info-name">User</p>
          </div>
        </div>

        <div className="admin-group-btn" onClick={callActivities}>
          <AiOutlineHome className="admin-group-btn-icon" />
          <div className="admin-group-btn-info">
            <p className="admin-group-btn-info-nbr">{count.activities}</p>
            <p className="admin-group-btn-info-name">Activities</p>
          </div>
        </div>

        <div className="admin-group-btn" onClick={callWishLists}>
          <AiOutlineCalendar className="admin-group-btn-icon" />
          <div className="admin-group-btn-info">
            <p className="admin-group-btn-info-nbr">{count.wishlists}</p>
            <p className="admin-group-btn-info-name">Wishlist</p>
          </div>
        </div>

        <div className="admin-group-btn" onClick={callCalendars}>
          <AiOutlineOrderedList className="admin-group-btn-icon" />
          <div className="admin-group-btn-info">
            <p className="admin-group-btn-info-nbr">{count.calendars}</p>
            <p className="admin-group-btn-info-name">Calendar</p>
          </div>
        </div>
      </div>

      {tabPrint === 'users' && (
        <TabUsers setUsers={setDataFromTab} users={data} />
      )}
      {tabPrint === 'activities' && (
        <TabActivities setActivities={setDataFromTab} activities={data} />
      )}
      {tabPrint === 'calendars' && (
        <TabCalendars setCalendars={setDataFromTab} calendars={data} />
      )}
      {tabPrint === 'wishlists' && (
        <TabWishlists setWishlists={setDataFromTab} wishlists={data} />
      )}
    </div>
  );
};

Admin.propTypes = {
  isAdmin: PropTypes.string.isRequired,
};

export default Admin;
