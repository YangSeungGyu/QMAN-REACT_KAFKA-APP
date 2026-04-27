import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { comm } from 'src/context/comm.js';
import 'src/style/board/BoardForm.css';

function BoardDetail() {
  const { idx }   = useParams();
  const movePage  = useNavigate();

  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!idx) return;
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const result = await comm.axiosPost('/board/getBoardDetail', { idx: Number(idx) });
        setData(result);
      } catch (e) {
        console.error(e.response?.data?.message || e.message || '게시물을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [idx]);

  if (loading || !data) return <div>로딩 중...</div>;

  return (
    <div className="board-form-container">
      <h2 className="board-form-title">게시글 상세 보기</h2>

      <table className="form-table">
        <tbody>
          <tr>
            <th>제목</th>
            <td><strong>{data.title}</strong></td>
          </tr>
          <tr>
            <th>작성자 / 날짜</th>
            <td>{data.writer} | {data.date}</td>
          </tr>
          <tr>
            <th>내용</th>
            <td className="content-cell">
              {data.content || '등록된 본문 내용이 없습니다. BoardController에서 내용을 추가해보세요!'}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="form-buttons">
        <button className="btn-common btn-gray" onClick={() => movePage('/board/boardList')}>
          목록으로
        </button>
      </div>
    </div>
  );
}

export default BoardDetail;
