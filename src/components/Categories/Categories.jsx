import React from 'react';
import classNames from 'classnames';

import { useDispatch, useSelector } from 'react-redux';
import {
  setIsPublished,
  setIsVisibleModal,
} from '../../store/slice';

import AddForm from '../AddForm/AddForm';
import EventItem from '../EventItem/EventItem';

import './Categories.scss';

const Categories = () => {
  const dispatch = useDispatch();
  const {
    isPublished,
    isVisibleModal,
    eventsList,
  } = useSelector(state => state.events);

  const publishedList = eventsList
    .filter(event => event.isPublished === true);
  const unpublishedList = eventsList
    .filter(event => event.isPublished === false);

  return (
    <div className="categories">
      <div className="categories__menu">
        <ul className="categories__list">
          <li className="categories__item">
            <button
              type="button"
              className={classNames('categories__button button', {
                'categories__button--active': isPublished === true,
              })}
              onClick={() => dispatch(setIsPublished(true))}
            >
              Published
            </button>
          </li>
          <li className="categories__item">
            <button
              type="button"
              className={classNames('categories__button button', {
                'categories__button--active': isPublished === false,
              })}
              onClick={() => dispatch(setIsPublished(false))}
            >
              Unpublished
            </button>
          </li>
        </ul>

        <div className="add">
          <button
            type="button"
            className="button add__button"
            onClick={() => dispatch(setIsVisibleModal(!isVisibleModal))}
          >
            +  Add Event
          </button>
          {isVisibleModal && (
            <AddForm />
          )}
        </div>
      </div>

      <div className="categories__content">
        <ul className="eventItem__list">
          {isPublished
            ? publishedList.map(event => (
              <li className="eventItem__item">
                <EventItem event={event} />
              </li>
            ))
            : unpublishedList.map(event => (
              <li className="eventItem__item">
                <EventItem event={event} />
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};

export default Categories;
