import React from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useDispatch, useSelector } from 'react-redux';
import {
  setIsVisibleEventMenu,
  changeEventStatus,
  deleteEvent,
  setIsVisibleEditModal,
} from '../../store/slice';
import EditForm from '../EditForm/EditForm';

import './EventItem.scss';

const EventItem = ({ event }) => {
  const dispatch = useDispatch();

  const {
    isVisibleEventMenu,
    isVisibleEditModal,
    currentTimeZone,
  } = useSelector(state => state.events);

  const handleEditButton = () => {
    dispatch(setIsVisibleEditModal(!isVisibleEditModal));
  };

  dayjs.extend(utc);
  dayjs.extend(timezone);

  return (
    <>
      <div className="event__title">
        <span>{event.title}</span>
      </div>

      <div className="event__bottom">
        <button
          type="button"
          className="event__button"
          onClick={() => dispatch(setIsVisibleEventMenu(event.id))}
        >
          ...
        </button>
        <div className="event__timezone">
          {dayjs(event.time).tz(currentTimeZone).format('h:mm a - DD MMM YYYY')}
        </div>
      </div>
      <div
        className={
          classNames('event__menu',
            { eventActive: isVisibleEventMenu === event.id })
        }
        style={{ width: '200' }}
      >
        <div className="buttonsGroup">
          <button
            type="button"
            className="buttonsGroup__btn"
            onClick={handleEditButton}
          >
            <img src="images/edit-icon.png" alt="edit event" />
            <span>Edit</span>
          </button>
          <button
            type="button"
            className="buttonsGroup__btn"
            onClick={() => {
              dispatch(changeEventStatus(event.id));
              dispatch(setIsVisibleEventMenu(event.id));
            }}
          >
            <img src="images/status-icon.png" alt="status event" />
            <span>{event.isPublished ? 'unPublish' : 'Publish'}</span>
          </button>
          <button
            type="button"
            className="buttonsGroup__btn buttonsGroup__btn--delete"
            onClick={() => dispatch(deleteEvent(event.id))}
          >
            <img src="images/delete-icon.png" alt="delete event" />
            <span>Delete</span>
          </button>
        </div>
      </div>
      {isVisibleEditModal
        && isVisibleEventMenu === event.id
        && (
          <EditForm
            id={event.id}
          />
        )}
    </>
  );
};

export default EventItem;
