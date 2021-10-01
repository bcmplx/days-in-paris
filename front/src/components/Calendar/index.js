import * as React from 'react';

// import npm
import PropTypes from 'prop-types';
// confirmation modale package
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
// import Scheduler
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  DragDropProvider,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
// import icon
import { FaTrashAlt } from 'react-icons/fa';

// import locaux
import './style.scss';
import Map from 'src/components/Map';
import api from 'src/api';
import { dateTimePickerConverter } from 'src/selectors/index';

export default class Calendar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentDate: new Date(),
      notEmpty: false,

      // editing (drag and drop)
      addedAppointment: {},
      appointmentChanges: {},
      editingAppointment: undefined,
    };

    // allow date navigation
    this.currentDateChange = (currentDate) => {
      this.setState({ currentDate });
    };

    this.handleCalendarDelete = this.handleCalendarDelete.bind(this);
    this.submitDelete = this.submitDelete.bind(this);
    this.commitChanges = this.commitChanges.bind(this);
    this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
    this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
    this.changeEditingAppointment = this.changeEditingAppointment.bind(this);
  }

  async componentDidMount() {
    // when the component has mounted, go fetch the data in DB
    try {
      const response = await api.get('/calendar');
      if (response.data.length > 0) {
        const responseData = response.data;
        // format to mimic the format needed by scheduler
        const dataFormated = responseData.map((appointment) => ({
          id: appointment.id,
          startDate: appointment.start_date,
          endDate: appointment.end_date,
          title: appointment.title,
          lat: appointment.lat,
          lng: appointment.lng,
        }));
        this.setState({ data: dataFormated, notEmpty: true });
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  async componentDidUpdate(prevProps) {
    const { calendarAddedOne } = this.props;
    // update only if a new activity has been added to DB
    if (calendarAddedOne !== prevProps.calendarAddedOne) {
      // get the new calendar list in DB
      try {
        const response = await api.get('/calendar');
        if (response.data.length > 0) {
          const responseData = response.data;
          const dataFormated = responseData.map((appointment) => ({
            id: appointment.id,
            startDate: appointment.start_date,
            endDate: appointment.end_date,
            title: appointment.title,
            lat: appointment.lat,
            lng: appointment.lng,
          }));
          // allowed since in an if (https://fr.reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect)
          this.setState({ data: dataFormated, notEmpty: true });
        }
      }
      catch (err) {
        console.log(err);
      }
    }
  }

  async handleCalendarDelete() {
    // delete all in DB
    try {
      const result = await api.get('/calendar/delete/all');
      // console.log(result.data);
      this.setState({ data: [], notEmpty: false });
    }
    catch (error) {
      console.log(error);
    }
  }

  // function to allow drag and drop + resize
  allow = () => true;

  submitDelete() {
    // console.log('submitDelete');
    confirmAlert({
      title: '⚠ Supprimer le Calendrier',
      message: 'Êtes-vous sûr de vouloir supprimer toutes les activités du Calendrier?',
      buttons: [
        {
          label: 'SUPPRIMER',
          onClick: this.handleCalendarDelete,
        },
        {
          label: 'ANNULER',
          // onClick: () => alert('Click No'),
        },
      ],
      overlayClassName: 'calendar-confirm-alert',
    });
  }

  // setStates for editing (drag and drop)
  changeAddedAppointment(addedAppointment) {
    this.setState({ addedAppointment });
  }

  changeAppointmentChanges(appointmentChanges) {
    this.setState({ appointmentChanges });
  }

  changeEditingAppointment(editingAppointment) {
    this.setState({ editingAppointment });
  }

  // Function that handles editing
  async commitChanges({ changed, deleted }) {
    if (changed) {
      // change = id + new startDate and endDate ISO Format
      const id = Object.keys(changed);

      // convert dates
      const startDateFormated = dateTimePickerConverter(changed[id].startDate.toString());
      const endDateFormated = dateTimePickerConverter(changed[id].endDate.toString());

      // Send in DB what row to change with what 
      try {
        await api.patch('/calendar/modify', {
          id,
          startDateFormated,
          endDateFormated,
        });
        // console.log('patch one from calendar', result.data);
        // set state to update without reload but only if no error
        const { data } = this.state;
        const dataUpdated = data.map((appointment) => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment
        ));
        this.setState({ data: dataUpdated });
      }
      catch (error) {
        console.log('error patch one from calendar', error);
      }
    }

    if (deleted !== undefined) {
      // deleted = id of the delete activity
      // Delete one in DB
      try {
        await api.post('/calendar/delete', {
          deleted,
        });
        // console.log('delete one from calendar', result.data);
        // set state to update without reload but only if no error
        let { data } = this.state;
        data = data.filter((appointment) => appointment.id !== deleted);
        console.log(data);

        // Screens to see if array empty or not
        if (data.length > 0) {
          this.setState({ data: data, notEmpty: true });
        }
        else {
          this.setState({ data: data, notEmpty: false });
        }

        // this.setState({ data: dataFormated, notEmpty: true });
      }
      catch (error) {
        console.log('error delete one from calendar', error);
      }
    }
  }

  render() {
    const { data, currentDate, notEmpty } = this.state;
    console.log('RERENDER');
    // console.log('not empty', notEmpty);
    // console.log('appointments', data);

    return (
      <>
        <Map appointments={data} notEmpty={notEmpty} />
        <div className="calendar">
          <div className="calendar-delete" onClick={this.submitDelete}><FaTrashAlt className="calendar-delete-icon" /></div>
          <Paper>
            <Scheduler
              data={data} // apointments and current date
              height={500} // scheduler height in page
              locale="fr-FR" // language displade for the scheduler
              firstDayOfWeek={1} // week start monday
            >
              {/* manage the scheduler appointment editing state */}
              <EditingState
                onCommitChanges={this.commitChanges}
              />
              {/* allow editing inside the scheduler */}
              <IntegratedEditing />
              {/* define where the scheduler load (here on locale date) */}
              <ViewState
                currentDate={currentDate}
                onCurrentDateChange={this.currentDateChange}
              />
              {/* type of schedule view (can also be month, day etc...) */}
              <WeekView
                startDayHour={7}
                endDayHour={24}
                cellDuration={60} // duration 1h
              />
              {/* box in which the date navigator is displayed (mandatory for date navigator) */}
              <Toolbar />
              {/* allow navigation between weeks */}
              <DateNavigator />
              {/* little appointment card generated with the data  */}
              <Appointments />
              {/* to show more info and delete button */}
              <AppointmentTooltip showCloseButton showDeleteButton />
              {/* allow drag and drop
              (resize = change size that change duration) */}
              <DragDropProvider
                allowDrag={this.allow}
                allowResize={this.allow}
              />
            </Scheduler>
          </Paper>
        </div>
      </>
    );
  }
}

Calendar.propTypes = {
  calendarAddedOne: PropTypes.array.isRequired,
};
