import CustomButton from 'src/components/Atom/CustomButton'

const BodyMemberConfirm = ({ formData, onConfirm, onCancel }) => {
  return (
    <div className="modal-inner-content">
          <div className="info-summary">
            <p><strong>이름:</strong> {formData.name}</p>
            <p><strong>주민번호:</strong> {formData.ssnFront}-{formData.ssnBackFirst}******</p>
            <p><strong>전화번호:</strong> {formData.phone}</p>
          </div>
          <p className="confirm-msg">입력하신 정보가 정확합니까?<br/>확인 후에는 정보를 수정할 수 없습니다.</p>
          <div className="modal-action-btns">
             <CustomButton label="확인" onClickFunc={onConfirm} />
             <CustomButton label="취소" onClickFunc={onCancel} />
          </div>
        </div>
  );
};
export default BodyMemberConfirm;