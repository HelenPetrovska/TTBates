import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {
  editEvent,
  setIsVisibleEditModal,
} from '../../store/slice';

import './EditForm.scss';

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
    <Modal
      open={isVisibleEditModal}
    >
      <Box className="modal-box">
        <form
          className="form"
          onSubmit={event => handleSubmit(event, id)}
        >
          <h3 className="form__title">
            Edit
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
            Edit
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

export default EditForm;
