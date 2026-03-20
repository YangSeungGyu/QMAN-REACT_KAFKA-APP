import { createSlice } from '@reduxjs/toolkit';
import { 
  BOARD_LIST_REQUEST, BOARD_LIST_SUCCESS, BOARD_LIST_FAILURE 
 ,BOARD_DETAIL_REQUEST, BOARD_DETAIL_SUCCESS, BOARD_DETAIL_FAILURE 

} from 'src/store/actionTypes';

const boardListSlice = createSlice({
  name: 'boardList',
  initialState: {
    list: [],
    totalCnt: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(BOARD_LIST_REQUEST, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(BOARD_LIST_SUCCESS, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.totalCnt = action.payload.totalCount;
      })
      .addCase(BOARD_LIST_FAILURE, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const boardDetailSlice = createSlice({
  name: 'boardDetail',
  initialState: {
    data : null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(BOARD_DETAIL_REQUEST, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(BOARD_DETAIL_SUCCESS, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.totalCnt = action.payload.totalCount;
      })
      .addCase(BOARD_DETAIL_FAILURE, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const boardListReducer =  boardListSlice.reducer;
export const boardDetailReducer =  boardDetailSlice.reducer;