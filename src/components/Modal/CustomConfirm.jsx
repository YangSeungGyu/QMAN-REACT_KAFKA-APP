import 'src/style/components/Modal/CustomModal.css';


const CustomConfirm = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="custom-sys-backdrop">
      <div className="custom-sys-content">
        <div className="custom-sys-message">{message}</div>
        <div className="custom-sys-footer">
          <button className="custom-sys-btn btn-confirm" onClick={onConfirm}>
            확인
          </button>
          <button className="custom-sys-btn btn-cancel" onClick={onCancel}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomConfirm;