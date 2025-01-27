/**
 * @file authSlice.ts
 * @description This file contains the Redux slice for authentication state management using Redux Toolkit.
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * @interface User
 * @description Represents a user in the application.
 * @property {string} id - The unique identifier of the user.
 * @property {string} email - The email address of the user.
 * @property {'student' | 'tutor' | 'admin'} userType - The type of user.
 */
interface User {
  id: string;
  email: string;
  userType: 'student' | 'tutor' | 'admin';
}

/**
 * @interface AuthState
 * @description Represents the authentication state of the application.
 * @property {User | null} user - The authenticated user, or null if not authenticated.
 * @property {string | null} token - The authentication token, or null if not authenticated.
 * @property {boolean} isAuthenticated - Indicates whether the user is authenticated.
 */
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

/**
 * @constant initialState
 * @description The initial state of the authentication slice.
 * @type {AuthState}
 */
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token')
};

/**
 * @constant authSlice
 * @description The authentication slice created using Redux Toolkit's createSlice method.
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * @function setCredentials
     * @description Sets the user credentials and updates the authentication state.
     * @param {AuthState} state - The current state of the authentication slice.
     * @param {PayloadAction<{user: User, token: string}>} action - The action payload containing the user and token.
     */
    setCredentials: (state, action: PayloadAction<{user: User, token: string}>) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      localStorage.setItem('token', token);
    },
    /**
     * @function logout
     * @description Logs out the user and clears the authentication state.
     * @param {AuthState} state - The current state of the authentication slice.
     */
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;