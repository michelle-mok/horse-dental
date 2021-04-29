import axios from 'axios';
import React, { useState } from 'react';

const OwnerList = ({ ownerList, setOwner, setHorseList }) => {
  const [selectedOwnerIndex, setSelectedOwnerIndex] = useState();

  const setOwnerSelected = (owner, index) => {
    console.log('button clicked');
    console.log('index of selected owner', index);
    setOwner(index);
    setSelectedOwnerIndex(index);

    axios
      .post('/horse-list', {
        id: ownerList[index].id,
      })
      .then((response) => {
        setHorseList(response.data.horses);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="ownerList">
      <h3>Owners List</h3>
      <ul className="list-group">
        {ownerList.map((owner, index) => (
          <button type="button" className="list-group-item list-group-item-action" key={owner.id} onClick={() => setOwnerSelected(owner, index)}>
            {owner.lastName}
            ,
            {owner.firstName}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default OwnerList;
