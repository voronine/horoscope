import { configureStore } from '@reduxjs/toolkit'
import horoscopeReducer from './slices/horoscopeSlice'
import { apiSlice } from '../api/apiSlice'
import themeReducer from './slices/themeSlice'

export const store = configureStore({
  reducer: {
    horoscope: horoscopeReducer,
    theme: themeReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
