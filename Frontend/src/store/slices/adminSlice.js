import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as adminService from '../../services/adminService';

const initialState = {
  analytics: {
    totalBookings: 0,
    totalRevenue: 0,
    totalEvents: 0,
    popularEvents: [],
  },
  loading: false,
};

// Async thunk to fetch analytics
export const fetchAnalytics = createAsyncThunk(
  'admin/fetchAnalytics',
  async () => {
    return await adminService.getAnalytics();
  }
);

// Async thunk to export bookings
export const exportBookings = createAsyncThunk(
  'admin/exportBookings',
  async (format) => {
    return await adminService.exportBookings(format);
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.analytics = action.payload;
      })
      .addCase(fetchAnalytics.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default adminSlice.reducer;
