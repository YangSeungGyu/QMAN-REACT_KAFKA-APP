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
  const [changedRows, setChangedRows] = useState([]);
  
  const [groupCount, setGroupCount] = useState(0);
  
  // 💡 [추가] 현재 그룹들이 펼쳐져 있는지 여부를 관리하는 토글 상태
  const [isExpanded, setIsExpanded] = useState(false);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGroupCount(params.api.getRowGroupColumns().length);
  };

  const handleColumnVisible = (params) => {
    if (params.api) {
      params.api.sizeColumnsToFit();
    }
  };

  const handleRowGroupChanged = (params) => {
    if (params.api) {
      const count = params.api.getRowGroupColumns().length;
      setGroupCount(count);
      
      // 그룹이 아예 없어지면 토글 상태도 초기화
      if (count === 0) {
        setIsExpanded(false);
      }
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

  // 데이터 구조 (총 40개 샘플 데이터)
  const [list, setList] = useState([
    { id: 1, year: '2024년', dept: '영업 1팀', writer: '김철수', title: 'A 상사 계약 건', sales: 1500, count: 5 },
    { id: 2, year: '2024년', dept: '영업 1팀', writer: '이영희', title: 'B 유통 납품 건', sales: 2300, count: 8 },
    { id: 3, year: '2024년', dept: '영업 2팀', writer: '박민수', title: 'C 기업 제휴 건', sales: 3100, count: 12 },
    { id: 4, year: '2024년', dept: '영업 2팀', writer: '최지우', title: 'D 솔루션 구축 건', sales: 4200, count: 15 },
    { id: 9, year: '2024년', dept: '영업 3팀', writer: '정본부', title: 'F 유통망 개척', sales: 1200, count: 4 },
    { id: 10, year: '2024년', dept: '영업 3팀', writer: '강대리', title: 'G 물류 계약', sales: 2500, count: 7 },
    { id: 11, year: '2024년', dept: '마케팅팀', writer: '홍길동', title: '상반기 브랜드 캠페인', sales: 800, count: 3 },
    { id: 12, year: '2024년', dept: '마케팅팀', writer: '한소희', title: '인플루언서 협찬 광고', sales: 1400, count: 6 },
    { id: 13, year: '2024년', dept: '해외영업팀', writer: '존스미스', title: '미국 바이어 발굴', sales: 5500, count: 10 },
    { id: 14, year: '2024년', dept: '해외영업팀', writer: '데이비드', title: '동남아 총판 계약', sales: 6200, count: 13 },
    { id: 5, year: '2025년', dept: '영업 1팀', writer: '김철수', title: 'A 상사 갱신 건', sales: 1800, count: 6 },
    { id: 6, year: '2025년', dept: '영업 1팀', writer: '이영희', title: 'B 유통 확장 건', sales: 2900, count: 9 },
    { id: 7, year: '2025년', dept: '영업 2팀', writer: '박민수', title: 'C 기업 추가 건', sales: 3500, count: 14 },
    { id: 8, year: '2025년', dept: '영업 2팀', writer: '최지우', title: 'E 프로젝트 수주', sales: 5000, count: 18 },
    { id: 15, year: '2025년', dept: '영업 3팀', writer: '정본부', title: 'F 유통망 유지 건', sales: 1500, count: 5 },
    { id: 16, year: '2025년', dept: '영업 3팀', writer: '강대리', title: 'H 마트 입점 계약', sales: 3200, count: 9 },
    { id: 17, year: '2025년', dept: '마케팅팀', writer: '홍길동', title: '성과형 광고 운영', sales: 2100, count: 8 },
    { id: 18, year: '2025년', dept: '마케팅팀', writer: '한소희', title: '팝업스토어 기획', sales: 4500, count: 11 },
    { id: 19, year: '2025년', dept: '해외영업팀', writer: '존스미스', title: '북미 2차 오더 수주', sales: 7000, count: 15 },
    { id: 20, year: '2025년', dept: '해외영업팀', writer: '데이비드', title: '유럽 신규 시장 진출', sales: 4800, count: 8 },
    { id: 21, year: '2026년', dept: '영업 1팀', writer: '김철수', title: 'A 상사 장기 계약', sales: 2500, count: 8 },
    { id: 22, year: '2026년', dept: '영업 1팀', writer: '이영희', title: '신규 프랜차이즈 공급', sales: 3400, count: 11 },
    { id: 23, year: '2026년', dept: '영업 2팀', writer: '박민수', title: 'C 기업 파트너십 연장', sales: 4000, count: 16 },
    { id: 24, year: '2026년', dept: '영업 2팀', writer: '최지우', title: '공공기관 입찰 참가가', sales: 6500, count: 22 },
    { id: 25, year: '2026년', dept: '영업 3팀', writer: '정본부', title: 'F 유통망 전국 확대', sales: 2800, count: 9 },
    { id: 26, year: '2026년', dept: '영업 3팀', writer: '강대리', title: 'I 팩토리 제휴 건', sales: 3900, count: 12 },
    { id: 27, year: '2026년', dept: '마케팅팀', writer: '홍길동', title: '글로벌 브랜드 리브랜딩', sales: 5000, count: 10 },
    { id: 28, year: '2026년', dept: '마케팅팀', writer: '한소희', title: '바이럴 영상 제작', sales: 1800, count: 5 },
    { id: 29, year: '2026년', dept: '해외영업팀', writer: '존스미스', title: '남미 대리점 계약', sales: 6100, count: 11 },
    { id: 30, year: '2026년', dept: '해외영업팀', writer: '데이비드', title: '유럽 바이어 물량 증대', sales: 8500, count: 19 },
    { id: 31, year: '2027년', dept: '영업 1팀', writer: '김철수', title: 'A 상사 품목 다변화', sales: 3100, count: 10 },
    { id: 32, year: '2027년', dept: '영업 1팀', writer: '이영희', title: 'B 유통 물류 통합 건', sales: 4200, count: 14 },
    { id: 33, year: '2027년', dept: '영업 2팀', writer: '박민수', title: 'C 기업 해외 동반 진출', sales: 5500, count: 20 },
    { id: 34, year: '2027년', dept: '영업 2팀', writer: '대기업 차세대 시스템 구축', sales: 9200, count: 30 },
    { id: 35, year: '2027년', dept: '영업 3팀', writer: '정본부', title: '온라인 이커머스 입점', sales: 4500, count: 15 },
    { id: 36, year: '2027년', dept: '영업 3팀', writer: '강대리', title: 'K 홀딩스 독점 공급', sales: 5100, count: 17 },
    { id: 37, year: '2027년', dept: '마케팅팀', writer: '홍길동', title: 'AI 기반 타겟 마케팅', sales: 3300, count: 9 },
    { id: 38, year: '2027년', dept: '마케팅팀', writer: '한소희', title: '연말 대규모 페스티벌', sales: 7500, count: 18 },
    { id: 39, year: '2027년', dept: '해외영업팀', writer: '존스미스', title: '중동 국책 사업 참여', sales: 9800, count: 21 },
    { id: 40, year: '2027년', dept: '해외영업팀', writer: '데이비드', title: '글로벌 물류 허브 계약', sales: 12000, count: 25 }
  ]);

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
    columns: '기준변경',
    filters: '필터',
  };

  const commonfilterParam = {
    filterOptions: ['contains', 'equals'],
    suppressAndOrCondition: true,
  };

  const handleCellValueChanged = (e) => {
    setChangedRows(prev => {
      const exists = prev.findIndex(row => row.id === e.data.id);
      if (exists >= 0) {
        const updated = [...prev];
        updated[exists] = { ...e.data, status: 'U' };
        return updated;
      }
      return [...prev, { ...e.data, status: 'U' }];
    });
  };

  const handleSave = () => {
    if (changedRows.length > 0) {
      alert(JSON.stringify(changedRows, null, 2));
      setChangedRows([]);
    } else {
      alert('변경 대상이 없습니다.');
    }
  };

  const [colDefs] = useState([
    { field: 'year', headerName: '년도', enableRowGroup: true, enablePivot: true }, 
    { field: 'dept', headerName: '부서', enableRowGroup: true, enablePivot: true },
    { field: 'writer', headerName: '작성자', filter: true, filterParams: commonfilterParam, cellStyle: { textAlign: 'left', borderRight: '1px solid #e2e2e2' } },
    { field: 'title', headerName: '제목', filter: true, filterParams: commonfilterParam, cellStyle: { textAlign: 'left', borderRight: '1px solid #e2e2e2' }, flex: 1 },
    { field: 'sales', headerName: '매출액 (만원)', editable: (params) => { return !params.node.group; }, enableValue: true, cellStyle: { textAlign: 'right' }, valueFormatter: p => p.value?.toLocaleString() },
    { field: 'count', headerName: '판매 건수', editable: (params) => { return !params.node.group; }, enableValue: true, cellStyle: { textAlign: 'right' } },
  ]);

  // 💡 [수정] 하나의 버튼으로 열고 닫는 토글 함수
  const toggleExpandAll = () => {
    if (!gridApi) return;

    if (isExpanded) {
      gridApi.collapseAll();     // 다 닫기
      setIsExpanded(false);
    } else {
      gridApi.expandAll();       // 다 펼치기
      setIsExpanded(true);
    }
  };

  return (
    <>
      <ShowCode sourceCode={sourceCode || "is not found"} />
      
      <div style={{ marginBottom: '10px', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <button onClick={toggleSideBar}>SideBar</button>
        <button onClick={handleSave} style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', padding: '8px 12px', cursor: 'pointer' }}>저장</button>
        
        {/* 💡 [수정] 그룹이 지정되었을 때만 '단 하나의 토글 버튼' 노출 */}
        {groupCount > 0 && (
          <button 
            onClick={toggleExpandAll} 
            style={{ 
              padding: '8px 12px', 
              cursor: 'pointer', 
              fontWeight: 'bold', 
              backgroundColor: '#dddddd',
              border: 'none', 
              borderRadius: '4px',
              animation: 'fadeIn 0.2s',
              transition: 'background-color 0.2s'
            }}
          >
            {isExpanded ? '[-]' : '[+]'}
          </button>
        )}
      </div>
      
      <div className="ag-theme-balham" style={{ height: '700px', width: '100%' }}>
        <AgGridReact
          theme="legacy"
          onGridReady={onGridReady}
          onColumnVisible={handleColumnVisible}
          onCellValueChanged={handleCellValueChanged}
          
          onRowGroupChanged={handleRowGroupChanged}
          onColumnRowGroupChanged={handleRowGroupChanged}
          
          rowData={list}
          columnDefs={colDefs}
          pagination={true}
          paginationPageSize={20}
          paginationPageSizeSelector={[5, 10, 20, 50]}
          localeText={koreanLocaleText}
          enableCharts={true}          
          cellSelection={true}       
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
    .ag-theme-balham .ag-side-bar, .ag-theme-balham .ag-tool-panel-wrapper {
      width: 330px !important;
      max-width: 330px !important;
    }
    .ag-theme-balham .ag-column-drop { 
      min-height: 145px !important; 
    }
    .ag-theme-balham .ag-column-panel-column-select .ag-column-drop.ag-hidden { 
      display: flex !important; 
    }
    .ag-theme-balham .ag-column-select-header {
      padding: 8px 12px !important;
      gap: 8px !important;
    }
    .ag-theme-balham .ag-column-select-header .ag-checkbox {
      margin-right: 6px !important;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateX(-5px); }
      to { opacity: 1; transform: translateX(0); }
    }
  `;
  document.head.appendChild(styleInject);
}

export default AgGridDesign;