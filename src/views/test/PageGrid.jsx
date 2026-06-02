import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { useState, useEffect } from 'react';
import { comm } from '@/js/comm.js';
import ShowCode from '@/components/Common/showCode'; //DeleteShowCodeLine
import sourceCode from './PageGrid.jsx?raw'; //DeleteShowCodeLine
import ModalLayout from '@/components/Modal/ModalLayout';

ModuleRegistry.registerModules([AllCommunityModule]);

function PageGrid() {
  
  const [list, setList]         = useState([]);
  const [totalCnt, setTotalCnt] = useState(0);
  const [_loading, setLoading]   = useState(false);
  const [_error, setError]       = useState(null);

  const [page, setPage]               = useState(1);
  const [size, setSize]               = useState(10);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchWriter, setSearchWriter] = useState('');

  // 수정 및 삭제 대상 통합 리스트
  const [changedRows, setChangedRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null); // 선택된 행 데이터를 보관할 상태

  const totalPages = Math.ceil(totalCnt / size);

  // 1. 컬럼 정의에 '삭제' 열 추가 및 cellRenderer 설정
  const [colDefs] = useState([
    { field: 'title',   headerName: '제목',   editable: false,  cellStyle: { textAlign: 'left', borderRight: '1px solid #e2e2e2' }, flex: 1 },
    { field: 'writer',  headerName: '작성자', editable: true,  cellStyle: { textAlign: 'left', borderRight: '1px solid #e2e2e2' }, flex: 1 },
    { field: 'regDate', headerName: '등록일', editable: false, cellStyle: { textAlign: 'left', borderRight: '1px solid #e2e2e2' }, flex: 1 },
    {
      headerName: '삭제',
      field: 'delete',
      editable: false,
      sortable: false,
      filter: false,
      width: 90,
      cellStyle: { textAlign: 'center', borderRight: '1px solid #e2e2e2' },
      // 커스텀 버튼 렌더링
      cellRenderer: (params) => {
        return (
          <button 
            className="grid-del-btn"
            onClick={() => handleDeleteRow(params.data)}
          >
            삭제
          </button>
        );
      }
    }
  ]);

  // grid 수정 시 수정대상에 추가 (status: 'U')
  const handleCellValueChanged = (e) => {
    setChangedRows(prev => {
      const exists = prev.findIndex(row => row.idx === e.data.idx);
      if (exists >= 0) {
        const updated = [...prev];
        // 이미 삭제 처리된 건이라면 수정 데이터를 덮어쓰지 않음
        if (updated[exists].status === 'D') return prev;

        updated[exists] = { ...e.data, status: 'U' };
        return updated;
      }
      return [...prev, { ...e.data, status: 'U' }];
    });
  };

  // 2. 삭제 버튼 클릭 핸들러
  const handleDeleteRow = (rowData) => {
    // 화면 grid 리스트에서 즉시 제외
    setList(prev => prev.filter(row => row.idx !== rowData.idx));
    
    // 저장 대상 리스트(changedRows)에 status: 'D'로 추가 혹은 전환
    setChangedRows(prev => {
      const exists = prev.findIndex(row => row.idx === rowData.idx);
      if (exists >= 0) {
        const updated = [...prev];
        updated[exists] = { ...rowData, status: 'D' }; // 기존에 수정('U') 중이었어도 삭제('D')가 우선됨
        return updated;
      }
      return [...prev, { ...rowData, status: 'D' }];
    });
  };

  // 저장 시 수정/삭제 대상 초기화
  const handleSave = () => {
    if(changedRows.length > 0 ){
      alert(JSON.stringify(changedRows, null, 2));
      setChangedRows([]); // 초기화
      // 실무에서는 여기에 통신 후 fetchList() 재호출 처리가 들어갑니다.
    } else {
      alert('변경 대상이 없습니다.');
    }
  };

  const fetchList = async (params) => {
    setLoading(true);
    setError(null);
    try {
      const data = await comm.axiosPost('/test/getPageGridList', params);
      setList(data.list);
      setTotalCnt(data.totalCount);
    } catch (e) {
      setError(e.response?.data?.message || e.message || '목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // page 변경 시 조회 (페이지 전환 시 기존 수정 데이터가 날아가지 않도록 유의)
  useEffect(() => {
    fetchList({ page, size, searchTitle, searchWriter });
  }, [page]);

  const handleSearch = () => {
    setPage(1);
    setChangedRows([]); // 검색 시 대기열 초기화 여부는 기획에 따라 결정
    fetchList({ page: 1, size, searchTitle, searchWriter });
  };



  //모달
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCellDoubleClicked = (event) => {

    if (event.column.getColId() !== 'title') {
      return; 
    }

    // event.data에 해당 행(Row)의 전체 오브젝트 데이터가 들어있습니다.
    setSelectedRow(event.data); 
    console.log(event.data);
    setIsModalOpen(true); // 팝업 오픈
  };

  return (
    <>
      <ShowCode sourceCode={sourceCode|| "is not found"}/>
      <div style={{ display: 'flex', flexDirection: 'column', height: 500 }}>
        
        <div className="page-grid-search">
          <input
            type="text"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            placeholder="제목"
          />
          <input
            type="text"
            value={searchWriter}
            onChange={(e) => setSearchWriter(e.target.value)}
            placeholder="작성자"
          />
          <button onClick={handleSearch}>검색</button>
          <button onClick={handleSave}>저장</button>
        </div>

        <AgGridReact
          rowData={list}
          columnDefs={colDefs}
          onCellValueChanged={handleCellValueChanged} 
          defaultColDef={{ sortable: false }}
          style={{ height: '100%', width: '100%' }}
           onCellDoubleClicked={handleCellDoubleClicked}
        />

        <div className="page-grid-paging">
          <span className="page-size-wrap">
            Page Size: 
            <select value={size} onChange={(e) => { 
              const newSize = Number(e.target.value);
              setSize(newSize); 
              setPage(1);
              fetchList({ page: 1, size: newSize, searchTitle, searchWriter }); 
            }}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </span>
          <span className="page-info">
            {(page - 1) * size + 1} to {Math.min(page * size, totalCnt)} of {totalCnt}
          </span>
          <button onClick={() => setPage(1)}                 disabled={page === 1}>⏮</button>
          <button onClick={() => setPage(p => p - 1)}       disabled={page === 1}>◀</button>
          <span>Page {page} of {totalPages}</span>
          <button onClick={() => setPage(p => p + 1)}       disabled={page === totalPages}>▶</button>
          <button onClick={() => setPage(totalPages)}        disabled={page === totalPages}>⏭</button>
        </div>
      </div>

      <style>
        {`
          .ag-paging-panel { justify-content: center !important; }

          .page-grid-paging {
            display: flex; align-items: center; justify-content: center;
            gap: 4px; padding: 8px 0; font-size: 13px; color: #333;
            background-color: #fff; border: 1px solid #e2e2e2;
            border-top: none; border-radius: 0 0 8px 8px;
          }
          .page-grid-paging .page-size-wrap { margin-right: 12px; }
          .page-grid-paging .page-size-wrap select { margin-left: 4px; font-size: 13px; }
          .page-grid-paging .page-info { margin-right: 12px; }
          .page-grid-paging button { border: none; background: none; cursor: pointer; font-size: 14px; color: #333; }
          .page-grid-paging button:disabled { color: #ccc; cursor: default; }

          .page-grid-search {
            display: flex; align-items: center; gap: 8px;
            padding: 10px 12px; background-color: #fff;
            border: 1px solid #e2e2e2; border-radius: 8px 8px 0 0; border-bottom: none;
          }
          .page-grid-search input {
            padding: 5px 10px; font-size: 13px;
            border: 1px solid #e2e2e2; border-radius: 4px; outline: none;
          }
          .page-grid-search input:focus { border-color: #aaa; }
          .page-grid-search button {
            padding: 5px 14px; font-size: 13px;
            background-color: #555; color: #fff;
            border: none; border-radius: 4px; cursor: pointer;
          }
          .page-grid-search button:hover { background-color: #333; }

          /* 3. 그리드 안의 빨간색 삭제 버튼 스타일 */
          .grid-del-btn {
            background-color: #dc3545;
            color: white;
            border: none;
            padding: 2px 8px;
            font-size: 12px;
            border-radius: 4px;
            cursor: pointer;
            line-height: 1.5;
          }
          .grid-del-btn:hover {
            background-color: #bd2130;
          }
        `}
      </style>

      <ModalLayout 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title="테스트모달1"
          modalBody={
            <div className="modal-body-container">
          
                <table className="sample-table">
                  <colgroup>
                    <col style={{ width: '100%' }} />
                  
                  </colgroup>
                  <thead>
                    <tr>
                      <th>항목 명칭</th>
                    
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {/* 렌더링(특히 새로고침) 시 null이기에 ?가 반드시 필요함*/}
                      <td>{selectedRow?.title}</td>
                    </tr>
                    
                  </tbody>
                </table>
            
              <div className="modal-footer">
                버튼영역
              </div>
           
            </div>

          }
       />
    </>
  );
}

export default PageGrid;