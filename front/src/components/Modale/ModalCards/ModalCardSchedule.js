/* eslint-disable jsx-a11y/label-has-associated-control */
// == Import de la lib React
import React, { useState } from 'react';

// == Import npm
import PropTypes from 'prop-types';
import { AiOutlineClose } from 'react-icons/ai';

// == Imports locaux
import 'src/styles/stylebulma.scss';
import '../style.scss';
import DateTimePicker from 'src/components/DateTimePicker';
import { dateTimePickerConverter } from 'src/selectors/index';

const ModalCardSchedule = ({
  name, lat, lng, handleClose, addActivityToCalendar,
}) => {
  // new Date to always start at the day and time where at
  // therefor not suggest a date that is already passed
  // stringified because a string is expected and not a date object
  const now = new Date().toString();

  // this format is the one needed for the pickes
  // two state to mimic what will need to be converted to have in DB
  const [selectedStartDate, setSelectedStartDate] = useState(now);
  const [selectedEndDate, setSelectedEndDate] = useState(now);

  // if end time is smaller or equal to start time, error appears
  const [timeError, setTimeError] = useState(false);

  // Do later (if time): search if date-fns or date.io have better ways to do it
  const handleDateChange = (date) => {
    // get the start part (day, month, year) that has been entered without the times
    const dateWithoutEndPart = date.toString().slice(0, 15);

    // get the times from state without the previous date
    const startDateWithoutStartPart = selectedStartDate.toString().slice(15);
    const endDateWithoutStartPart = selectedEndDate.toString().slice(15);

    // concatenate to get the new date with the right times
    const startDate = `${dateWithoutEndPart}${startDateWithoutStartPart}`;
    const endDate = `${dateWithoutEndPart}${endDateWithoutStartPart}`;

    console.log(startDate);
    // update both states (with same start cause they both depend on it)
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
  };

  const handleStartDateChange = (date) => {
    setTimeError(false);

    // get the date without the start time that dont need to be update
    const startDateWithoutEndPart = selectedStartDate.toString().slice(0, 15);

    // get the start time that has been changed without the date (in order to not update it)
    const dateWithoutStartPart = date.toString().slice(15);

    // concatenate to get the new time with the right date
    const startDate = `${startDateWithoutEndPart}${dateWithoutStartPart}`;

    // update start state
    setSelectedStartDate(startDate);
  };

  const handleEndDateChange = (date) => {
    setTimeError(false);

    // get the date without the end time that dont need to be update
    const endDateWithoutEndPart = selectedEndDate.toString().slice(0, 15);

    // get the end time that has been changed without the date (in order to not update it)
    const dateWithoutStartPart = date.toString().slice(15);

    // concatenate to get the new time with the right date
    const endDate = `${endDateWithoutEndPart}${dateWithoutStartPart}`;

    // update start state
    setSelectedEndDate(endDate);
  };

  // click sur bouton -> envoie en BDD
  const handleModalSubmit = (event) => {
    event.preventDefault();

    console.log('selectedStartDate', selectedStartDate);

    // date comparator, if end time before start time, error message and no DB sending
    // breaking date to get time as int
    const startTimehhOnly = selectedStartDate.slice(16, 18);
    const startTimemmOnly = selectedStartDate.slice(19, 21);
    const startTimehhmm = `${startTimehhOnly}${startTimemmOnly}`;
    const endTimehhOnly = selectedEndDate.toString().slice(16, 18);
    const endTimemmOnly = selectedEndDate.toString().slice(19, 21);
    const endTimehhmm = `${endTimehhOnly}${endTimemmOnly}`;

    if (parseInt(startTimehhmm, 10) > parseInt(endTimehhmm, 10)) {
      setTimeError(true);
    }
    else {
      setTimeError(false);

      // convert both dates from datetimepicker format to scheduler format
      const startDateFormated = dateTimePickerConverter(selectedStartDate);
      const endDateFormated = dateTimePickerConverter(selectedEndDate);

      // preping object to send to DB
      const activityScheduled = {
        id: 0,
        title: name,
        start_date: startDateFormated,
        end_date: endDateFormated,
        lat: lat,
        lng: lng,
      };

      // send to bdd
      console.log(activityScheduled);
      console.log(addActivityToCalendar);
      addActivityToCalendar(activityScheduled);

      handleClose();
    }
  };

  return (
    <>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{name}</p>
          <div className="delete"><AiOutlineClose onClick={handleClose} className="delete-icon" /></div>
        </header>
        <section className="modal-card-body">
          <DateTimePicker
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
            handleDateChange={handleDateChange}
            handleStartDateChange={handleStartDateChange}
            handleEndDateChange={handleEndDateChange}
          />
          {timeError && <div className="modal-submit-error">Erreur: Vous ne pouvez pas choisir une heure de début plus tôt que l'heure de fin</div>}
        </section>
        <footer className="modal-card-foot">
          <button type="submit" className="button is-info" onClick={handleModalSubmit}>Ajouter au Calendrier</button>
          <button type="button" className="button" onClick={handleClose}>Annuler</button>
        </footer>
      </div>
    </>
  );
};

ModalCardSchedule.propTypes = {
  name: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  addActivityToCalendar: PropTypes.func.isRequired,
};

export default ModalCardSchedule;
