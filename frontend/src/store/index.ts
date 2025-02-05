import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import tutorialsReducer from './tutorialsSlice';

// Importing necessary functions and reducers from Redux Toolkit and local files

// Configuring the Redux store with the specified reducers
export const store = configureStore({
  reducer: {
    auth: authReducer, // Reducer for authentication-related state
    tutorials: tutorialsReducer // Reducer for tutorials-related state
  }
});

// Defining types for the root state and app dispatch for use throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;