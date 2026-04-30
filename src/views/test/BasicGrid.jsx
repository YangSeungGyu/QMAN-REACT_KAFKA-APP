import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { useState, useEffect } from 'react';
import { comm } from '@/js/comm.js';
import ShowCode from '@/components/Common/showCode'; //DeleteShowCodeLine
import sourceCode from './BasicGrid.jsx?raw'; //DeleteShowCodeLine
import commJsSourceCode from '@/js/comm.js?raw'; //DeleteShowCodeLine

ModuleRegistry.registerModules([AllCommunityModule]);

function BasicGrid() {
  const subSourceCodeObj =  {'@/js/comm.js':commJsSourceCode} //DeleteShowCodeLine
  const [list, setList]       = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const commonfilterParam = {
    filterOptions: ['contains', 'equals'],
    suppressAndOrCondition: true,
  };

  const [colDefs] = useState([
    { field: 'title',   headerName: '제목',   filter: true, filterParams: commonfilterParam, editable: true,  cellStyle: { textAlign: 'left', borderRight: '1px solid #e2e2e2' }, flex: 1 },
    { field: 'writer',  headerName: '작성자', filter: true, filterParams: commonfilterParam, editable: true,  cellStyle: { textAlign: 'left', borderRight: '1px solid #e2e2e2' }, flex: 1 },
    { field: 'regDate', headerName: '등록일',                                                editable: false, cellStyle: { textAlign: 'left', borderRight: '1px solid #e2e2e2' }, flex: 1 },
  ]);

  const fetchList = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await comm.axiosPost('/test/getBasicGridList', {});
      setList(data.list);
    } catch (e) {
      setError(e.response?.data?.message || e.message || '목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <ShowCode sourceCode={sourceCode|| "is not found"} subSourceCodeObj={subSourceCodeObj}  />{/*DeleteShowCodeLine*/}
      <div style={{ height: 500 }}>
        {loading && <p>로딩중...</p>}
        {error && <p>에러: {error}</p>}
        <AgGridReact
          rowData={list}
          columnDefs={colDefs}
          onCellValueChanged={(e) => console.log('변경된 값:', e.data)}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[5, 10, 20, 50]}
        />
      </div>
      <style>
        {`
        .ag-paging-panel {
          justify-content: center !important;
        }
        `}
      </style>
    </>
  );
}

export default BasicGrid;
