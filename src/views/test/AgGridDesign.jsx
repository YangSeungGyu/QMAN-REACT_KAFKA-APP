import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';
import ShowCode from '@/components/Common/showCode'; //DeleteShowCodeLine
import sourceCode from './AgGridDesign.jsx?raw'; //DeleteShowCodeLine

import { ModuleRegistry } from 'ag-grid-community'; 

// AG Grid 핵심 스타일 및 Balham 테마 스타일시트 로드
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';

// 필요한 모든 AG Grid 엔터프라이즈 모듈 임포트
import { 
  IntegratedChartsModule, 
  PivotModule, 
  RowGroupingModule,
  RowGroupingPanelModule,
  CellSelectionModule, 
  MenuModule,
  SideBarModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
} from 'ag-grid-enterprise'; 
import { AgChartsEnterpriseModule } from 'ag-charts-enterprise'; 

// 모듈 레지스트리에 등록
ModuleRegistry.registerModules([
  RowGroupingModule,
  RowGroupingPanelModule,
  PivotModule,
  CellSelectionModule,
  MenuModule,
  SideBarModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
  IntegratedChartsModule.with(AgChartsEnterpriseModule)
]);

function AgGridDesign() {
  const [gridApi, setGridApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  //사이드바에서 컬럼을 끄고 켤 때 실시간으로 크기를 재조정하는 함수 !!!!
  const handleColumnVisible = (params) => {
    if (params.api) {
      params.api.sizeColumnsToFit();
    }
  };

  //사이드바 버튼으로 펼치는 함수
  const toggleSideBar = () => {
    if (!gridApi) return;

    const opened = gridApi.getOpenedToolPanel();

    if (opened) {
      gridApi.closeToolPanel();

      if (gridApi.setSideBarVisible) {
        gridApi.setSideBarVisible(false);
      }
    } else {
      if (gridApi.setSideBarVisible) {
        gridApi.setSideBarVisible(true);
      }

      gridApi.openToolPanel('columns');
    }
  };

  // 데이터 구조
  const [list] = useState([
    { id: 1, year: '2024년', dept: '영업 1팀', writer: '김철수', title: 'A 상사 계약 건', sales: 1500, count: 5 },
    { id: 2, year: '2024년', dept: '영업 1팀', writer: '이영희', title: 'B 유통 납품 건', sales: 2300, count: 8 },
    { id: 3, year: '2024년', dept: '영업 2팀', writer: '박민수', title: 'C 기업 제휴 건', sales: 3100, count: 12 },
    { id: 4, year: '2024년', dept: '영업 2팀', writer: '최지우', title: 'D 솔루션 구축 건', sales: 4200, count: 15 },
    { id: 5, year: '2025년', dept: '영업 1팀', writer: '김철수', title: 'A 상사 갱신 건', sales: 1800, count: 6 },
    { id: 6, year: '2025년', dept: '영업 1팀', writer: '이영희', title: 'B 유통 확장 건', sales: 2900, count: 9 },
    { id: 7, year: '2025년', dept: '영업 2팀', writer: '박민수', title: 'C 기업 추가 건', sales: 3500, count: 14 },
    { id: 8, year: '2025년', dept: '영업 2팀', writer: '최지우', title: 'E 프로젝트 수주', sales: 5000, count: 18 },
  ]);

  // ag그리드 한글로 변경
  const koreanLocaleText = {
    contains: '포함',
    equals: '일치',
    notEqual: '불일치',
    startsWith: '시작단어',
    endsWith: '끝단어',
    blank: '공백',
    notBlank: '공백 아님',
    filterOoo: '필터링...',
    pivotMode: '피벗 모드',
    pivotColumns: '피벗 열',
    RowGroups: '행 그룹',
    values: '합산 값',
    charts: '차트 생성',
    columns : '기준변경',
    filters : '필터',
   

  };

  // 우측 filters에서 검색 조건 지정(포함,일치)
  const commonfilterParam = {
    filterOptions: ['contains', 'equals'],
    suppressAndOrCondition: true,
  };

  // 각 컬럼 속성
  const [colDefs] = useState([
    { field: 'year', headerName: '년도', enableRowGroup: true, enablePivot: true }, 
    { field: 'dept', headerName: '부서', enableRowGroup: true, enablePivot: true },
    { field: 'writer', headerName: '작성자', filter: true, filterParams: commonfilterParam, cellStyle: { textAlign: 'left', borderRight: '1px solid #e2e2e2' } },
    { field: 'title', headerName: '제목', filter: true, filterParams: commonfilterParam, cellStyle: { textAlign: 'left', borderRight: '1px solid #e2e2e2' }, flex: 1 },
    { field: 'sales', headerName: '매출액 (만원)', enableValue: true, cellStyle: { textAlign: 'right' }, valueFormatter: p => p.value?.toLocaleString() },
    { field: 'count', headerName: '판매 건수', enableValue: true, cellStyle: { textAlign: 'right' } },
  ]);

  return (
    <>
      <ShowCode sourceCode={sourceCode || "is not found"} />
      <button
        onClick={toggleSideBar}
        style={{
          marginBottom: '10px',
          padding: '8px 12px',
          cursor: 'pointer'
        }}
      >
        SideBar
      </button>
      
      <div className="ag-theme-balham" style={{ height: '700px', width: '100%' }}>
        <AgGridReact
          theme="legacy"
          onGridReady={onGridReady}
          onColumnVisible={handleColumnVisible} // [추가] 컬럼 표시 상태가 바뀔 때 실행될 이벤트 연결
          rowData={list}
          columnDefs={colDefs}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[5, 10, 20, 50]}
          localeText={koreanLocaleText}
          
          enableCharts={true}          
          cellSelection={true}       
          
          // 초기 로드 시 가로 폭 가득 채우기
          autoSizeStrategy={{
            type: 'fitGridWidth',              
            defaultMinWidth: 80,
          }}
          
          sideBar={{
            hiddenByDefault: true,
            toolPanels: [
              {
                id: 'columns',
                labelDefault: 'Columns',
                labelKey: 'columns',
                iconKey: 'columns',
                toolPanel: 'agColumnsToolPanel',
                toolPanelParams: {
                  suppressRowGroups: false,
                  suppressValues: false,
                  suppressPivots: false,
                  suppressPivotMode: false,
                }
              },
              {
                id: 'filters',
                labelDefault: 'Filters',
                labelKey: 'filters',
                iconKey: 'filter',
                toolPanel: 'agFiltersToolPanel',
              }
            ],
            defaultToolPanel: 'columns'
          }}              
          pivotMode={false} 
          suppressPivotPanel={true}
        />
      </div>
    </>
  );
}

