import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NewHorseModal from './newHorseModal.jsx';

const HorseList = ({
  owner, horseList, ownerList, setHorse, setHorseList, horseReports, setHorseReports,
}) => {
  const [showNewHorseModal, setShowNewHorseModal] = useState(false);

  const setHorseSelected = (horse, index) => {
    setHorse(index);
    console.log('horse id', horseList[index].id);
  };

  useEffect(() => {
    axios
      .get(`/horse-list/${ownerList[owner].id}`)
      .then((response) => {
        setHorseList(response.data.horses);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="horseList">
      <h3>
        {ownerList[owner].firstName}
        ,
        {' '}
        {ownerList[owner].lastName}
      </h3>
      <ul className="list-group" id="horses">
        {horseList.map((horse, index) => (
          <button type="button" className="list-group-item list-group-item-action" key={horse.id} onClick={() => setHorseSelected(horse, index)}>
            {horse.name}
            ,
            {' '}
            {horse.mraNumber}
          </button>
        ))}
      </ul>
      <br />
      <button type="button" className="btn btn-dark" onClick={() => setShowNewHorseModal(true)}>Add new horse</button>
      <NewHorseModal trigger={showNewHorseModal} setTrigger={setShowNewHorseModal} ownerList={ownerList} owner={owner} horseList={horseList} setHorseList={setHorseList} horseReports={horseReports} setHorseReports={setHorseReports} />
    </div>
  );
};

export default HorseList;
