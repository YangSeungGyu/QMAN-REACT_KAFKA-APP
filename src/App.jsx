import React from 'react';
import { unstable_HistoryRouter as HistoryRouter, Routes, Route } from 'react-router-dom';
import { history } from '@/history';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import MainLayout from '@/layout/MainLayout';
import Home from '@/views/Home';

//로그인
import Login from '@/views/Login';
import JoinMember from '@/views/member/JoinMember';


//게시판
import BoardList from '@/views/board/BoardList';
import BoardDetail from '@/views/board/BoardDetail';
import BoardWrite from '@/views/board/BoardWrite';

//테스트
import TitleTestPage from '@/views/test/TitleTestPage';
import TestPage01 from '@/views/test/TestPage01';
import TestPage02 from '@/views/test/TestPage02';
import TestPage03 from '@/views/test/TestPage03';
import TestBasicGrid from '@/views/test/BasicGrid';
import PageGrid from '@/views/test/PageGrid';
import TestFlow from '@/views/test/TestFlow';
import TestChart from '@/views/test/TestChart';
import TestSaga from '@/views/test/TestSaga';

//자유 테스트
import TestFree01 from '@/views/test/TestFree01';
import TestFree02 from '@/views/test/TestFree02';


//카프카
import TestKafka from '@/views/kafka/TestKafka';

//메모
import MemoView from '@/views/memo/MemoView';


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

                <Route path="testFree01" element={<TestFree01 />} />
                <Route path="testFree02" element={<TestFree02 />} />

                <Route path="testChart" element={<TestChart />} />

                <Route path="testSaga" element={<TestSaga />} />
              </Route>

              {/*kafka*/}
              <Route path="kafka">
                <Route path="TestKafka" element={<TestKafka />} />
              </Route>

              {/*memo*/}
              <Route path="memo">
                <Route path="memo01" element={<MemoView memoId="01"/>} />
                <Route path="memo02" element={<MemoView memoId="02"/>} />
                <Route path="memo03" element={<MemoView memoId="03"/>} />
                <Route path="memo04" element={<MemoView memoId="04"/>} />
                <Route path="memo05" element={<MemoView memoId="05"/>} />
                <Route path="memo06" element={<MemoView memoId="06"/>} />
              </Route>
              

            </Route>
          </Routes>
        </HistoryRouter>
      </CommonProvider>
    </QueryClientProvider>
  );
}

export default App;
