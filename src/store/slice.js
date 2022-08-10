import { createSlice } from '@reduxjs/toolkit';

import events from '../events.json';

const initialState = {
  isPublished: true,
  isVisibleModal: false,
  eventsList: events.events,
  isVisibleEventMenu: null,
};

const slice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setIsPublished: (state, action) => {
      state.isPublished = action.payload;
    },
    setIsVisibleModal: (state, action) => {
      state.isVisibleModal = action.payload;
    },
    setEventsList: (state, action) => {
      state.eventsList = [...state.eventsList, action.payload];
    },
    setIsVisibleEventMenu(state, action) {
      state.isVisibleEventMenu === action.payload
        ? state.isVisibleEventMenu = null
        : state.isVisibleEventMenu = action.payload;
    },
  },
});

export const {
  setIsPublished,
  setIsVisibleModal,
  setEventsList,
  setIsVisibleEventMenu,
} = slice.actions;

export default slice.reducer;
