import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // 1. useSelector 추가
import { comm } from 'src/context/CommonContext';
import 'src/style/board/BoardForm.css'

const BoardWrite = () => {

//로그인 검증
const navigate = useNavigate();

const { isLoggedIn} = useSelector((state) => state.auth);

useEffect(() => {
    //isLoggedIn 사용 (체크 로직)  테스트 /board/boardWrite
    if (!isLoggedIn) {
      comm.customAlert("로그인이 필요합니다.");
      navigate('/login');
    }
}, [isLoggedIn, navigate]);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const movePage = (path) => {
    navigate(path);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      comm.customAlert("제목과 내용을 입력해주세요.");
      return;
    }

    const data = { title, content };
    console.log("저장 데이터:", data);

    comm.customAlert("게시글이 등록되었습니다.");
    movePage('/board/boardList');
  };

  return (
    <div className="board-form-container">
      <h2 className="board-form-title">게시글 작성</h2>
      
      <table className="form-table">
        <tbody>
          <tr>
            <th>제목</th>
            <td>
              <input 
                type="text" 
                className="write-input" 
                placeholder="제목을 입력해주세요"
                value={title}
                onChange={handleTitleChange}
              />
            </td>
          </tr>
          <tr>
            <th>내용</th>
            <td className="content-cell">
              <textarea 
                className="write-textarea" 
                placeholder="내용을 입력해주세요"
                value={content}
                onChange={handleContentChange}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="form-buttons">
        <button type="button" className="btn-common btn-gray" onClick={() => movePage('/board/boardList')}>
          취소
        </button>
        <button type="button" className="btn-common btn-navy" onClick={handleSubmit}>
          등록하기
        </button>
      </div>
    </div>
  );
};

export default BoardWrite;