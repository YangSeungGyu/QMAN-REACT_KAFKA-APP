import { createSlice } from '@reduxjs/toolkit';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from 'src/store/actionTypes';

function loadUserFromStorage() {
  try {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

const savedUser = loadUserFromStorage();

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: savedUser,
    isLoggedIn: !!savedUser,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LOGIN_REQUEST, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(LOGIN_SUCCESS, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(LOGIN_FAILURE, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isLoggedIn = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;