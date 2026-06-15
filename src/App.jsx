import React from 'react';
import { unstable_HistoryRouter as HistoryRouter, Routes, Route } from 'react-router-dom';
import { history } from '@/history';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import MainLayout from '@/layout/MainLayout';
import Home from '@/views/Home';

//로그인
import Login from '@/views/Login';
import JoinMember from '@/views/member/JoinMember';



import Path from '@/views/Path';


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
import AgGrid from '@/views/test/AgGrid';
import AgGridDesign from '@/views/test/AgGridDesign';

import TestFlow from '@/views/test/TestFlow';
import TestChart from '@/views/test/TestChart';
import TestSaga from '@/views/test/TestSaga';
import TestAntdUi from '@/views/test/TestAntdUi';
import TestCustomConfirm from '@/views/test/TestCustomConfirm';
import TestSoket from '@/views/test/TestSoket';
import TestExcel from '@/views/test/TestExcel';
import TestScheduler from '@/views/test/TestScheduler';

//자유 테스트
import TestFree01 from '@/views/test/TestFree01';
import TestFree02 from '@/views/test/TestFree02';

//패킷 확인
import TestPcap4j from '@/views/test/TestPcap4j';



//카프카
import TestKafka from '@/views/kafka/TestKafka';

//메모
import MemoReactView from '@/views/memo/MemoReactView';
import MemoOtherView from '@/views/memo/MemoOtherView';
import MemoOracleView from '@/views/memo/MemoOracleView';

//swager
import SwagerView from '@/views/swager/SwagerView';


//ThreeJs
import ThreeJs01 from '@/views/three/ThreeJs01';

import { CommonProvider } from '@/context/CommonContext';

import '@/App.css';

//antd 스타일 변경
import { ConfigProvider } from 'antd';
import useShadcnTheme from '@/style/shadcnTheme.js';



const queryClient = new QueryClient();

function App() {
  const configProps = useShadcnTheme(); // antd 스타일 변경
  return (
    <QueryClientProvider client={queryClient}>
      <CommonProvider>
        <ConfigProvider {...configProps}> {/*antd 스타일 변경*/}
          <HistoryRouter history={history}>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="member/joinMember" element={<JoinMember />} />

                <Route path="swager" element={<SwagerView />} />

                <Route path="path" element={<Path />} />

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
                  <Route path="agGrid" element={<AgGrid />} />
                  <Route path="agGridDesign" element={<AgGridDesign />} />
                  <Route path="testFlow" element={<TestFlow />} />
                  <Route path="testCustomConfirm" element={<TestCustomConfirm />} />

                  <Route path="testFree01" element={<TestFree01 />} />
                  <Route path="testFree02" element={<TestFree02 />} />

                  <Route path="testChart" element={<TestChart />} />

                  <Route path="testSaga" element={<TestSaga />} />

                  <Route path="testAntdUi" element={<TestAntdUi />} />
                  <Route path="testSoket" element={<TestSoket />} />
                  <Route path="testExcel" element={<TestExcel />} />
                  <Route path="testScheduler" element={<TestScheduler />} />
                  <Route path="testPcap4j" element={<TestPcap4j />} />
                 
                </Route>

                {/*kafka*/}
                <Route path="kafka">
                  <Route path="TestKafka" element={<TestKafka />} />
                </Route>

                {/*memo*/}
                <Route path="memo">
                  <Route path="react01" element={<MemoReactView memoId="01"/>} />
                  <Route path="react02" element={<MemoReactView memoId="02"/>} />
                  <Route path="react03" element={<MemoReactView memoId="03"/>} />
                  <Route path="react04" element={<MemoReactView memoId="04"/>} />
                  <Route path="react05" element={<MemoReactView memoId="05"/>} />
                  <Route path="react06" element={<MemoReactView memoId="06"/>} />

                  <Route path="other01" element={<MemoOtherView memoId="01"/>} />

                  <Route path="oracle01" element={<MemoOracleView memoId="01"/>} />
                  <Route path="oracle02" element={<MemoOracleView memoId="02"/>} />
                  <Route path="oracle03" element={<MemoOracleView memoId="03"/>} />
                  <Route path="oracle04" element={<MemoOracleView memoId="04"/>} />
                  <Route path="oracle05" element={<MemoOracleView memoId="05"/>} />
                  <Route path="oracle06" element={<MemoOracleView memoId="06"/>} />
                </Route>
                 {/*test*/}
                <Route path="three">
                     <Route path="threeJs01" element={<ThreeJs01 />} />
                </Route>
                

              </Route>
            </Routes>
          </HistoryRouter>
        </ConfigProvider>
      </CommonProvider>
    </QueryClientProvider>
  );
}

export default App;
