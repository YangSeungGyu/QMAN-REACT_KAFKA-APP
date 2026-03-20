import CustomButton from 'src/components/Atom/CustomButton'
import 'src/style/components/Modal/BodyTestSample.css'

const BodyTestSample = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-body-container">
      <table className="sample-table">
        <colgroup>
          <col style={{ width: '40%' }} />
          <col style={{ width: '40%' }} />
          <col style={{ width: '20%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>항목 명칭</th>
            <th>업데이트 날짜</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>기본 환경 설정</td>
            <td>2024-05-20</td>
            <td style={{ color: '#27ae60', fontWeight: 'bold' }}>완료</td>
          </tr>
          <tr>
            <td>데이터베이스 연결</td>
            <td>2024-05-21</td>
            <td style={{ color: '#f39c12', fontWeight: 'bold' }}>대기</td>
          </tr>
          <tr>
            <td>보안 프로토콜 적용</td>
            <td>-</td>
            <td style={{ color: '#e74c3c', fontWeight: 'bold' }}>미착수</td>
          </tr>
        </tbody>
      </table>

      <div className="modal-footer">
        <CustomButton label="취소" onClickFunc={onCancel} />
        <CustomButton label="확인" onClickFunc={onConfirm} />
      </div>
    </div>
  );
};

export default BodyTestSample;