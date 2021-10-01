/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import api from 'src/api';
import { AiOutlineMenu } from 'react-icons/ai';

import '../style.scss';

const TabWishLists = ({ setWishlists, wishlists }) => {
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
  const deleteWishlist = async (id) => {
    try {
      const { data } = await api.delete(`/admin/wishlist/delete/${id}`);
      setWishlists(data);
      setMessage({
        text: 'Wishlist supprimé avec succès.',
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
      <h1 className="admin-tab-title">Wishlists</h1>
      <table>

        <tr className="admin-tab-header">
          <th>id</th>
          <th>activity id</th>
          <th>user id</th>
          <th></th>
        </tr>
        {wishlists.map((elem) => (
          <tr className="admin-tab-elem">
            <td>{elem.id}</td>
            <td>{elem.activity_id}</td>
            <td>{elem.user_id}</td>
            <label className="dropdown">
              <div className="dd-button">
                <AiOutlineMenu />
              </div>

              <ul className="dd-menu">
                <li onClick={() => {
                  deleteWishlist(elem.id);
                }}
                >Supprimer
                </li>
              </ul>
            </label>
          </tr>
        ))}
      </table>
    </div>
  );
};

TabWishLists.propTypes = {
  wishlists: PropTypes.array.isRequired,
  setWishlists: PropTypes.func.isRequired,
};

export default TabWishLists;
