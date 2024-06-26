import React from 'react';
import './reviewBox.css';
import { reviewBoxProps } from '../../types';
import { create } from 'ts-node';




const ReviewBox:React.FC<reviewBoxProps> = ({message, name, $createdAt, email}) => {
  return (
    <div className="review-box">
      <div className="review-header">
        <div className="review-avatar">
          {/* <img src="https://via.placeholder.com/50" alt="Avatar" /> */}
          
        </div>
        <div className="review-info">
          <h3 className="review-name">{name}</h3>
          <p className="review-email">{email}</p>
          <p className="review-date">{$createdAt}</p>
        </div>
      </div>
      <p className="review-message">{message}</p>
    </div>
  );
};

export default React.memo(ReviewBox);
