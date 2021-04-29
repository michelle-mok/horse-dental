import axios from 'axios';
import React, { useState } from 'react';

const HorseList = ({
  owner, horseList, ownerList, setHorse, setHorseDetails,
}) => {
  const setHorseSelected = (horse, index) => {
    setHorse(index);

    console.log('horse list', horseList);
    console.log('horse id', horseList[index].id);
    axios
      .post('/horse-details', {
        id: horseList[index].id,
      })
      .then((response) => {
        console.log(response.data.horse);
        setHorseDetails(response.data.horse);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log('owner index', owner);

  return (
    <div className="horseList">
      <h3>
        {ownerList[owner].firstName}
        ,
        {' '}
        {ownerList[owner].lastName}
      </h3>
      <ul className="list-group">
        {horseList.map((horse, index) => (
          <button type="button" className="list-group-item list-group-item-action" key={horse.id} onClick={() => setHorseSelected(horse, index)}>
            {horse.name}
            ,
            {' '}
            {horse.mraNumber}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default HorseList;
