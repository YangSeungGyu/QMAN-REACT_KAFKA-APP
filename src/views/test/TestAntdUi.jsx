
import { Button, DatePicker, Space, Input, Select, Table, Divider } from 'antd';
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

  return(
    <>
    <div style={{ padding: 24 }}>
      <Space direction="vertical" size="middle">
        <Button type="primary">Primary 버튼</Button>
        <Divider />
        <DatePicker />
        <Divider />
        <Input placeholder="아이디를 입력하세요" />
        <Divider />
        <Search placeholder="검색어 입력" onSearch={value => console.log(value)} enterButton />
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
        <Table 
          columns={columns} 
          dataSource={data} 
          pagination={{
            position: ['bottomCenter'], 
            defaultPageSize: 10,
            // showSizeChanger: true,
            // showTotal: (total) => `총 ${total}개 항목`,
          }}
         />

       </Space>
    </div>
    </>
  );
}
export default TestAntdUi