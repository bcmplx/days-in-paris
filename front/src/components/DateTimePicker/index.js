// import React
import React from 'react';

// import npm
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import PropTypes from 'prop-types';

export default function DateTimePicker({
  selectedStartDate, selectedEndDate, handleDateChange, handleStartDateChange, handleEndDateChange,
}) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justifyContent="space-around">
        <KeyboardDatePicker
          clearable
          value={selectedStartDate}
          placeholder={selectedStartDate}
          onChange={(date) => handleDateChange(date)}
          minDate={new Date()}
          format="dd/MM/yyyy"
        />
      </Grid>
      <Grid container justifyContent="space-around">
        <KeyboardTimePicker
          margin="normal"
          id="time-picker-start"
          label="Heure de début"
          value={selectedStartDate}
          onChange={handleStartDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker-end"
          label="Heure de fin"
          value={selectedEndDate}
          onChange={handleEndDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

DateTimePicker.propTypes = {
  selectedStartDate: PropTypes.string.isRequired,
  selectedEndDate: PropTypes.string.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  handleStartDateChange: PropTypes.func.isRequired,
  handleEndDateChange: PropTypes.func.isRequired,
};
