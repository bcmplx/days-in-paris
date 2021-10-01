/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  AiOutlineMenu,
  AiOutlineCheck,
  AiOutlineClose,
} from 'react-icons/ai';
import api from 'src/api';
import '../style.scss';

const TabActivities = ({ setActivities, activities }) => {
  const [inputValue, setInputValue] = useState({
    id: null,
    name: null,
    photoUrl: null,
    formattedAddress: null,
    lat: null,
    lng: null,
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
  const deleteActivities = async (id) => {
    try {
      console.log(id);
      const { data } = await api.delete(`/admin/activity/delete/${id}`);
      setActivities(data);
      setMessage({
        text: 'Activitité supprimé avec succès.',
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
      name: elem.name,
      photoUrl: elem.photo_url,
      formattedAddress: elem.formatted_address,
      lat: elem.lat,
      lng: elem.lng,
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
      const { data } = await api.patch('/admin/activity/update', inputValue);
      // Mettre a jour la liste
      setActivities(data);
      // remettre a 0 le state input Value
      closeUpdate();
      // et afficher une alerte success
      setMessage({
        text: 'Activité mis a jour avec succès.',
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
      <h1 className="admin-tab-title">Activities</h1>
      <table>

        <tr className="admin-tab-header">
          <th>id</th>
          <th>Nom</th>
          <th>Adresse</th>
          <th>Lat</th>
          <th>Lng</th>
          <th></th>
        </tr>
        {activities.map((elem) => {
          let a = null;
          a = inputValue.id === elem.id
            ? (
              <tr className="admin-tab-elem">
                <td>{elem.id}</td>
                <td><input className="admin-tab-elem-input" type="text" name="name" value={inputValue.name} onChange={handleChange} /></td>
                <td><input className="admin-tab-elem-input" type="text" name="formattedAddress" value={inputValue.formattedAddress} onChange={handleChange} /></td>
                <td><input className="admin-tab-elem-input" type="text" name="lat" value={inputValue.lat} onChange={handleChange} /></td>
                <td><input className="admin-tab-elem-input" type="text" name="lng" value={inputValue.lng} onChange={handleChange} /></td>
                <td className="admin-tab-elem-icons">
                  <AiOutlineCheck className="admin-tab-elem-icons-icon color-green" onClick={submit} />
                  <AiOutlineClose className="admin-tab-elem-icons-icon color-red" onClick={closeUpdate} />
                </td>
              </tr>
            )
            : (
              <tr className="admin-tab-elem">
                <td>{elem.id}</td>
                <td>{elem.name}</td>
                <td>{elem.formatted_address}</td>
                <td>{elem.lat}</td>
                <td>{elem.lng}</td>

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
                      deleteActivities(elem.id);
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

TabActivities.propTypes = {
  activities: PropTypes.array.isRequired,
  setActivities: PropTypes.func.isRequired,
};

export default TabActivities;
