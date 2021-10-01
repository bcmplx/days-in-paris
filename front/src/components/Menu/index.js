import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {
  FaTrashAlt,
  FaMapMarkedAlt,
  FaMapSigns,
} from 'react-icons/fa';
import './style.scss';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function SwipeableTemporaryDrawer({ activities, deleteActivityWl, deleteAll }) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Mes activités'].map((text, index) => (
          <ListItem key={text}>
            <ListItemIcon><FaMapSigns /></ListItemIcon>
            <ListItemText primary={text} />
            <ListItemIcon><FaTrashAlt onClick={deleteAll} className="menu-trash" /></ListItemIcon>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {activities.length > 0 ? (
          activities.map((elem) => (
            <div key={elem.name} className="menu-activity">
              <div className="menu-activity-img" style={{ backgroundImage: `url('${elem.photo_url}')` }} />
              <p className="menu-activity-text">{elem.name}</p>
              <div
                onClick={() => {
                  deleteActivityWl(elem.activity_id);
                }}
                className="menu-activity-elem"
              >X
              </div>
            </div>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="Pas encore d'activités" />
          </ListItem>
        )}
      </List>
    </div>
  );

  return (
    <div className="menu">
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <FaMapMarkedAlt className="menu-icon" onClick={toggleDrawer(anchor, true)} />
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
            <Link className="menu-link" to="/organizer">Ajouter au calendrier</Link>
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}

SwipeableTemporaryDrawer.propTypes = {
  activities: PropTypes.array,
  deleteActivityWl: PropTypes.func.isRequired,
  deleteAll: PropTypes.func.isRequired,
};

SwipeableTemporaryDrawer.defaultProps = {
  activities: [],
};
