// == Import de la lib React
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

// == Import npm
import { AiOutlineCalendar } from 'react-icons/ai';
import { FaPencilAlt, FaCheck } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import DayJS from 'react-dayjs';
// confirmation modale package
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

// == Imports locaux
import api from 'src/api';
import newUserUrl from 'src/assets/images/new-user.png';
import './style.scss';

const Profile = ({ isLogged, changeHeader, handleDeleteAccount }) => {
  const history = useHistory();

  const [currentUser, setCurrentUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    imgUrl: '',
    createdAt: '',
  });

  const [edit, setEdit] = useState({
    lastName: false,
    firstName: false,
    email: false,
  });

  const [form, setForm] = useState({
    lastName: '',
    firstName: '',
    email: '',
    imgUrl: '',
  });

  const [error, setError] = useState({
    lastName: null,
    submitFirstName: null,
    email: null,
    password: null,
    imgUrl: null,
  });

  useLayoutEffect(() => {
    if (isLogged) {
      api.get('/profile')
        .then((result) => {
          const {
            firstName, lastName, email, imgUrl, createdAt,
          } = result.data;

          setCurrentUser({
            firstName,
            lastName,
            email,
            imgUrl,
            createdAt,
          });
          setForm({
            ...form,
            lastName: lastName,
            firstName: firstName,
            email: email,
          });
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [isLogged]);

  // === open inputs
  const handleEdit = (info) => {
    setEdit({
      ...edit,
      [info]: true,
    });
  };

  // === controlled inputs
  const handleValue = (event, info) => {
    // reboot error
    setError({
      ...error,
      [info]: null,
    });
    // controlled input
    setForm({
      ...form,
      [info]: event.target.value,
    });
    if (info === 'lastName' || info === 'firstName') {
      if (event.target.value === '') {
        setError({
          ...error,
          [info]: 'vide',
        });
      }
    }
    // control if error
    // eslint-disable-next-line no-control-regex
    if (info === 'email') {
      const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
      setError({
        ...error,
        email: !regex.test(event.target.value),
      });
    }
  };

  // === submit the changes
  const handleSubmit = async (info) => {
    const infoValue = form.[info];
    if (!error.[info]) {
      if (infoValue !== '') {
      // DB call
        // envoyer la valeur a changer (info) et sa nouvelle valeur (form.[info])
        try {
          await api.patch('/profile', {
            info,
            infoValue,
          });

          // update header
          if (info === 'firstName') {
            changeHeader(infoValue);
          }

          // update directly the profile (if no error)
          setCurrentUser({
            ...currentUser,
            [info]: infoValue,
          });
          // close the input
          setEdit({
            ...edit,
            [info]: false,
          });
        }
        catch (err) {
          console.log('error patch one from profile', err);
        }
      }
    }
  };

  const handleImgSubmit = async () => {
    // get the url from the input
    const { imgUrl } = form;

    // check that the url is valid (http(s)://ADRESS.jpeg or other extensions)
    // and without <> to avoid SQL injections
    const regexImg = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;
    if (!regexImg.test(imgUrl) || imgUrl.includes('<') || imgUrl.includes('>')) {
      setError({
        ...error,
        imgUrl: 'invalide',
      });
    }
    else {
      // reboot error if valide
      setError({
        ...error,
        imgUrl: null,
      });

      // call DB
      try {
        await api.patch('/profile/img', {
          imgUrl,
        });

        setCurrentUser({
          ...currentUser,
          imgUrl: imgUrl,
        });
        setForm({
          ...form,
          imgUrl: '',
        });
      }
      catch (err) {
        console.log('error patch one from profile', err);
      }
    }
  };

  // == cancel input
  const handleCancel = (info) => {
    setError({
      ...error,
      [info]: null,
    });
    // close the inputs
    setEdit({
      ...edit,
      [info]: false,
    });
    // remet le formulaire à 0
    setForm({
      lastName: currentUser.lastName,
      firstName: currentUser.firstName,
      email: currentUser.email,
    });
  };

  // const handleDeleteAccount = async () => {
  //   try {
  //     await api.delete('/profile/delete');
  //     // logout
  //   }
  //   catch (err) {
  //     console.log('error delete account', err);
  //   }
  // };

  const handleValidateDelete = () => {
    confirmAlert({
      title: '⚠ Supprimer votre compte',
      message: 'Etes-vous sûr de vouloir supprimer votre compte?',
      buttons: [
        {
          label: 'SUPPRIMER',
          onClick: handleDeleteAccount,
        },
        {
          label: 'ANNULER',
          // onClick: () => alert('Click No'),
        },
      ],
    });
  };


  return (
    <div className="profile">
      <div className="profile-img" style={{ backgroundImage: `url('${currentUser.imgUrl ? currentUser.imgUrl : newUserUrl}')` }} />
      <div className="profile-infos">
        <h1 className="profile-infos-title">{currentUser.firstName} {currentUser.lastName}</h1>
        <div className="profile-infos-content">
          <div className="profile-infos-content-basics">
            <div className="profile-infos-content-basics-title">Nom</div>
            {!edit.lastName && (
              <div className="profile-infos-content-basics-content">
                {currentUser.lastName}
                <span><FaPencilAlt onClick={() => {
                  handleEdit('lastName');
                }}
                />
                </span>
              </div>
            )}
            {edit.lastName && (
              <>
                <input type="text" value={form.lastName} onChange={(event) => handleValue(event, 'lastName')} />
                <div>
                  <FaCheck onClick={() => {
                    handleSubmit('lastName');
                  }}
                  />
                  <IoClose
                    className="profile-infos-content-basics-content-close-icon"
                    onClick={() => {
                      handleCancel('lastName');
                    }}
                  />
                </div>
              </>
            )}
          </div>
          {error.lastName && (
          <p className="profile-infos-content-basics-error">Ne peut pas être vide</p>
          )}
          <div className="profile-infos-content-basics">
            <div className="profile-infos-content-basics-title">Prénom</div>
            {!edit.firstName && (
              <div className="profile-infos-content-basics-content">
                {currentUser.firstName}
                <span><FaPencilAlt onClick={() => {
                  handleEdit('firstName');
                }}
                />
                </span>
              </div>
            )}
            {edit.firstName && (
              <>
                <input type="text" value={form.firstName} onChange={(event) => handleValue(event, 'firstName')} />
                <div>
                  <FaCheck onClick={() => {
                    handleSubmit('firstName');
                  }}
                  />
                  <IoClose
                    className="profile-infos-content-basics-content-close-icon"
                    onClick={() => {
                      handleCancel('firstName');
                    }}
                  />
                </div>
              </>
            )}
          </div>
          {error.firstName && (
          <p className="profile-infos-content-basics-error">Ne peut pas être vide</p>
          )}
          <div className="profile-infos-content-basics">
            <div className="profile-infos-content-basics-title">Email</div>
            {!edit.email && (
              <div className="profile-infos-content-basics-content">
                {currentUser.email}
                <span><FaPencilAlt onClick={() => {
                  handleEdit('email');
                }}
                />
                </span>
              </div>
            )}
            {edit.email && (
              <>
                <input type="text" value={form.email} onChange={(event) => handleValue(event, 'email')} />
                <div>
                  <FaCheck onClick={() => {
                    handleSubmit('email');
                  }}
                  />
                  <IoClose
                    className="profile-infos-content-basics-content-close-icon"
                    onClick={() => {
                      handleCancel('email');
                    }}
                  />
                </div>
              </>
            )}
          </div>
          {error.email && (
          <p className="profile-infos-content-basics-error">L'email doit être au format suivant: president@elysee.fr</p>
          )}
          <br />
          <div className="profile-infos-content-basics">
            <div className="profile-infos-content-basics-title">Image de profil</div>
            <form className="profile-infos-content-basics-form">
              <input className="profile-infos-content-basics-form-input" type="text" id="img-submit" value={form.imgUrl} onChange={(event) => handleValue(event, 'imgUrl')} placeholder="url de la nouvelle image" />
              <input className="profile-infos-content-basics-form-button" type="button" value="Envoyer" onClick={handleImgSubmit} />
            </form>
          </div>
          {error.img && (<div className="profile-infos-content-basics-error">L'url de l'image n' est pas valide, merci de vérifier</div>)}
        </div>
        <div style={{ marginTop: '1em' }}><AiOutlineCalendar /> A rejoint Days in Paris le <DayJS format="DD/MM/YYYY" style={{ fontWeight: 'bold' }}>{ currentUser.createdAt }</DayJS></div>
        <div className="profile-infos-delete-account" onClick={handleValidateDelete}>X supprimer mon compte</div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  changeHeader: PropTypes.func.isRequired,
  handleDeleteAccount: PropTypes.func.isRequired,
};

export default Profile;
