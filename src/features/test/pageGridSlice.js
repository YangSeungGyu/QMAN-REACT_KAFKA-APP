import { createSlice } from '@reduxjs/toolkit';
import { 
  PAGE_GRID_LIST_REQUEST, PAGE_GRID_LIST_SUCCESS, PAGE_GRID_LIST_FAILURE 

} from 'src/store/actionTypes';

const pageGridListSlice = createSlice({
  name: 'pageGridList',
  initialState: {
    list: [],
    totalCnt: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(PAGE_GRID_LIST_REQUEST, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(PAGE_GRID_LIST_SUCCESS, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.totalCnt = action.payload.totalCount;
      })
      .addCase(PAGE_GRID_LIST_FAILURE, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const pageGridListReducer =  pageGridListSlice.reducer;