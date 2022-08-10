import classNames from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsVisibleEventMenu } from '../../store/slice';

import './EventItem.scss';

const EventItem = ({ event }) => {
  const dispatch = useDispatch();
  const isVisibleEventMenu = useSelector(state => (
    state.events.isVisibleEventMenu));

  return (
    <>
      <div className="event__title">
        {event.title}
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
        <div className="event__edit">
          {event.isPublished ? 'unPublish' : 'Publish'}
        </div>
        <div className="event__changeCategory">change</div>
        <div className="event__delete">delete</div>
      </div>
    </>
  );
};

export default EventItem;
