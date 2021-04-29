import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OwnerList from './components/ownerList.jsx';
import HorseList from './components/horseList.jsx';

export default function App() {
  const [ownerList, setOwnerList] = useState([]);
  const [owner, setOwner] = useState();
  const [horseList, setHorseList] = useState([]);
  const [horse, setHorse] = useState();
  const [horseDetails, setHorseDetails] = useState();

  useEffect(() => {
    axios.get('/owners').then((response) => {
      setOwnerList(response.data.allOwners);
    });
  }, []);

  console.log('owner list:', ownerList);
  console.log('horse details', horseDetails);
  return (
    <div className="container">
      {owner === undefined && (
      <OwnerList ownerList={ownerList} setOwner={setOwner} setHorseList={setHorseList} />
      )}
      {owner !== undefined && (
      <HorseList owner={owner} ownerList={ownerList} horseList={horseList} setHorse={setHorse} setHorseDetails={setHorseDetails} />
      )}
    </div>
  );
}
