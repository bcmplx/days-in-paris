/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import api from 'src/api';
import {
  AiOutlineMenu,
  AiOutlineCheck,
  AiOutlineClose,
} from 'react-icons/ai';
import '../style.scss';

const TabCalendars = ({ setCalendars, calendars }) => {
  const [inputValue, setInputValue] = useState({
    id: null,
    title: null,
    startDate: null,
    endDate: null,
    lng: null,
    lat: null,
  });
  const [message, setMessage] = useState({
    message: null,
    class: null,
  });
  const initializeState = () => {
    setTimeout(() => {
      setMessage({
        text: '',
        class: '',
      });
    }, 5000);
  };
  const deleteCalendar = async (id) => {
    try {
      const { data } = await api.delete(`/admin/calendar/delete/${id}`);
      setCalendars(data);
      setMessage({
        text: 'Calendar supprimé avec succès.',
        class: 'green',
      });
      initializeState();
    }
    catch (error) {
      console.log(error);
      setMessage({
        text: 'Oups, une erreur est survenue. Veuillez réessayer ultérieurement',
        class: 'red',
      });
      initializeState();
    }
  };
  const initializeInputValue = async (elem) => {
    setInputValue({
      id: elem.id,
      title: elem.title,
      startDate: elem.start_date,
      endDate: elem.end_date,
      lng: elem.lng,
      lat: elem.lat,
    });
  };
  const closeUpdate = async () => {
    setInputValue({
      id: null,
      name: null,
      photoUrl: null,
      formattedAddress: null,
      lat: null,
      lng: null,
    });
  };
  const handleChange = async (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };
  const submit = async () => {
    try {
      const { data } = await api.patch('/admin/calendar/update', inputValue);
      // Mettre a jour la liste
      setCalendars(data);
      // remettre a 0 le state input Value
      closeUpdate();
      // et afficher une alerte success
      setMessage({
        text: 'Calendar mis a jour avec succès.',
        class: 'green',
      });
      initializeState();
    }
    catch (error) {
      console.log(error);
      setMessage({
        text: 'Oups, une erreur est survenue. Veuillez réessayer ultérieurement',
        class: 'red',
      });
      initializeState();
    }
  };
  return (
    <div className="admin-tab">
      {message.text && (
      <div className={`message ${message.class}`}>
        <p>{message.text}</p>
      </div>
      )}
      <h1 className="admin-tab-title">Calendars</h1>
      <table>

        <tr className="admin-tab-header">
          <th>id</th>
          <th>Titre</th>
          <th>Date de debut</th>
          <th>Date de fin</th>
          <th>Lng</th>
          <th>Lat</th>
          <th></th>
        </tr>
        {calendars.map((elem) => {
          let a = null;
          a = inputValue.id === elem.id
            ? (
              <tr className="admin-tab-elem">
                <td>{elem.id}</td>
                <td><input className="admin-tab-elem-input" type="text" name="title" value={inputValue.title} onChange={handleChange} /></td>
                <td><input className="admin-tab-elem-input" type="text" name="startDate" value={inputValue.startDate} onChange={handleChange} /></td>
                <td><input className="admin-tab-elem-input" type="text" name="endDate" value={inputValue.endDate} onChange={handleChange} /></td>
                <td><input className="admin-tab-elem-input" type="text" name="lng" value={inputValue.lng} onChange={handleChange} /></td>
                <td><input className="admin-tab-elem-input" type="text" name="lat" value={inputValue.lat} onChange={handleChange} /></td>
                <td className="admin-tab-elem-icons">
                  <AiOutlineCheck className="admin-tab-elem-icons-icon color-green" onClick={submit} />
                  <AiOutlineClose className="admin-tab-elem-icons-icon color-red" onClick={closeUpdate} />
                </td>
              </tr>
            )
            : (
              <tr className="admin-tab-elem">
                <td>{elem.id}</td>
                <td>{elem.title}</td>
                <td>{elem.start_date}</td>
                <td>{elem.end_date}</td>
                <td>{elem.lng}</td>
                <td>{elem.lat}</td>
                <label className="dropdown">
                  <div className="dd-button">
                    <AiOutlineMenu />
                  </div>

                  <ul className="dd-menu">
                    <li onClick={() => {
                      initializeInputValue(elem);
                    }}
                    >Modifier
                    </li>
                    <li onClick={() => {
                      deleteCalendar(elem.id);
                    }}
                    >Supprimer
                    </li>
                  </ul>
                </label>
              </tr>
            );
          return a;
        })}
      </table>
    </div>
  );
};

TabCalendars.propTypes = {
  calendars: PropTypes.array.isRequired,
  setCalendars: PropTypes.func.isRequired,
};

export default TabCalendars;
