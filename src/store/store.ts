import { configureStore } from '@reduxjs/toolkit';
import horoscopeReducer from './slices/horoscopeSlice';
import { catFactsApi } from './slices/catFactsApi';

export const store = configureStore({
  reducer: {
    horoscope: horoscopeReducer,
    [catFactsApi.reducerPath]: catFactsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(catFactsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
