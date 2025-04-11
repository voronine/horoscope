import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface NavigationState {
  sign: string
  selectedIndex: number
  initialized: boolean
}

const initialState: NavigationState = {
  sign: 'Aries',
  selectedIndex: 0,
  initialized: false
}

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setSign(state, action: PayloadAction<string>) {
      state.sign = action.payload
      state.selectedIndex = 0
      if (!state.initialized) {
        state.initialized = true
      }
    },
    setSelectedIndex(state, action: PayloadAction<number>) {
      state.selectedIndex = action.payload
    }
  }
})

export const { setSign, setSelectedIndex } = navigationSlice.actions
export default navigationSlice.reducer
