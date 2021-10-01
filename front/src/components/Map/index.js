// == Import de la lib React
import React, { useState } from 'react';

// Import Map
import GoogleMapReact from 'google-map-react';

// == Import npm
import PropTypes from 'prop-types';

// == Imports locaux
import './style.scss';
import Marker from 'src/components/Activities/Marker';

const Map = ({ appointments, notEmpty }) => {
  const [propsMap, setPropsMap] = useState({
    center: {
      lat: 48.858476,
      lng: 2.342712,
    },
    zoom: 11,
  });

  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDCqRoeXO6_-sKWQvZID-RmRtebhc-OhNs' }}
        defaultCenter={propsMap.center}
        defaultZoom={propsMap.zoom}
      >
        {notEmpty && appointments.map((appointment) => (
          <Marker
            className="map-marker"
            lat={appointment.lat}
            lng={appointment.lng}
            text={appointment.title}
            key={appointment.id}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};

Map.propTypes = {
  appointments: PropTypes.array,
  notEmpty: PropTypes.bool,
};

Map.defaultProps = {
  appointments: [],
  notEmpty: false,
};

export default Map;
