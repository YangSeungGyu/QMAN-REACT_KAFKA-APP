import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { boardListRequest } from 'src/features/board/boardActions';
import Pagination from 'src/components/Common/Pagination';

import 'src/style/board/BoardList.css'

function BoardList() {

  const movePage = useNavigate();
  const dispatch = useDispatch(); // 리덕스 명령 전달자

  // 3. 리덕스 스토어에서 데이터 구독 (가져오기)
  // boardSlice에서 정의한 initialState 구조를 그대로 가져옵니다.
  const { list, totalCnt, loading } = useSelector((state) => state.boardList);
  const { isLoggedIn} = useSelector((state) => state.auth);

  
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const pageBlockSize = 5;

  

  useEffect(() => {
    dispatch(boardListRequest(currentPage, pageSize));
  }, [currentPage, dispatch]);

  return (
    <div className="board-container">
      {/* totalCnt는 리덕스에서 온 값을 사용합니다. */}
      <h2 className="board-title">게시판 목록 (총 {totalCnt}건)</h2>
      
      <table className="board-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {/* loading 상태에 따라 UI 처리가 가능합니다. */}
          {loading ? (
            <tr><td colSpan={4} style={{ padding: '50px' }}>데이터 로드 중...</td></tr>
          ) : list.length > 0 ? (
            list.map((board) => (
              <tr key={board.idx}>
                <td>{board.idx}</td>
                <td className="title-cell"
                  onClick={() => movePage('/board/boardDetail/'+board.idx)}
                  style={{ cursor: 'pointer', color: '#222' }}
                >{board.title}</td>
                <td>{board.writer}</td>
                <td>{board.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} style={{ padding: '50px' }}>게시글이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="board-action-row">
        {isLoggedIn && (
          <button className="write-btn" onClick={() => movePage('/board/boardWrite')}>
            글쓰기
          </button>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalCnt={totalCnt}
        pageSize={pageSize}
        pageBlockSize={pageBlockSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

export default BoardList;