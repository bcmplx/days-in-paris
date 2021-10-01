/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DayJS from 'react-dayjs';
import api from 'src/api';
import {
  AiOutlineMenu,
  AiOutlineCheck,
  AiOutlineClose,
} from 'react-icons/ai';
import '../style.scss';

const TabUsers = ({ setUsers, users }) => {
  const [inputValue, setInputValue] = useState({
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    imgUrl: null,
    isAdmin: null,
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
  const deleteUser = async (id) => {
    try {
      const { data } = await api.delete(`/admin/user/delete/${id}`);
      setUsers(data);
      setMessage({
        text: 'Utilisateur supprimé avec succès.',
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
  const initializeInputValue = async (user) => {
    setInputValue({
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      imgUrl: user.img_url,
      isAdmin: user.is_admin,
    });
  };
  const closeUpdate = async () => {
    setInputValue({
      id: null,
      firstName: null,
      lastName: null,
      email: null,
      imgUrl: null,
      isAdmin: null,
    });
  };
  const handleChange = async (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };
  const submitUser = async () => {
    try {
      const { data } = await api.patch('/admin/user/update', inputValue);
      // Mettre a jour la liste
      setUsers(data);
      closeUpdate();
      setMessage({
        text: 'Utilisateur mis a jour avec succès.',
        class: 'green',
      });
      initializeState();
      // remettre a 0 le state input Value
      // et afficher une alerte success
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
      <h1 className="admin-tab-title">Users</h1>
      <table>

        <tr className="admin-tab-header">
          <th>id</th>
          <th>Nom</th>
          <th>Prenom</th>
          <th>Email</th>
          <th>Crée le</th>
          <th></th>
        </tr>
        {users.map((user) => {
          let a = null;
          a = inputValue.id === user.id
            ? (
              <tr className="admin-tab-elem">
                <td>{user.id}</td>
                <td><input className="admin-tab-elem-input" type="text" name="lastName" value={inputValue.lastName} onChange={handleChange} /></td>
                <td><input className="admin-tab-elem-input" type="text" name="firstName" value={inputValue.firstName} onChange={handleChange} /></td>
                <td><input className="admin-tab-elem-input" type="text" name="email" value={inputValue.email} onChange={handleChange} /></td>
                <td><DayJS format="DD/MM/YYYY">{ user.created_at }</DayJS></td>
                <td className="admin-tab-elem-icons">
                  <AiOutlineCheck className="admin-tab-elem-icons-icon color-green" onClick={submitUser} />
                  <AiOutlineClose className="admin-tab-elem-icons-icon color-red" onClick={closeUpdate} />
                </td>
              </tr>
            )
            : (
              <tr className="admin-tab-elem">
                <td>{user.id}</td>
                <td>{user.last_name}</td>
                <td>{user.first_name}</td>
                <td>{user.email}</td>
                <td><DayJS format="DD/MM/YYYY">{ user.created_at }</DayJS></td>

                <label className="dropdown">
                  <div className="dd-button">
                    <AiOutlineMenu />
                  </div>

                  <ul className="dd-menu">
                    <li onClick={() => {
                      initializeInputValue(user);
                    }}
                    >Modifier
                    </li>
                    <li onClick={() => {
                      deleteUser(user.id);
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

TabUsers.propTypes = {
  users: PropTypes.array.isRequired,
  setUsers: PropTypes.func.isRequired,
};

export default TabUsers;
