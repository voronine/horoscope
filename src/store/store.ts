import { configureStore } from '@reduxjs/toolkit'
import horoscopeReducer from './slices/horoscopeSlice'
import { apiSlice } from '../api/apiSlice'
import themeReducer from './slices/themeSlice'
import daysPeriodReducer from './slices/daysPeriodSlice'
import navigationReducer from './slices/navigationSlice'

export const store = configureStore({
  reducer: {
    horoscope: horoscopeReducer,
    theme: themeReducer,
    daysPeriod: daysPeriodReducer,
    navigation: navigationReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
