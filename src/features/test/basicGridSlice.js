import { createSlice } from '@reduxjs/toolkit';
import { 
  BASIC_GRID_LIST_REQUEST, BASIC_GRID_LIST_SUCCESS, BASIC_GRID_LIST_FAILURE 

} from 'src/store/actionTypes';

const basicGridListSlice = createSlice({
  name: 'basicGridList',
  initialState: {
    list: [],
    totalCnt: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(BASIC_GRID_LIST_REQUEST, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(BASIC_GRID_LIST_SUCCESS, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.totalCnt = action.payload.totalCount;
      })
      .addCase(BASIC_GRID_LIST_FAILURE, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const basicGridListReducer =  basicGridListSlice.reducer;