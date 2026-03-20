import { createBrowserHistory } from 'history';

// saga 안에서 useNavigate 없이 페이지 이동할 때 사용
// App.jsx에서 <HistoryRouter history={history}> 로 감싸야 함
export const history = createBrowserHistory();
