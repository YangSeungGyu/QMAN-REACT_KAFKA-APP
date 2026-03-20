import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { useState, useEffect } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { basicGridListRequest } from 'src/features/test/basicGridActions'; 

ModuleRegistry.registerModules([AllCommunityModule]);

function BasicGrid() {
    const dispatch = useDispatch();
    const { list, loading, error } = useSelector(state => state.basicGrid);


    const commonfilterParam = {
      filterOptions: ['contains', 'equals'],
      suppressAndOrCondition: true,
    }

    const [colDefs] = useState([
      {field:'title', headerName:'제목', filter: true, filterParams:commonfilterParam, editable:true,cellStyle:{textAlign : 'left',borderRight: '1px solid #e2e2e2'},flex:1},
      {field:'writer', headerName:'작성자', filter: true, filterParams:commonfilterParam, editable:true,cellStyle:{textAlign : 'left',borderRight: '1px solid #e2e2e2'},flex:1},
      {field:'regDate', headerName:'등록일', editable:false,cellStyle:{textAlign : 'left',borderRight: '1px solid #e2e2e2'},flex:1},
    ]);

    useEffect(()=>{
      dispatch(basicGridListRequest());
    },[dispatch]);


  return (
    <>
      <div style={{ height: 500 }}>
        {loading && <p>로딩중...</p>}
        {error && <p>에러:{error}</p>}

        <AgGridReact
          rowData={list}
          columnDefs={colDefs}
          onCellValueChanged={(e) => console.log('변경된 값:', e.data)}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[5,10, 20, 50]}
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
