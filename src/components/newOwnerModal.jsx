import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewOwnerModal = ({
  trigger, setTrigger, setOwnerList, ownerList,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [gst, setGst] = useState(false);

  const handleGst = (event) => {
    if (event.target.check) {
      console.log('gst????', event.target.check);
      setGst(true);
    } else {
      setGst(false);
    }
  };

  const addNewOwner = () => {
    axios
      .post('/add-new-owner', {
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        gst,
      })
      .then((response) => {
        console.log(response.data);
        setTrigger(false);
        setOwnerList([response.data.newOwnerList]);
      })
      .catch((error) => error);
  };

  console.log('owner list', ownerList);
  if (trigger) {
    return (
      <div className="new-owner-modal">
        <div className="modal-content">
          <button type="button" className="close-btn" onClick={() => setTrigger(false)}>&times;</button>
          <h3>New Owner</h3>
          <label htmlFor="firstName">First Name: </label>
          <input type="text" name="firstName" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
          <br />
          <label htmlFor="lastName">Last Name: </label>
          <input type="text" name="lastName" value={lastName} onChange={(event) => setLastName(event.target.value)} />
          <br />
          <label htmlFor="address">Address: </label>
          <input type="text" name="address" value={address} onChange={(event) => setAddress(event.target.value)} />
          <br />
          <label htmlFor="email">Email: </label>
          <input type="text" name="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          <br />
          <label htmlFor="phoneNumber">phoneNumber: </label>
          <input type="text" name="phoneNumber" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} />
          <br />
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" id="gst" value={gst} onChange={() => handleGst} />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">GST</label>
          </div>

          <br />
          <button type="button" className="btn btn-dark" onClick={addNewOwner}>Submit </button>
        </div>
      </div>
    );
  }
  return '';
};
export default NewOwnerModal;
