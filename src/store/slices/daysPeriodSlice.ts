import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface DaysPeriodState {
  days: number
}

const initialState: DaysPeriodState = {
  days: 3
}

const daysPeriodSlice = createSlice({
  name: 'daysPeriod',
  initialState,
  reducers: {
    setDays(state, action: PayloadAction<number>) {
      state.days = action.payload
    }
  }
})

export const { setDays } = daysPeriodSlice.actions
export default daysPeriodSlice.reducer
