import React from 'react';
import { unstable_HistoryRouter as HistoryRouter, Routes, Route } from 'react-router-dom';
import { history } from 'src/history';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import MainLayout from 'src/layout/MainLayout';
import Home from 'src/pages/Home';
import Login from 'src/pages/Login';
import JoinMember from 'src/pages/member/JoinMember';

import BoardList from 'src/pages/board/BoardList';
import BoardDetail from 'src/pages/board/BoardDetail';
import BoardWrite from 'src/pages/board/BoardWrite';

import TitleTestPage from 'src/pages/test/TitleTestPage';
import TestPage01 from 'src/pages/test/TestPage01';
import TestPage02 from 'src/pages/test/TestPage02';
import TestPage03 from 'src/pages/test/TestPage03';
import TestBasicGrid from 'src/pages/test/BasicGrid';
import PageGrid from 'src/pages/test/PageGrid';

import TestKafka from 'src/pages/kafka/TestKafka';

import { CommonProvider } from 'src/context/CommonContext';

import 'src/App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CommonProvider>
        <HistoryRouter history={history}>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="member/joinMember" element={<JoinMember />} />

              {/*board*/}
              <Route path="board">
                <Route path="boardList" element={<BoardList />} />
                <Route path="boardDetail/:idx" element={<BoardDetail />} />
                <Route path="boardWrite" element={<BoardWrite />} />
              </Route>

              {/*test*/}
              <Route path="test">
                <Route path="titleTest" element={<TitleTestPage />} />
                <Route path="test01" element={<TestPage01 />} />
                <Route path="test02" element={<TestPage02 />} />
                <Route path="test03" element={<TestPage03 />} />
                <Route path="basicGrid" element={<TestBasicGrid />} />
                <Route path="pageGrid" element={<PageGrid />} />
              </Route>

              {/*kafka*/}
              <Route path="kafka">
                <Route path="TestKafka" element={<TestKafka />} />
              </Route>

            </Route>
          </Routes>
        </HistoryRouter>
      </CommonProvider>
    </QueryClientProvider>
  );
}

export default App;
