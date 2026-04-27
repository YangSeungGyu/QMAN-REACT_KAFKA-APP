import React from 'react';
import { unstable_HistoryRouter as HistoryRouter, Routes, Route } from 'react-router-dom';
import { history } from '@/history';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import MainLayout from '@/layout/MainLayout';
import Home from '@/views/Home';
import Login from '@/views/Login';
import JoinMember from '@/views/member/JoinMember';

import BoardList from '@/views/board/BoardList';
import BoardDetail from '@/views/board/BoardDetail';
import BoardWrite from '@/views/board/BoardWrite';

import TitleTestPage from '@/views/test/TitleTestPage';
import TestPage01 from '@/views/test/TestPage01';
import TestPage02 from '@/views/test/TestPage02';
import TestPage03 from '@/views/test/TestPage03';
import TestBasicGrid from '@/views/test/BasicGrid';
import PageGrid from '@/views/test/PageGrid';

import TestFlow from '@/views/test/TestFlow';

import TestKafka from '@/views/kafka/TestKafka';

import { CommonProvider } from '@/context/CommonContext';

import '@/App.css';

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
                <Route path="testFlow" element={<TestFlow />} />
                
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
