import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { useState, useEffect } from 'react';
import { comm } from 'src/context/comm.js';

ModuleRegistry.registerModules([AllCommunityModule]);

function PageGrid() {
  const [list, setList]         = useState([]);
  const [totalCnt, setTotalCnt] = useState(0);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);

  const [page, setPage]               = useState(1);
  const [size, setSize]               = useState(10);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchWriter, setSearchWriter] = useState('');

  const totalPages = Math.ceil(totalCnt / size);

  const [colDefs] = useState([
    { field: 'title',   headerName: '제목',   editable: true,  cellStyle: { textAlign: 'left', borderRight: '1px solid #e2e2e2' }, flex: 1 },
    { field: 'writer',  headerName: '작성자', editable: true,  cellStyle: { textAlign: 'left', borderRight: '1px solid #e2e2e2' }, flex: 1 },
    { field: 'regDate', headerName: '등록일', editable: false, cellStyle: { textAlign: 'left', borderRight: '1px solid #e2e2e2' }, flex: 1 },
  ]);

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

  // page 변경 시 조회
  useEffect(() => {
    fetchList({ page, size, searchTitle, searchWriter });
  }, [page]);

  const handleSearch = () => {
    setPage(1);
    fetchList({ page: 1, size, searchTitle, searchWriter });
  };

  return (
    <>
      <div style={{ height: 500 }}>
        {loading && <p>로딩중...</p>}
        {error && <p>에러: {error}</p>}

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
        </div>

        <AgGridReact
          rowData={list}
          columnDefs={colDefs}
          onCellValueChanged={(e) => console.log('변경된 값:', e.data)}
          defaultColDef={{ sortable: false }}
        />

        <div className="page-grid-paging">
          <span className="page-size-wrap">
            Page Size:
            <select value={size} onChange={(e) => { setSize(Number(e.target.value)); setPage(1); }}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </span>
          <span className="page-info">
            {(page - 1) * size + 1} to {Math.min(page * size, totalCnt)} of {totalCnt}
          </span>
          <button onClick={() => setPage(1)}                disabled={page === 1}>⏮</button>
          <button onClick={() => setPage(p => p - 1)}      disabled={page === 1}>◀</button>
          <span>Page {page} of {totalPages}</span>
          <button onClick={() => setPage(p => p + 1)}      disabled={page === totalPages}>▶</button>
          <button onClick={() => setPage(totalPages)}       disabled={page === totalPages}>⏭</button>
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
        `}
      </style>
    </>
  );
}

export default PageGrid;
