import { createSlice } from '@reduxjs/toolkit';
import { 
  KAFKA_TEST_REQUEST ,KAFKA_TEST_SUCCESS, KAFKA_TEST_FAILURE 

} from 'src/store/actionTypes';

const kafkaTestSlice = createSlice({
  name: 'kafkaTest',
  initialState: {
    data: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(KAFKA_TEST_REQUEST, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(KAFKA_TEST_SUCCESS, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(KAFKA_TEST_FAILURE, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const kafkaTestReducer =  kafkaTestSlice.reducer;