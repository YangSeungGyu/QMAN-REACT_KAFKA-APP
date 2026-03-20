import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { boardDetailRequest } from 'src/features/board/boardActions';
import 'src/style/board/BoardForm.css'

function BoardDetail() {

  const { idx } = useParams(); // URL에서 idx 파라미터 추출
  const movePage = useNavigate();
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.boardDetail);

  useEffect(() => {
    const fetchDetail = async () => {
      if (idx) {
        dispatch(boardDetailRequest(Number(idx)));
      }
    };
    fetchDetail();
  }, [idx, dispatch]);

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
              {data.content || "등록된 본문 내용이 없습니다. BoardController에서 내용을 추가해보세요!"}
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