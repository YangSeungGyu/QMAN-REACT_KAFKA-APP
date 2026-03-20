import { PAGE_GRID_LIST_REQUEST } from 'src/store/actionTypes';

export const pageGridListRequest = (page, size, searchTitle, searchWriter) => ({
  type: PAGE_GRID_LIST_REQUEST,
  payload: { page, size , searchTitle, searchWriter }
});
