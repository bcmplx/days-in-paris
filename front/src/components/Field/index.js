// == Import : npm
import React from 'react';
import PropTypes from 'prop-types';

// == Import : local
import './style.scss';

// == Composant
const Field = ({
  value,
  type,
  name,
  placeholder,
  onChange,
  handleBlur,
}) => {
  const handleChange = (evt) => {
    onChange(evt.target.value, name);
  };

  return (
    <input
      value={value}
      onChange={handleChange}
      type={type}
      placeholder={placeholder}
      name={name}
      onBlur={handleBlur}
      autoComplete="none"
    />
  );
};

Field.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func,
};

// Valeurs par défaut pour les props
Field.defaultProps = {
  value: '',
  type: 'text',
  handleBlur: () => {},
};

// == Export
export default Field;
