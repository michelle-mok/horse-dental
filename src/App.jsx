import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OwnerList from './components/ownerList.jsx';
import HorseList from './components/horseList.jsx';
import HorseDetails from './components/horseDetails.jsx';

export default function App() {
  const [ownerList, setOwnerList] = useState([]);
  const [owner, setOwner] = useState();
  const [horseList, setHorseList] = useState([]);
  const [horse, setHorse] = useState();
  const [horseDetails, setHorseDetails] = useState({});

  useEffect(() => {
    axios.get('/owners').then((response) => {
      setOwnerList(response.data.allOwners);
    });
  }, []);

  return (
    <div className="container">
      {owner === undefined && (
      <OwnerList ownerList={ownerList} setOwner={setOwner} setHorseList={setHorseList} />
      )}
      {owner !== undefined && horse === undefined && (
      <HorseList owner={owner} ownerList={ownerList} horseList={horseList} setHorse={setHorse} setHorseDetails={setHorseDetails} setHorseList={setHorseList} />
      )}
      {horse !== undefined && (
      <HorseDetails horseDetails={horseDetails} horse={horse} horseList={horseList} setHorseDetails={setHorseDetails} owner={owner} ownerList={ownerList} />
      )}
    </div>
  );
}
