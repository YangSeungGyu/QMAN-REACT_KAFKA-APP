import CustomButton from 'src/components/Atom/CustomButton';


const BodyJoinFinalConfirm = ({ formData, onConfirm, onCancel }) => {
  return (
    <div className="modal-inner-content">
      <div className="info-summary" style={{ textAlign: 'left', backgroundColor: '#f9f9f9', padding: '15px' }}>
        <p style={{ fontSize: '12px', color: '#888', marginBottom: '10px' }}>[전송 데이터 최종 확인]</p>
        <pre style={{ fontSize: '13px', lineHeight: '1.6', margin: 0, whiteSpace: 'pre-wrap' }}>
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>

      <p className="confirm-msg" style={{ marginTop: '15px' }}>
        회원가입을 완료하시겠습니까?<br/>
      </p>

      
      <div className="modal-action-btns">
        <CustomButton label="가입완료" onClickFunc={onConfirm} />
        <CustomButton label="취소" onClickFunc={onCancel} />
      </div>
    </div>
  );
};

export default BodyJoinFinalConfirm;