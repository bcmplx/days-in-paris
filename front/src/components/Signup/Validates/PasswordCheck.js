import React, { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ImSortNumbericDesc } from 'react-icons/im';
import {
  VscPreserveCase,
  VscSymbolOperator,
} from 'react-icons/vsc';
import { AiOutlineCheck } from 'react-icons/ai';
import { IoIosResize } from 'react-icons/io';
import { IoCloseOutline } from 'react-icons/io5';
import { CgMathEqual } from 'react-icons/cg';
import './style.scss';

const PasswordCheck = ({ password, passwordConfirm, valid }) => {
  const [passwordCondition, setPasswordCondition] = useState({
    number: null,
    uppercase: null,
    symbol: null,
    length: null,
    equal: null,
  });

  const checkCondition = () => {
    const regexNumber = /\d/;
    const regexUppercase = /[A-Z]/;
    const regexSymbol = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    setPasswordCondition({
      number: regexNumber.test(password),
      uppercase: regexUppercase.test(password),
      symbol: regexSymbol.test(password),
      length: (password.length > 7),
      equal: password.length > 1 ? password === passwordConfirm : false,
    });
    let i = 0;

    for (const [key, value] of Object.entries(passwordCondition)) {
      if (value) {
        i += 5;
        console.log('password')
      }
    };

    if (i == 4) {
      valid(false);
    }
    else {
      valid(true);
    }
  };

  useLayoutEffect(() => {
    checkCondition();
  }, [password, passwordConfirm]);

  return (
    <div className="password-check">
      <div className="password-check-container">
        <ImSortNumbericDesc className="password-check-container-icon" />
        <p className="password-check-container-condition">Contient un Chiffre</p>
        {passwordCondition.number ? (
          <AiOutlineCheck className="password-check-container-icon green" />
        ) : (
          <IoCloseOutline className="password-check-container-icon red" />
        ) }
      </div>

      <div className="password-check-container">
        <VscPreserveCase className="password-check-container-icon" />
        <p className="password-check-container-condition">Contient une majuscule</p>
        {passwordCondition.uppercase ? (
          <AiOutlineCheck className="password-check-container-icon green" />
        ) : (
          <IoCloseOutline className="password-check-container-icon red" />
        ) }
      </div>

      <div className="password-check-container">
        <VscSymbolOperator className="password-check-container-icon" />
        <p className="password-check-container-condition">Contient un symbol</p>
        {passwordCondition.symbol ? (
          <AiOutlineCheck className="password-check-container-icon green" />
        ) : (
          <IoCloseOutline className="password-check-container-icon red" />
        ) }
      </div>

      <div className="password-check-container">
        <IoIosResize className="password-check-container-icon" />
        <p className="password-check-container-condition">Au moins 8 caractères</p>
        {passwordCondition.length ? (
          <AiOutlineCheck className="password-check-container-icon green" />
        ) : (
          <IoCloseOutline className="password-check-container-icon red" />
        ) }
      </div>
      
      <div className="password-check-container">
        <CgMathEqual className="password-check-container-icon" />
        <p className="password-check-container-condition">Mot de passe identique</p>
        {passwordCondition.equal ? (
          <AiOutlineCheck className="password-check-container-icon green" />
        ) : (
          <IoCloseOutline className="password-check-container-icon red" />
        ) }
      </div>
    </div>
  );
};

PasswordCheck.propTypes = {
  password: PropTypes.string,
  passwordConfirm: PropTypes.string,
};

PasswordCheck.defaultProps = {
  password: '',
  passwordConfirm: '',
};

export default PasswordCheck;
