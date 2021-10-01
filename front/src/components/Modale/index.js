// == Import de la lib React
import React from 'react';

// == Import npm
import PropTypes from 'prop-types';

// == Imports locaux
import 'src/styles/stylebulma.scss';
import './style.scss';
import ModalCardSchedule from './ModalCards/ModalCardSchedule';

const Modale = ({
  handleClose, open, name, lat, lng, addActivityToCalendar,
}) => (
  <>{open && (
  <div className="modal is-active">
    <div className="modal-background" />
    <ModalCardSchedule
      handleClose={handleClose}
      name={name}
      lat={lat}
      lng={lng}
      addActivityToCalendar={addActivityToCalendar}
    />
  </div>
  )}
  </>
);

Modale.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  name: PropTypes.string,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  addActivityToCalendar: PropTypes.func.isRequired,
};

Modale.defaultProps = {
  name: 'Sans Nom',
};

export default Modale;
