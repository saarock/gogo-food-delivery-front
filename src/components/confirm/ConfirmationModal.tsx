import React from 'react';
import './ConfirmationModal.css';
import { ConfirmationModel } from '../../types';

const ConfirmationModal: React.FC<ConfirmationModel> = ({ show, onConfirm, onCancel }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Are You Sure?</h2>
        <p>Do you really want to proceed with this action?</p>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="btn confirm-btn">Yes</button>
          <button onClick={onCancel} className="btn cancel-btn">No</button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ConfirmationModal);
