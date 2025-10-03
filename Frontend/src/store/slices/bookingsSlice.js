import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as bookingsService from '../../services/bookingsService';

const initialState = {
  bookings: [],
  loading: false,
};

// Async thunks
export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (bookingData) => {
    return await bookingsService.createBooking(bookingData);
  }
);

export const fetchUserBookings = createAsyncThunk(
  'bookings/fetchUserBookings',
  async (userId) => {
    return await bookingsService.getUserBookings(userId);
  }
);

export const cancelBooking = createAsyncThunk(
  'bookings/cancelBooking',
  async (bookingId) => {
    await bookingsService.cancelBooking(bookingId);
    return bookingId;
  }
);

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    clearBookings: (state) => {
      state.bookings = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings.unshift(action.payload);
      })
      .addCase(createBooking.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.bookings = action.payload;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        const index = state.bookings.findIndex(
          (booking) => booking._id === action.payload
        );
        if (index !== -1) {
          state.bookings[index].status = 'cancelled';
        }
      });
  },
});

export const { clearBookings } = bookingsSlice.actions;
export default bookingsSlice.reducer;
