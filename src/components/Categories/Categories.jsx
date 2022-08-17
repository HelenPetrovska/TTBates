import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setIsPublished,
  setIsVisibleModal,
  setCurrentTimeZone,
} from '../../store/slice';

import AddForm from '../AddForm/AddForm';
import EventItem from '../EventItem/EventItem';

import timezones from '../../timezones.json';
import './Categories.scss';

const Categories = () => {
  const dispatch = useDispatch();
  const {
    isPublished,
    isVisibleModal,
    eventsList,
    currentTimeZone,
  } = useSelector(state => state.events);

  const publishedList = eventsList
    .filter(event => event.isPublished === true);
  const unpublishedList = eventsList
    .filter(event => event.isPublished === false);

  return (
    <div className="categories">
      <ul className="categories__list">
        <li className="categories__item">
          <button
            type="button"
            className="categories__button"
            onClick={() => dispatch(setIsPublished(true))}
          >
            published
          </button>
        </li>
        <li className="categories__item">
          <button
            type="button"
            className="categories__button"
            onClick={() => dispatch(setIsPublished(false))}
          >
            unpublished
          </button>
        </li>
      </ul>
      <select
        className="categories__timezones"
        value={currentTimeZone}
        onChange={event => dispatch(setCurrentTimeZone(event.target.value))}
      >
        {timezones.timezones.map(zone => (
          <option value={zone.value}>
            {zone.name}
          </option>
        ))}
      </select>
      <div className="categories__content">
        {isPublished
          ? publishedList.map(event => (
            <ul className="eventItem__list">
              <li className="eventItem__item">
                <EventItem event={event} />
              </li>
            </ul>
          ))
          : unpublishedList.map(event => (
            <ul className="eventItem__list">
              <li className="eventItem__item">
                <EventItem event={event} />
              </li>
            </ul>
          ))
        }
      </div>
      <div className="add">
        <button
          type="button"
          onClick={() => dispatch(setIsVisibleModal(!isVisibleModal))}
        >
          Add+
        </button>
        {isVisibleModal && (
          <AddForm />
        )}
      </div>
    </div>
  );
};

export default Categories;
