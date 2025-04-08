import { generateHoroscopeData, HoroscopeData } from '@/utils/horoscope';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface HoroscopeState {
  data: HoroscopeData | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: HoroscopeState = {
  data: null,
  status: 'idle'
};

function loadHoroscopeFromLocalStorage(): HoroscopeData | null {
  const stored = localStorage.getItem('horoscopeData');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
  return null;
}

export const initializeHoroscopeData = createAsyncThunk(
  'horoscope/initialize',
  async (): Promise<HoroscopeData> => {
    let data = loadHoroscopeFromLocalStorage();
    const currentDate = new Date();
    if (data) {
      const startDate = new Date(data.startDate);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
      if (currentDate > endDate) {
        data = generateHoroscopeData();
        localStorage.setItem('horoscopeData', JSON.stringify(data));
      }
    } else {
      data = generateHoroscopeData();
      localStorage.setItem('horoscopeData', JSON.stringify(data));
    }
    return data;
  }
);

const horoscopeSlice = createSlice({
  name: 'horoscope',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(initializeHoroscopeData.pending, state => {
        state.status = 'loading';
      })
      .addCase(initializeHoroscopeData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'succeeded';
      })
      .addCase(initializeHoroscopeData.rejected, state => {
        state.status = 'failed';
      });
  }
});

export default horoscopeSlice.reducer;
