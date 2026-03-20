import { createSlice } from '@reduxjs/toolkit';
import {
  AUTH_CHECK_REQUEST, AUTH_CHECK_SUCCESS, AUTH_CHECK_FAILURE,
  ID_CHECK_REQUEST,   ID_CHECK_SUCCESS,   ID_CHECK_FAILURE,
  JOIN_FINAL_REQUEST, JOIN_FINAL_SUCCESS, JOIN_FINAL_FAILURE,
} from 'src/store/actionTypes';

// 1. 본인인증 slice
const authCheckSlice = createSlice({
  name: 'authCheck',
  initialState: { data: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AUTH_CHECK_REQUEST, (state) => { state.loading = true; state.data = null; state.error = null; })
      .addCase(AUTH_CHECK_SUCCESS, (state, action) => { state.loading = false; state.data = action.payload; })
      .addCase(AUTH_CHECK_FAILURE, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

// 2. 아이디 중복확인 slice
const idCheckSlice = createSlice({
  name: 'idCheck',
  initialState: { isDuplicated: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ID_CHECK_REQUEST, (state) => { state.loading = true; state.isDuplicated = null; state.error = null; })
      .addCase(ID_CHECK_SUCCESS, (state, action) => { state.loading = false; state.isDuplicated = action.payload; })
      .addCase(ID_CHECK_FAILURE, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

// 3. 최종 회원가입 slice
const joinFinalSlice = createSlice({
  name: 'joinFinal',
  initialState: { success: false, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(JOIN_FINAL_REQUEST, (state) => { state.loading = true; state.success = false; state.error = null; })
      .addCase(JOIN_FINAL_SUCCESS, (state) => { state.loading = false; state.success = true; })
      .addCase(JOIN_FINAL_FAILURE, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const authCheckReducer = authCheckSlice.reducer;
export const idCheckReducer = idCheckSlice.reducer;
export const joinFinalReducer = joinFinalSlice.reducer;