if (typeof document !== 'undefined') {
  const styleInject = document.createElement('style');
  styleInject.innerHTML = `
    /* 1. 사이드바 전체 가로 폭 확장 */
    .ag-theme-balham .ag-side-bar, .ag-theme-balham .ag-tool-panel-wrapper {
      width: 330px !important;
      max-width: 330px !important;
    }

    /* 2. 행 그룹, 값 드롭존 상자 높이 확보 */
    .ag-theme-balham .ag-column-drop { 
      min-height: 145px !important; 
    }

    /* 3. 버그 수정 핵심: 일반 상단 서치바 아이콘이 깨지지 않도록, 딱 '드롭존 패널(.ag-column-drop)'만 강제 표시 */
    .ag-theme-balham .ag-column-panel-column-select .ag-column-drop.ag-hidden { 
      display: flex !important; 
    }
    
    /* 4. 서치바 영역의 레이아웃이 깨지거나 가려지지 않도록 패딩 및 간격 최적화 */
    .ag-theme-balham .ag-column-select-header {
      padding: 8px 12px !important;
      gap: 8px !important;
    }
    
    /* 5. 체크박스가 텍스트나 아이콘을 덮어쓰지 않도록 정렬 정돈 */
    .ag-theme-balham .ag-column-select-header .ag-checkbox {
      margin-right: 6px !important;
    }
  `;
  document.head.appendChild(styleInject);
}

export default AgGridDesign;