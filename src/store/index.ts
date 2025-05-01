import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import procedureReducer from './slices/procedureSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    procedure: procedureReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;