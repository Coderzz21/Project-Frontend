import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as eventsService from '../../services/eventsService';

const initialState = {
  events: [],
  currentEvent: null,
  loading: false,
  searchTerm: '',
  filters: {
    category: '',
    location: '',
    priceRange: [0, 1000],
    date: '',
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalEvents: 0,
  },
};

// Async thunks
export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (params) => {
    return await eventsService.getEvents(params);
  }
);

export const fetchEventById = createAsyncThunk(
  'events/fetchEventById',
  async (eventId) => {
    return await eventsService.getEventById(eventId);
  }
);

export const createEvent = createAsyncThunk(
  'events/createEvent',
  async (eventData) => {
    return await eventsService.createEvent(eventData);
  }
);

export const updateEvent = createAsyncThunk(
  'events/updateEvent',
  async ({ eventId, eventData }) => {
    return await eventsService.updateEvent(eventId, eventData);
  }
);

export const deleteEvent = createAsyncThunk(
  'events/deleteEvent',
  async (eventId) => {
    await eventsService.deleteEvent(eventId);
    return eventId;
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearCurrentEvent: (state) => {
      state.currentEvent = null;
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload.events;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchEvents.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.currentEvent = action.payload;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.events.unshift(action.payload);
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const index = state.events.findIndex(event => event._id === action.payload._id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
        if (state.currentEvent && state.currentEvent._id === action.payload._id) {
          state.currentEvent = action.payload;
        }
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter(event => event._id !== action.payload);
      });
  },
});

export const { setSearchTerm, setFilters, clearCurrentEvent, setCurrentPage } = eventsSlice.actions;
export default eventsSlice.reducer;
