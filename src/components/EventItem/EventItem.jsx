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
        {event.title}
      </div>
      <div className="event__timezone">
        {dayjs(event.time).tz(currentTimeZone).format('h:mm a - DD MMM YYYY')}
      </div>
      <button
        type="button"
        className="event__button"
        onClick={() => dispatch(setIsVisibleEventMenu(event.id))}
      >
        ...
      </button>
      <div
        className={
          classNames('event__menu',
            { eventActive: isVisibleEventMenu === event.id })
        }
        style={{ width: '200' }}
      >
        <button
          type="button"
          className="event__edit"
          onClick={handleEditButton}
        >
          edit
        </button>
        <button
          type="button"
          className="event__changeCategory"
          onClick={() => {
            dispatch(changeEventStatus(event.id));
            dispatch(setIsVisibleEventMenu(event.id));
          }}
        >
          {event.isPublished ? 'unPublish' : 'Publish'}
        </button>
        <button
          type="button"
          className="event__delete"
          onClick={() => dispatch(deleteEvent(event.id))}
        >
          delete
        </button>
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
