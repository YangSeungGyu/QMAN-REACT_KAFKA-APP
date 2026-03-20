import React, { useEffect } from 'react';
import 'src/style/components/Modal/ModalLayout.css'

const ModalLayout = ({ isOpen, onClose, title, modalBody }) => {  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
   <>
      <div className="modal-backdrop" onClick={onClose} />

      <div className="modal-wrapper">
        <div className="modal-content">
          <div className="modal-header">
            <h3>{title}</h3>
            <button className="modal-close-btn" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            {modalBody}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalLayout;