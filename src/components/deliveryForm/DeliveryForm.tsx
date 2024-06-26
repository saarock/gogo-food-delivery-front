import React from 'react';
import './deleveryForm.css';
import { DeliveryFormProps } from '../../types';

const DeleveryForm: React.FC<DeliveryFormProps> = ({onAddressChange, onFormSubmit, onNumberChange, phoneNumber,
  userName, address, onUserNameChange
}) => {


  const stop = (e:React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }
  return (
    <div className="gogo-static-delivery-form-container" onClick={stop}>
      <h2>Delivery Information</h2>
      <form onSubmit={onFormSubmit} className="gogo-static-delivery-form" >
        <div className="gogo-form-group">
          <label htmlFor="userName">User Name</label>
          <input type="text" id="placeName" required onChange={onUserNameChange} value={userName}/>
        </div>
        <div className="gogo-form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input type="tel" id="phoneNumber" pattern="[0-9]{10}" required onChange={onNumberChange} value={phoneNumber} />
          <small>Format: 10 digits</small>
        </div>
        <div className="gogo-form-group">
          <label htmlFor="address">Address</label>
          <input type="text" id="address" required onChange={onAddressChange} value={address}/>
          <small>Fixed address.</small>
        </div>
        <div className="gogo-terms-and-conditions">
          <input type="checkbox" id="terms" required />
          <label htmlFor="terms">I agree to the <a href="/gogo-terms-and-conditions" target="_blank" rel="noopener noreferrer">Terms and Conditions</a></label>
        </div>
        <button type="submit" className="gogo-submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default React.memo(DeleveryForm);
