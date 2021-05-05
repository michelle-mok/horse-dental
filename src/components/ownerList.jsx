import axios from 'axios';
import React, { useState } from 'react';
import NewOwnerModal from './newOwnerModal.jsx';

const OwnerList = ({ ownerList, setOwner, setOwnerList }) => {
  const [selectedOwnerIndex, setSelectedOwnerIndex] = useState();
  const [showNewOwnerModal, setShowNewOwnerModal] = useState(false);

  const setOwnerSelected = (owner, index) => {
    console.log('button clicked');
    console.log('index of selected owner', index);
    setOwner(index);
    setSelectedOwnerIndex(index);
  };

  return (
    <div className="ownerList">
      <h3>Owners List</h3>
      <ul className="list-group" id="owners">
        {ownerList.map((owner, index) => (
          <button type="button" className="list-group-item list-group-item-action" key={owner.id} onClick={() => setOwnerSelected(owner, index)}>
            {owner.lastName}
            ,
            {owner.firstName}
          </button>
        ))}
      </ul>
      <br />
      <button type="button" className="btn btn-dark" onClick={() => setShowNewOwnerModal(true)}>Add new owner</button>
      <NewOwnerModal trigger={showNewOwnerModal} setTrigger={setShowNewOwnerModal} ownerList={ownerList} setOwnerList={setOwnerList} />
    </div>
  );
};

export default OwnerList;
