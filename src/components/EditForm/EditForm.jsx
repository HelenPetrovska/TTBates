import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  editEvent,
  setIsVisibleEditModal,
} from '../../store/slice';

const EditForm = ({ id }) => {
  const dispatch = useDispatch();
  const {
    isVisibleEditModal,
  } = useSelector(state => state.events);

  const [titleValue, setTitleValue] = useState('');
  const [dateValue, setDateValue] = useState('');

  const closeModal = () => {
    dispatch(setIsVisibleEditModal(!isVisibleEditModal));
    setTitleValue('');
    setDateValue('');
  };

  const handleSubmit = (event, eventId) => {
    event.preventDefault();
    dispatch(editEvent({
      id: eventId,
      title: titleValue,
      time: dateValue,
    }));
    closeModal();
  };

  return (
    <form
      className="add-form"
      onSubmit={event => handleSubmit(event, id)}
    >
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
      <button type="submit">Edit</button>
      <button type="button" onClick={closeModal}>
        Close
      </button>
    </form>
  );
};

export default EditForm;
