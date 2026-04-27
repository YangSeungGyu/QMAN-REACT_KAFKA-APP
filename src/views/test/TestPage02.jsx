import { useState } from 'react';
// ======================= 테스트 데이터 (함수 밖) =======================
const testOptions = [
  { value: "aaa", label: "AAA" },
  { value: "bbb", label: "BBB" },
  { value: "ccc", label: "CCC" },
];

const tableList = [
  { groupId: "group1", category: "카테고리 A", items: [{ id: "group1-1", label: "데이터 1-1" }, { id: "group1-2", label: "데이터 1-2" }] },
  { groupId: "group2", category: "카테고리 B", items: [{ id: "group2-1", label: "데이터 2-1" }, { id: "group2-2", label: "데이터 2-2" }] }
];

function TestPage02() {
  //===================01.TEXT======================
  const [text, setText] = useState("");
  const [resText, setResText] = useState("");

//===================04.셀렉트박스======================
  const [select, setSelect] = useState(testOptions[0].value);
  const [resSelect, setResSelect] = useState("");

  //서버 공통 데이터 이거 테스트 해보다 말음.
  //const COM01 = useSelector((state) => state.common.data?.COM01);

//===================04.라디오버튼======================
  const [radio, setRadio] = useState(testOptions[0].value);
  const [resRadio, setResRadio] = useState("");

//===================04.체크박스======================
  const [check, setCheck] = useState([]);
  const [resCheck, setResCheck] = useState("");


  //===================04.체크 박스======================
  const handleCheck = (value) => {
    setCheck(prev => prev.includes(value) ? prev.filter(i => i !== value) : [...prev, value]);
  };

  //===================05.토글 탭======================
  const [activeTab, setActiveTab] = useState('tab1');

  //===================06.TextArea======================
  const [content, setContent] = useState("");
  const [resContent, setResContent] = useState("");
  


  //===================07.중첩 테이블======================
  const [selectedIds, setSelectedIds] = useState([]);
  // 중첩테이블 상세 체크
  const handleChildCheck = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  // 중첩테이블 전체 체크
  const handleParentCheck = (childIds, isChecked) => {
    if (isChecked) {
      setSelectedIds(prev => Array.from(new Set([...prev, ...childIds])));
    } else {
      setSelectedIds(prev => prev.filter(id => !childIds.includes(id)));
    }
  };

  return (
    <div className="test-page-container">
      {/* CSS 영역 */}
      <style>{`
        /*테스트2 css*/
        .test-page-container { padding: 20px; font-family: 'Malgun Gothic', sans-serif; }
        .line-hr { border: 0; height: 1px; background: #ddd; margin: 30px 0; }
        
        /* 레이아웃 공통 */
        .test-row { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
        .section-title { color: #333; margin-bottom: 15px; }
        
        /* 공통 UI 요소 */
        .base-input { padding: 6px; border: 1px solid #ccc; border-radius: 4px; }
        .base-select { padding: 6px; border: 1px solid #ccc; border-radius: 4px; }
        .base-btn { padding: 6px 15px; cursor: pointer; background: #444; color: #fff; border: none; border-radius: 4px; }
        .base-btn:hover { background: #222; }
        .res-text { color: #007bff; font-weight: bold; margin-left: 10px; }

        /* 탭 전용 클래스 */
        .tab-menu { display: flex; border-bottom: 1px solid #ccc; }
        .tab-btn { padding: 10px 20px; cursor: pointer; border: 1px solid #ccc; border-bottom: none; margin-right: 5px; border-radius: 5px 5px 0 0; background: #f0f0f0; }
        .tab-btn.active { background: #fff; font-weight: bold; position: relative; top: 1px; }
        .tab-body { padding: 20px; border: 1px solid #ccc; border-top: none; min-height: 100px; }

        /* 테이블 전용 클래스 */
        .main-table { width: 100%; border-collapse: collapse; }
        .main-table td, .main-table th { border: 1px solid #ddd; padding: 10px; text-align: center; }
        .inner-table { width: 100%; border-collapse: collapse; background: #fff; }

        /* TextArea 전용 클래스 */
        .base-textarea { width: 100%; min-height: 100px; padding: 10px; border: 1px solid #ccc; border-radius: 4px; }
      `}</style>

      <hr className="line-hr" />{/*======================= 01. Text =======================*/}
      <section>
        <h3 className="section-title">1. Text</h3>
        <div className="test-row">
          <input type="text" className="base-input" value={text} onChange={(e) => setText(e.target.value)} placeholder="입력..." />
          <button className="base-btn" onClick={() => setResText(text)}>확인</button>
          <span className="res-text">결과: {resText}</span>
        </div>
      </section>


      <hr className="line-hr" />{/*======================= 02. Select =======================*/}

      
      <section>
        <h3 className="section-title">2. Select</h3>
        <div className="test-row">
          <select className="base-select" value={select} onChange={(e) => setSelect(e.target.value)}>
            {testOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
          <button className="base-btn" onClick={() => setResSelect(select)}>확인</button>
          <span className="res-text">결과: {resSelect}</span>



           <select className="base-select" value={select} onChange={(e) => setSelect(e.target.value)}>
            {testOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
      </section>


      <hr className="line-hr" /> {/*======================= 03. Radio =======================*/}

      
      <section>
        <h3 className="section-title">3. Radio</h3>
        <div className="test-row">
          {testOptions.map(opt => (
            <label key={opt.value} style={{ marginRight: '10px' }}>
              <input type="radio" name="gender" value={opt.value} checked={radio === opt.value} onChange={(e) => setRadio(e.target.value)} /> {opt.label}
            </label>
          ))}
          <button className="base-btn" onClick={() => setResRadio(radio)}>확인</button>
          <span className="res-text">결과: {resRadio}</span>
        </div>
      </section>


      <hr className="line-hr" /> {/*======================= 04. Checkbox =======================*/}

      
      <section>
        <h3 className="section-title">4. Checkbox</h3>
        <div className="test-row">
          {testOptions.map(opt => (
            <label key={opt.value} style={{ marginRight: '10px' }}>
              <input type="checkbox" checked={check.includes(opt.value)} onChange={() => handleCheck(opt.value)} /> {opt.label}
            </label>
          ))}
          <button className="base-btn" onClick={() => setResCheck(check.join(", "))}>확인</button>
          <span className="res-text">결과: {resCheck}</span>
        </div>
      </section>


      <hr className="line-hr" /> {/*======================= 05. 토글탭 =======================*/}

      
      <section>
        <h3 className="section-title">5. Tab Toggle</h3>
        <div className="tab-menu">
          <button className={'tab-btn ' + (activeTab === 'tab1' ? 'active' : '')} onClick={() => setActiveTab('tab1')}>탭 1</button>
          <button className={'tab-btn ' + (activeTab === 'tab2' ? 'active' : '')} onClick={() => setActiveTab('tab2')}>탭 2</button>
        </div>
        <div className="tab-body">
          {activeTab === 'tab1' && 
            <div style={{ color: 'red' }}>탭1 영역입니다.</div>
          }
          {activeTab === 'tab2' && 
            <div style={{ color: 'blue' }}>탭2 영역입니다.</div>
          }
          {/* 이구간을 else로 쓰고싶을때?
            {activeTab === 'tab1' ? (
              <div style={{ color: 'red' }}>탭1 영역입니다.</div>
            ) : activeTab === 'tab2' ? (
              <div style={{ color: 'blue' }}>탭2 영역입니다.</div>
            ) : (
              <div>선택된 탭이 없거나 기본 화면입니다.</div>
            )}
          */}
        </div>
      </section>


      <hr className="line-hr" /> {/*======================= 06. TextArea =======================*/}

      
      <section>
        <h3 className="section-title">6. TextArea</h3>
        <textarea className="base-textarea" value={content} onChange={(e) => setContent(e.target.value)} placeholder="내용을 입력하세요" />
        <div className="test-row" style={{ justifyContent: 'flex-end', marginTop: '10px' }}>
          <button className="base-btn" onClick={() => setResContent(content)}>확인</button>
        </div>
        {resContent && <div style={{ padding: '10px', background: '#eee', marginTop: '10px', whiteSpace: 'pre-wrap' }}>{resContent}</div>}
      </section>


      <hr className="line-hr" />  {/*======================= 07. 중첩테이블 =======================*/}

     
      <section>
        <h3 className="section-title">7. 중첩 테이블 체크</h3>
        <table className="main-table">
          <tbody>
            {tableList.map((group) => {
              const childIds = group.items.map(item => item.id);
              const isAllChildSelected = childIds.every(id => selectedIds.includes(id));
              return (
                <tr key={group.groupId}>
                  <td>{group.groupId}</td>
                  <td>
                    <table className="inner-table">
                      <thead>
                        <tr style={{ backgroundColor: '#f9f9f9' }}>
                          <th>
                            <input type="checkbox" checked={isAllChildSelected} onChange={(e) => handleParentCheck(childIds, e.target.checked)} />
                          </th>
                          <th>{group.category} (전체선택)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.items.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => handleChildCheck(item.id)} />
                            </td>
                            <td>{item.label}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
      <hr className="line-hr" />
    </div>
  );
}

export default TestPage02;