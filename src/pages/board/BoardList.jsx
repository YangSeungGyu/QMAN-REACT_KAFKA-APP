import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from 'src/features/auth/useAuthStore';
import { comm } from 'src/context/comm.js';
import Pagination from 'src/components/Common/Pagination';
import 'src/style/board/BoardList.css';

function BoardList() {
  const movePage = useNavigate();
  const { isLoggedIn } = useAuthStore();

  const [list, setList]         = useState([]);
  const [totalCnt, setTotalCnt] = useState(0);
  const [loading, setLoading]   = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize      = 5;
  const pageBlockSize = 5;

  const fetchList = async (page) => {
    setLoading(true);
    try {
      const data = await comm.axiosPost('/board/getBoardList', { page, size: pageSize });
      setList(data.list);
      setTotalCnt(data.totalCount);
    } catch (e) {
      console.error(e.response?.data?.message || e.message || '목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList(currentPage);
  }, [currentPage]);

  return (
    <div className="board-container">
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
          {loading ? (
            <tr><td colSpan={4} style={{ padding: '50px' }}>데이터 로드 중...</td></tr>
          ) : list.length > 0 ? (
            list.map((board) => (
              <tr key={board.idx}>
                <td>{board.idx}</td>
                <td
                  className="title-cell"
                  onClick={() => movePage('/board/boardDetail/' + board.idx)}
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
