import { createSlice } from '@reduxjs/toolkit';

import events from '../events.json';

const initialState = {
  isPublished: true,
  isVisibleModal: false,
  isVisibleEditModal: false,
  eventsList: events.events,
  isVisibleEventMenu: null,
  currentTimeZone: 'UTC',
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

    setIsVisibleEditModal: (state, action) => {
      state.isVisibleEditModal = action.payload;
    },

    setEventsList: (state, action) => {
      state.eventsList = [...state.eventsList, action.payload];
    },

    setIsVisibleEventMenu: (state, action) => {
      state.isVisibleEventMenu === action.payload
        ? state.isVisibleEventMenu = null
        : state.isVisibleEventMenu = action.payload;
    },

    changeEventStatus: (state, action) => {
      state.eventsList = state.eventsList.map((event) => {
        if (event.id === action.payload) {
          return {
            ...event,
            isPublished: !event.isPublished,
          };
        }

        return event;
      });
    },

    deleteEvent: (state, action) => {
      state.eventsList = state.eventsList
        .filter(event => event.id !== action.payload);
    },

    editEvent: (state, action) => {
      state.eventsList = state.eventsList.map((event) => {
        if (event.id === action.payload.id) {
          return {
            ...event,
            title: action.payload.title,
            time: action.payload.time,
          };
        }

        return event;
      });
    },

    setCurrentTimeZone: (state, action) => {
      state.currentTimeZone = action.payload;
    },
  },
});

export const {
  setIsPublished,
  setIsVisibleModal,
  setIsVisibleEditModal,
  setEventsList,
  setIsVisibleEventMenu,
  changeEventStatus,
  deleteEvent,
  editEvent,
  setEventEdit,
  setCurrentTimeZone,
} = slice.actions;

export default slice.reducer;
