
import {useState,useEffect} from 'react';
import { Button, DatePicker, Space, Input, Select, Table, Divider, Modal, Card, ConfigProvider,Checkbox,Radio } from 'antd'; // 1. ConfigProvider 추가
import dayjs from 'dayjs'; 

// 2. dayjs 한글 로케일 설정
import 'dayjs/locale/ko'; 
dayjs.locale('ko'); 

// 3. Ant Design 전역 한글 로케일 불러오기
import koKR from 'antd/locale/ko_KR'; 

const { Search } = Input;
const { RangePicker } = DatePicker; 

import ShowCode from '@/components/Common/showCode'; //DeleteShowCodeLine
import sourceCode from './TestAntdUi.jsx?raw'; //DeleteShowCodeLine

function TestAntdUi() {

  const [check01,setCheck01] = useState(false);
    const [check02,setCheck02] = useState(false);

    const [radio01,setRadio01] = useState(false);

  // Table용 데이터
  const columns = [
    { title: '이름', dataIndex: 'name', key: 'name' },
    { title: '나이', dataIndex: 'age', key: 'age' },
    { title: '주소', dataIndex: 'address', key: 'address' },
  ];

  const data = [
    { key: '1', name: '홍길동', age: 32, address: '서울시 강남구' },
    { key: '2', name: '김철수', age: 42, address: '부산시 해운대구' },
  ];

  // Search
  const onSearch = (value) => {
    alert('검색어:' + value);
  };

  // from to 날짜 제한 조건 함수
  const disabledDate = (current) => {
    if (!current) return false;

    // 1. 오늘 이후(미래) 선택 불가
    const isAfterToday = current.isAfter(dayjs(), 'day');

    // 2. 특정 날짜 선택 불가 (예시: 주말인 토요일(6), 일요일(0) 선택 막기)
    const isWeekend = current.day() === 0 || current.day() === 6;

    return isAfterToday || isWeekend;
  };

  // Modal 설정
  const [modal, contextHolder] = Modal.useModal(); 
  const showConfirm = () => {
    modal.confirm({
      title: '타이틀',
      content: '내용11111111',
      okText: '확인',
      cancelText: '취소',
      centered: true,
      footer: (_, { OkBtn, CancelBtn }) => (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
          <OkBtn />
          <CancelBtn />
        </div>
      ),
      onOk() { console.log('확인 클릭'); },
      onCancel() { console.log('취소 클릭'); },
    });
  };

  const showAlert = () => {
    modal.info({
      title: '타이틀',
      content: '내용11111111',
      okText: '확인',
      centered: true,
      footer: (_, { OkBtn }) => (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
          <OkBtn />
        </div>
      ),
      onOk() { console.log('확인 클릭'); },
    });
  };


  

   const bt02CheckAlert = ()=>{
            alert('check01:'+check01+',check02:'+check02);
    }
    
    const bt02RadioAlert = ()=>{
            alert('radio01:'+radio01);
    }

  return (
    // 4. return 문 맨 바깥을 ConfigProvider로 감싸줍니다. 
    // 이렇게 하면 내부의 모든 DatePicker, RangePicker, 심지어 Table과 Modal까지 한글로 자동 번역됩니다.
    <ConfigProvider locale={koKR}>
      <>
        <ShowCode sourceCode={sourceCode || "is not found"} />{/*DeleteShowCodeLine*/}
        <div style={{ padding: 24 }}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            
            <Button type="primary">Primary 버튼</Button>

            <Divider />

            {/* 기존 단일 데이트 피커 유지 (한글 적용됨) */}
            <DatePicker />

            {/* 요청하신 옵션이 적용된 From-To 레인지 피커 아랫줄에 추가 (한글 적용됨) */}
            <RangePicker 
              disabledDate={disabledDate} 
              placeholder={['시작일(From)', '종료일(To)']}
            />

            <Divider />

            <Input placeholder="아이디를 입력하세요" />

            <Divider />
            
            <Search placeholder="검색어 입력" onSearch={onSearch} enterButton />

            <Divider />

            <Select
              defaultValue="seoul"
              style={{ width: 120 }}
              options={[
                { value: 'seoul', label: '서울' },
                { value: 'busan', label: '부산' },
              ]}
            />

            <Divider />

            <Card style={{ border: '1px solid #71717a' }}>
              <Table 
                columns={columns} 
                dataSource={data} 
                bordered 
                pagination={{ position: ['bottomCenter'], defaultPageSize: 10 }}
              />
            </Card>

            <Divider />

            {contextHolder}
            <Space direction="horizontal" size="middle">
                <Button type="primary" onClick={showAlert}>Alert</Button>
                <Button type="primary" onClick={showConfirm}>Confirm</Button>
            </Space>

            <Divider />
            
            <Checkbox
                  checked={check01}
                  onChange={(e) => setCheck01(e.target.checked)}
              >
              선택1
              </Checkbox>
              <Checkbox
                  checked={check02}
                  onChange={(e) => setCheck02(e.target.checked)}
              >
              선택2
              </Checkbox>
              <Button 
                  style={{width:'80px'}}
                  onClick={() => bt02CheckAlert()}>
                  체크값 확인
              </Button>
              
               <Divider />
              <Radio.Group
                  value={radio01}
                  onChange={(e) => setRadio01(e.target.value)}
              >
                  <Radio value="A">AAA</Radio>
                  <Radio value="B">BBB</Radio>
              </Radio.Group>
              <Button 
                  style={{width:'80px'}}
                  onClick={() => bt02RadioAlert()}>
                  라디오 확인
              </Button>
              
          </Space>
        </div>
      </>
    </ConfigProvider>
  );
}

export default TestAntdUi;