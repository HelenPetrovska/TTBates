import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {
  setEventsList,
  setIsVisibleModal,
} from '../../store/slice';

const AddForm = () => {
  const dispatch = useDispatch();
  const { eventsList, isVisibleModal } = useSelector(state => state.events);

  const [titleValue, setTitleValue] = useState('');
  const [dateValue, setDateValue] = useState('');

  const closeModal = () => {
    dispatch(setIsVisibleModal(!isVisibleModal));
    setTitleValue('');
    setDateValue('Central Europen Time');
  };

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
    closeModal();
  };

  return (
    <Modal
      open={isVisibleModal}
    >
      <Box className="modal-box">
        <form className="form" onSubmit={addEvent}>
          <h3 className="form__title">
            Add
          </h3>
          <TextField
            id="filled-basic"
            label="title"
            variant="filled"
            type="text"
            value={titleValue}
            onChange={event => setTitleValue(event.target.value)}
          />
          <TextField
            id="filled-basic"
            variant="filled"
            type="datetime-local"
            value={dateValue}
            onChange={event => setDateValue(event.target.value)}
          />
          <Button
            variant="contained"
            type="submit"
          >
            Add
          </Button>
          <Button
            variant="contained"
            type="button"
            onClick={closeModal}
          >
            Close
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddForm;
