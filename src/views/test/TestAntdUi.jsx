
import { Button, DatePicker, Space, Input, Select, Table, Divider,  Modal, Card  } from 'antd';
const { Search } = Input;




function TestAntdUi() {

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


  //search
  const onSearch = (value) => {
    alert('검색어:'+ value)
  };


  // modal을 이용한 alert, confirm
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
      onOk() {
        console.log('확인 클릭');
      },
      onCancel() {
        console.log('취소 클릭');
      },
    });
  };

  //modal.type :  info,success,error,warning
  const showAlert = () => {
    modal.info({
      title: '타이틀',
      content: '내용11111111',
      okText: '확인',
      centered: true,
      footer: (_, { OkBtn}) => (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
          <OkBtn />
        </div>
      ),
      onOk() {
        console.log('확인 클릭');
      },
    });
  };

  return(
    <>
    <div style={{ padding: 24 }}>
      <Space direction="vertical" size="middle">
        {/* type : primary, default, dashed, text, link */}
        {/* prop : danger, ghost, shape,  block  */}
        <Button type="primary">Primary 버튼</Button>

        <Divider />{/*-----------------------------------*/}

        <DatePicker />

        <Divider />{/*-----------------------------------*/}

        <Input placeholder="아이디를 입력하세요" />

        <Divider />{/*-----------------------------------*/}
        

        <Search placeholder="검색어 입력" onSearch={onSearch} enterButton />

        <Divider />{/*-----------------------------------*/}

        <Select
          defaultValue="seoul"
          style={{ width: 120 }}
          options={[
            { value: 'seoul', label: '서울' },
            { value: 'busan', label: '부산' },
          ]}
        />

        <Divider />{/*-----------------------------------*/}

        {/* Card는 직접 스타일 적용 가능 table은 불가*/}
        <Card style={{ border: '1px solid #71717a' }}>
          <Table 
            columns={columns} 
            dataSource={data} 
            bordered 
            pagination={{
              position: ['bottomCenter'], 
              defaultPageSize: 10,
              // showSizeChanger: true,
              // showTotal: (total) => `총 ${total}개 항목`,
            }}
          />
         </Card>

         <Divider />{/*-----------------------------------*/}

          {contextHolder}
          <Space direction="horizontal" size="middle">
              <Button type="primary"  onClick={showAlert}>
                Alert
              </Button>
              <Button type="primary"  onClick={showConfirm}>
                Confirm
              </Button>
          </Space>
          
       </Space>
    </div>
    </>
  );
}
export default TestAntdUi