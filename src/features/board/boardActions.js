import { BOARD_LIST_REQUEST,BOARD_DETAIL_REQUEST } from 'src/store/actionTypes';

export const boardListRequest = (page, size) => ({
  type: BOARD_LIST_REQUEST,
  payload: { page, size }
});


export const boardDetailRequest = (idx) => ({
  type: BOARD_DETAIL_REQUEST,
  payload: { idx }
});