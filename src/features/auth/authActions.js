import { LOGIN_REQUEST } from 'src/store/actionTypes';

export const loginRequest = (id, pw) => ({
  type: LOGIN_REQUEST,
  payload: { id, pw }
});
