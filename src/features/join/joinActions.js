import { AUTH_CHECK_REQUEST, ID_CHECK_REQUEST, JOIN_FINAL_REQUEST } from 'src/store/actionTypes';

export const authCheckRequest = (form) => ({
  type: AUTH_CHECK_REQUEST,
  payload: form
});

export const idCheckRequest = (userId) => ({
  type: ID_CHECK_REQUEST,
  payload: userId
});

export const joinFinalRequest = (form) => ({
  type: JOIN_FINAL_REQUEST,
  payload: form
});
