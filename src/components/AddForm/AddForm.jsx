import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setEventsList,
  setIsVisibleModal,
} from '../../store/slice';

import timezones from '../../timezones.json';

const AddForm = () => {
  const dispatch = useDispatch();
  const { eventsList, isVisibleModal } = useSelector(state => state.events);

  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('Central Europen Time');

  const addEvent = (event) => {
    event.preventDefault();

    const newEvent = {
      id: eventsList[eventsList.length - 1].id + 1,
      title: inputValue,
      time: selectValue,
      isPublished: false,
    };

    dispatch(setEventsList(newEvent));
    setInputValue('');
  };

  const closeModal = () => {
    dispatch(setIsVisibleModal(!isVisibleModal));
    setInputValue('');
    setSelectValue('Central Europen Time');
  };

  return (
    <form className="add-form" onSubmit={addEvent}>
      <input
        type="text"
        value={inputValue}
        onChange={event => setInputValue(event.target.value)}
      />
      <select
        name="timezones"
        id="timezones"
        value={selectValue}
        onChange={event => setSelectValue(event.target.value)}
      >
        {timezones.timezones.map(timezone => (
          <option key={timezone.id} value={timezone.name}>
            {timezone.name}
          </option>
        ))}
      </select>
      <button type="submit">Add</button>
      <button type="submit" onClick={closeModal}>
        Close
      </button>
    </form>
  );
};

export default AddForm;
