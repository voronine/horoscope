import { configureStore } from '@reduxjs/toolkit'
import horoscopeReducer from './slices/horoscopeSlice'
import { apiSlice } from './slices/apiSlice'

export const store = configureStore({
  reducer: {
    horoscope: horoscopeReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
