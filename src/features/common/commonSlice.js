import { createSlice } from '@reduxjs/toolkit';
import { 
  COMMON_REQUEST, COMMON_SUCCESS, COMMON_FAILURE

} from 'src/store/actionTypes';

const commonSlice  = createSlice({
  name: 'common',
  initialState: {
    data: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(COMMON_REQUEST, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(COMMON_SUCCESS, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(COMMON_FAILURE, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const commonReducer =  commonSlice.reducer;