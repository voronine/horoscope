import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavigationState {
  sign: string;
  selectedIndex: number;
}

const initialState: NavigationState = {
  sign: 'Aries',
  selectedIndex: 0,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setSign(state, action: PayloadAction<string>) {
      state.sign = action.payload;
      state.selectedIndex = 0;
    },
    setSelectedIndex(state, action: PayloadAction<number>) {
      state.selectedIndex = action.payload;
    }
  }
});

export const { setSign, setSelectedIndex } = navigationSlice.actions;
export default navigationSlice.reducer;
