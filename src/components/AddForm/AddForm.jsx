import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setEventsList,
  setIsVisibleModal,
  // setIsVisibleEventMenu,
} from '../../store/slice';

// import timezones from '../../timezones.json';

const AddForm = () => {
  const dispatch = useDispatch();
  const { eventsList, isVisibleModal } = useSelector(state => state.events);

  const [titleValue, setTitleValue] = useState('');
  const [dateValue, setDateValue] = useState('');

  const addEvent = (event) => {
    event.preventDefault();

    const newEvent = {
      id: eventsList[eventsList.length - 1].id + 1,
      title: titleValue,
      time: dateValue,
      isPublished: false,
    };

    dispatch(setEventsList(newEvent));
    setTitleValue('');
  };

  const closeModal = () => {
    dispatch(setIsVisibleModal(!isVisibleModal));
    setTitleValue('');
    setDateValue('Central Europen Time');
  };

  return (
    <form className="add-form" onSubmit={addEvent}>
      <input
        type="text"
        value={titleValue}
        onChange={event => setTitleValue(event.target.value)}
      />
      <input
        type="datetime-local"
        value={dateValue}
        onChange={event => setDateValue(event.target.value)}
      />
      <button type="submit">Add</button>
      <button type="button" onClick={closeModal}>
        Close
      </button>
    </form>
  );
};

export default AddForm;
